<?php

namespace App\Controller;

use App\Dto\Vhs\CreateVhsDto;
use App\Dto\Vhs\UpdateVhsDto;
use App\Entity\Vhs;
use App\Enum\VhsStatus;
use App\Repository\VhsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/v1/vhs')]
class VhsController
{
    public function __construct(
        private readonly VhsRepository $vhsRepo,
        private readonly EntityManagerInterface $em,
        private readonly SerializerInterface $serializer,
        private readonly ValidatorInterface $validator,
    ) {}

    // -------- READ: list --------
    #[Route('', name: 'vhs_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        $status = $request->query->get('status'); // available|rented|lost
        $genre  = $request->query->get('genre');  // action|adventure|...
        $q      = $request->query->get('q');      // search in title

        $results = $this->vhsRepo->search([
            'status' => $status,
            'genre'  => $genre,
            'q'      => $q,
        ]);

        if ($genre) {
            $g = mb_strtolower($genre);
            $results = array_values(array_filter($results, function (Vhs $v) use ($g) {
                return in_array($g, array_map('mb_strtolower', $v->getGenres()), true);
            }));
        }

        $data = array_map(fn (Vhs $v) => $v->toArray(), $results);
        return new JsonResponse($data, 200, ['X-Total-Count' => (string) count($data)]);
    }

    // -------- READ: detail --------
    #[Route('/{id}', name: 'vhs_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $vhs = $this->vhsRepo->find($id);
        if (!$vhs) {
            return new JsonResponse(['error' => 'Not found'], 404);
        }
        return new JsonResponse($vhs->toArray());
    }

    // -------- CREATE --------
    #[Route('', name: 'vhs_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $dto = $this->serializer->deserialize($request->getContent(), CreateVhsDto::class, 'json');
        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse([
                'error' => 'Validation failed',
                'violations' => $this->formatViolations($errors),
            ], 400);
        }

        try {
            $status = VhsStatus::from($dto->getStatus());
        } catch (\ValueError) {
            return new JsonResponse(['error' => 'Invalid status'], 400);
        }

        $v = new Vhs();
        $v->setTitle($dto->getTitle());
        $v->setYear($dto->getYear());
        $v->setGenres($dto->getGenres());
        $v->setSynopsis($dto->getSynopsis());
        $v->setCoverUrl($dto->getCoverUrl());
        $v->setStatus($status);

        $this->em->persist($v);
        $this->em->flush();

        return new JsonResponse($v->toArray(), 201);
    }


    // -------- UPDATE (PATCH) --------
    #[Route('/{id}', name: 'vhs_update', methods: ['PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $vhs = $this->vhsRepo->find($id);
        if (!$vhs) {
            return new JsonResponse(['error' => 'Not found'], 404);
        }

        /** @var UpdateVhsDto $dto */
        $dto = $this->serializer->deserialize($request->getContent(), UpdateVhsDto::class, 'json');
        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
            return new JsonResponse([
                'error' => 'Validation failed',
                'violations' => $this->formatViolations($errors),
            ], 400);
        }

        if ($dto->title !== null) {
            $vhs->setTitle($dto->title);
        }
        if ($dto->year !== null) {
            $vhs->setYear($dto->year);
        }
        if ($dto->genres !== null) {
            $vhs->setGenres($dto->genres);
        }
        if ($dto->synopsis !== null) {
            $vhs->setSynopsis($dto->synopsis);
        }
        if ($dto->coverUrl !== null) {
            $vhs->setCoverUrl($dto->coverUrl);
        }
        if ($dto->status !== null) {
            try {
                $vhs->setStatus(VhsStatus::from($dto->status));
            } catch (\ValueError) {
                return new JsonResponse(['error' => 'Invalid status'], 400);
            }
        }

        $this->em->flush();

        return new JsonResponse($vhs->toArray(), 200);
    }

    // -------- DELETE --------
    #[Route('/{id}', name: 'vhs_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $vhs = $this->vhsRepo->find($id);
        if (!$vhs) {
            return new JsonResponse(null, 204); // idempotent
        }
        $this->em->remove($vhs);
        $this->em->flush();

        return new JsonResponse(null, 204);
    }

    // -------- MARK AS LOST --------
    #[Route('/{id}/lost', name: 'vhs_mark_lost', methods: ['PATCH'])]
    public function markAsLost(string $id): JsonResponse
    {
        $vhs = $this->vhsRepo->find($id);
        if (!$vhs) {
            return new JsonResponse(['error' => 'Not found'], 404);
        }

        if ($vhs->getStatus() !== VhsStatus::Lost) {
            $vhs->setStatus(VhsStatus::Lost);
            $this->em->flush();
        }

        return new JsonResponse($vhs->toArray(), 200);
    }

    // -------- Helpers --------

    private function formatViolations(\Traversable $violations): array
    {
        $out = [];
        foreach ($violations as $v) {
            $out[] = [
                'property' => $v->getPropertyPath(),
                'message'  => $v->getMessage(),
            ];
        }
        return $out;
    }
}
