<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Bookmark;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/** @psalm-api */
final class BookmarkController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    ) {}
    #[Route('/bookmarks', name: 'api_bookmarks_post', methods: ['POST'])]
    public function save(Request $request): JsonResponse
    {

        $formdata = json_decode($request->getContent());

        $newBookmark = new Bookmark();
        $newBookmark->setTitle($formdata->title);
        $newBookmark->setUrl($formdata->url);
        $newBookmark->setTag($formdata->tag);
        $newBookmark->setCreatedAt(new \DateTime());

        $this->entityManager->persist($newBookmark);
        $result = $this->entityManager->flush();


        $data = ["status" => "ok", "datasend" => json_decode($request->getContent(), true)];
        $status = 200;
        return new JsonResponse($data, $status);
    }

    #[Route('/bookmarks', name: 'api_bookmarks_get', methods: ['GET'])]
    public function get(Request $request): JsonResponse
    {

        $tag = $request->query->get("tag");
        $strTag = '%%';
        if (!empty($tag)) {
            $strTag = $tag;
        }

        $list = $this->entityManager->getRepository(Bookmark::class)->findAllByTagNewestFirst($strTag);

        $bookmarks = [];
        foreach ($list as $bookmark) {
            $bookmarks[] = $bookmark->toArray();
        }

        return new JsonResponse($bookmarks);
    }
}
