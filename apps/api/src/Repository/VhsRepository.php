<?php

namespace App\Repository;

use App\Entity\Vhs;
use App\Enum\VhsStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class VhsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vhs::class);
    }

    /**
     * @param array{status?:string, genre?:string, q?:string} $filters
     * @return Vhs[]
     */
    public function search(array $filters = []): array
    {
        $qb = $this->createQueryBuilder('v')
            ->orderBy('v.createdAt', 'DESC');

        if (!empty($filters['status'])) {
            $qb->andWhere('v.status = :status')->setParameter('status', $filters['status']);
        }
        if (!empty($filters['genre'])) {
            // genres est un JSON : on filtre côté PHP après coup si besoin.
            // (Pour Postgres jsonb @> il faudrait une requête native. On reste simple.)
        }
        if (!empty($filters['q'])) {
            $qb->andWhere('LOWER(v.title) LIKE :q')->setParameter('q', '%'.mb_strtolower($filters['q']).'%');
        }

        return $qb->getQuery()->getResult();
    }

    public function findByStatusNot(VhsStatus $status): array
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.status != :status')
            ->setParameter('status', $status)
            ->orderBy('v.title', 'ASC')
            ->getQuery()
            ->getResult();
    }

}
