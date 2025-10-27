<?php

namespace App\Command;

use App\Entity\Vhs;
use App\Enum\VhsStatus;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Output\OutputInterface;

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
            ->addOption('purge', null, InputOption::VALUE_NONE, 'Purge existing entries before inserting new ones');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $conn = $this->em->getConnection();

        if ($input->getOption('purge')) {
            $io->warning('Purging vhs table…');
            $conn->executeStatement('TRUNCATE TABLE vhs RESTART IDENTITY CASCADE;');
        }

        $rows = [
            [
                'title' => 'Terminator',
                'year' => 1984,
                'genres' => ['action', 'sci-fi'],
                'synopsis' => "A cyborg from the future is sent to kill Sarah Connor.",
                'coverUrl' => 'https://placehold.co/300x450?text=Terminator',
                'status' => VhsStatus::Available,
            ],
            [
                'title' => 'Jurassic Park',
                'year' => 1993,
                'genres' => ['adventure', 'sci-fi'],
                'synopsis' => "Dinosaurs run wild in a cloned park.",
                'coverUrl' => 'https://placehold.co/300x450?text=Jurassic+Park',
                'status' => VhsStatus::Rented,
            ],
            [
                'title' => 'The Lion King',
                'year' => 1994,
                'genres' => ['animation', 'adventure'],
                'synopsis' => "The journey of Simba, destined to be king.",
                'coverUrl' => 'https://placehold.co/300x450?text=Lion+King',
                'status' => VhsStatus::Available,
            ],
            [
                'title' => 'Blade Runner',
                'year' => 1982,
                'genres' => ['sci-fi', 'thriller'],
                'synopsis' => "A blade runner hunts down replicants on Earth.",
                'coverUrl' => 'https://placehold.co/300x450?text=Blade+Runner',
                'status' => VhsStatus::Lost,
            ],
            [
                'title' => 'Back to the Future',
                'year' => 1985,
                'genres' => ['adventure', 'comedy', 'sci-fi'],
                'synopsis' => "Marty travels back in time and must ensure his parents meet.",
                'coverUrl' => 'https://placehold.co/300x450?text=Back+to+the+Future',
                'status' => VhsStatus::Overdue,
            ],
        ];

        $count = 0;

        foreach ($rows as $r) {
            $v = new Vhs();
            $v->setTitle($r['title']);
            $v->setYear($r['year']);
            $v->setGenres($r['genres']);
            $v->setSynopsis($r['synopsis']);
            $v->setCoverUrl($r['coverUrl']);
            $v->setStatus($r['status']);

            $this->em->persist($v);
            $count++;
        }

        $this->em->flush();

        $io->success(sprintf('%d VHS inserted.', $count));
        return Command::SUCCESS;
    }
}
