<?php

namespace App\Command;

use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use Faker\Factory;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed:customers',
    description: 'Fill the customers table with demo data',
)]
class SeedCustomerCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $em,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('count', null, InputOption::VALUE_REQUIRED, 'Number of customers to generate', 20)
            ->addOption('purge', null, InputOption::VALUE_NONE, 'Purge existing entries before inserting new ones');
    }

    private function slugify(string $text): string
    {
        $text = iconv('UTF-8', 'ASCII//TRANSLIT', $text);
        $text = preg_replace('~[^\\pL\\d]+~u', '-', $text);
        $text = trim($text, '-');
        $text = strtolower($text);
        $text = preg_replace('~[^-a-z0-9]+~', '', $text);
        return $text ?: 'user';
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $faker = Factory::create('fr_FR');
        $conn = $this->em->getConnection();

        $count = (int) $input->getOption('count');

        if ($input->getOption('purge')) {
            $io->warning('Purging customer table…');
            $conn->executeStatement('TRUNCATE TABLE customer RESTART IDENTITY CASCADE;');
        }

        $io->section(sprintf('Generating %d customers…', $count));
        $inserted = 0;

        for ($i = 0; $i < $count; $i++) {
            $customer = new Customer();
            $customer
                ->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setEmail(strtolower(sprintf(
                    '%s.%s@example.com',
                    $this->slugify($customer->getFirstName()),
                    $this->slugify($customer->getLastName())
                )))

                ->setPhone($faker->optional()->phoneNumber());

            $this->em->persist($customer);
            $inserted++;
        }

        $this->em->flush();

        $io->success(sprintf('%d customers inserted successfully.', $inserted));
        return Command::SUCCESS;
    }
}
