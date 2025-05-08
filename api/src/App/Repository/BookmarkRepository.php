<?php

namespace App\Repository;

use App\Entity\Bookmark;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class BookmarkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bookmark::class);
    }

    /**
     * @return Bookmark[]
     */
    public function findAllByTagNewestFirst(string $tag = '%%'): array
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT b FROM App\Entity\Bookmark b WHERE b.tag LIKE :tag ORDER BY b.createdAt DESC'
        )->setParameter('tag', $tag);

        return $query->getResult();
    }
}
