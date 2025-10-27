<?php

namespace App\Command;

use App\Entity\Vhs;
use App\Enum\VhsStatus;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed:vhs',
    description: 'Fill the VHS table with demo data',
)]
class SeedVhsCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $em,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            // garde le purge
            ->addOption('purge', null, InputOption::VALUE_NONE, 'Purge existing entries before inserting new ones')
            // combien de films à générer (par défaut 10)
            ->addArgument('count', InputArgument::OPTIONAL, 'Number of VHS to generate', 10);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $conn = $this->em->getConnection();

        // Purge optionnelle
        if ($input->getOption('purge')) {
            $io->warning('Purging vhs table…');
            // Postgres
            $conn->executeStatement('TRUNCATE TABLE vhs RESTART IDENTITY CASCADE;');
        }

        // Faker en français (changez la locale si vous préférez)
        $faker = Factory::create('fr_FR');

        // Toutes les valeurs possibles de l’enum
        $statuses = VhsStatus::cases();

        // Pool de genres (en anglais pour coller au modèle côté web)
        $genrePool = ['action', 'adventure', 'animation', 'comedy', 'drama', 'horror', 'sci-fi', 'thriller', 'romance'];

        $count = (int) $input->getArgument('count');
        $inserted = 0;

        for ($i = 0; $i < $count; $i++) {
            $title = ucfirst($faker->words($faker->numberBetween(2, 4), true));
            $year = $faker->numberBetween(1975, 2005);

            // 1 à 3 genres distincts
            $genres = $faker->randomElements($genrePool, $faker->numberBetween(1, 3));

            // 1–2 paragraphes de lorem
            $synopsis = $faker->paragraphs($faker->numberBetween(1, 2), true);

            // cover placehold.co avec le titre encodé
            $coverUrl = sprintf('https://placehold.co/300x450?text=%s', urlencode($title));

            // Status aléatoire à partir de l’enum
            $status = $statuses[array_rand($statuses)];

            $v = new Vhs();
            $v->setTitle($title);
            $v->setYear($year);
            $v->setGenres($genres);
            $v->setSynopsis($synopsis);
            $v->setCoverUrl($coverUrl);
            $v->setStatus($status); // enum VhsStatus

            $this->em->persist($v);
            $inserted++;
        }

        $this->em->flush();

        $io->success(sprintf('%d VHS inserted.', $inserted));
        return Command::SUCCESS;
    }
}
