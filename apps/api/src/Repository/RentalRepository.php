<?php

namespace App\Repository;

use App\Entity\Rental;
use App\Entity\Customer;
use App\Entity\Vhs;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Rental>
 *
 * @method Rental|null find($id, $lockMode = null, $lockVersion = null)
 * @method Rental|null findOneBy(array $criteria, array $orderBy = null)
 * @method Rental[]    findAll()
 * @method Rental[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RentalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rental::class);
    }

    /**
     * @param Customer $customer
     * @return Rental[]
     */
    public function findByCustomer(Customer $customer): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.customer = :customer')
            ->setParameter('customer', $customer)
            ->orderBy('r.rentedAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @param Vhs $vhs
     * @return Rental[]
     */
    public function findByVhs(Vhs $vhs): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.vhs = :vhs')
            ->setParameter('vhs', $vhs)
            ->orderBy('r.rentedAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Rental[]
     */
    public function findOverdue(): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.dueDate < :now')
            ->setParameter('now', new \DateTimeImmutable())
            ->orderBy('r.dueDate', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
