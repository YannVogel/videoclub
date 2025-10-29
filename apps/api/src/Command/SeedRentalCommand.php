<?php

namespace App\Command;

use App\Entity\Rental;
use App\Repository\CustomerRepository;
use App\Repository\VhsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed:rentals',
    description: 'Fill the rentals table with realistic demo data',
)]
class SeedRentalCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly CustomerRepository $customerRepo,
        private readonly VhsRepository $vhsRepo,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('count', null, InputOption::VALUE_REQUIRED, 'Number of rentals to generate', 30)
            ->addOption('purge', null, InputOption::VALUE_NONE, 'Purge existing entries before inserting new ones');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $faker = Factory::create('fr_FR');
        $conn = $this->em->getConnection();

        $count = (int) $input->getOption('count');

        if ($input->getOption('purge')) {
            $io->warning('Purging rental table…');
            $conn->executeStatement('TRUNCATE TABLE rental RESTART IDENTITY CASCADE;');
        }

        $customers = $this->customerRepo->findAll();
        $vhsList = $this->vhsRepo->findAll();

        if (empty($customers) || empty($vhsList)) {
            $io->error('You must have at least one customer and one VHS in database.');
            return Command::FAILURE;
        }

        $io->section(sprintf('Generating %d rentals…', $count));
        $inserted = 0;

        foreach (range(1, $count) as $_) {
            $customer = $faker->randomElement($customers);
            $vhs = $faker->randomElement($vhsList);

            // Date aléatoire dans le passé
            $rentedAt = \DateTimeImmutable::createFromMutable(
                $faker->dateTimeBetween('-60 days', '-1 days')
            );

            $dueDate = $rentedAt->modify('+7 days');

            // Probabilités : 80% rendu à temps, 10% en retard, 10% pas rendu
            $chance = $faker->numberBetween(1, 100);
            $returnedAt = null;

            if ($chance <= 80) {
                $returnedAt = $rentedAt->modify('+' . $faker->numberBetween(1, 7) . ' days');
            } elseif ($chance <= 90) {
                $returnedAt = $rentedAt->modify('+' . $faker->numberBetween(8, 15) . ' days');
            }

            $rental = (new Rental())
                ->setCustomer($customer)
                ->setVhs($vhs)
                ->setRentedAt($rentedAt)
                ->setDueDate($dueDate)
                ->setReturnedAt($returnedAt);

            $this->em->persist($rental);
            $inserted++;
        }

        $this->em->flush();

        $io->success(sprintf('%d rentals inserted successfully with realistic chronology.', $inserted));
        return Command::SUCCESS;
    }
}
