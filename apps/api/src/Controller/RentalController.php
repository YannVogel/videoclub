<?php

namespace App\Controller;

use App\Entity\Rental;
use App\Entity\Customer;
use App\Entity\Vhs;
use App\Repository\RentalRepository;
use App\Repository\CustomerRepository;
use App\Repository\VhsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Uid\Uuid;

#[Route('/api/v1/rentals')]
class RentalController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly RentalRepository $rentalRepo,
        private readonly CustomerRepository $customerRepo,
        private readonly VhsRepository $vhsRepo,
        private readonly SerializerInterface $serializer,
    ) {}

    // -------- INDEX --------
    #[Route('', name: 'rental_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $rentals = $this->rentalRepo->findAll();

        return $this->json(array_map(fn (Rental $r) => $r->toArray(), $rentals));
    }

    // -------- CREATE --------
    #[Route('', name: 'rental_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['customerId'], $data['vhsId'])) {
            return new JsonResponse(['error' => 'Missing parameters (customerId, vhsId)'], 400);
        }

        $customer = $this->customerRepo->find($data['customerId']);
        $vhs = $this->vhsRepo->find($data['vhsId']);

        if (!$customer || !$vhs) {
            return new JsonResponse(['error' => 'Customer or VHS not found'], 404);
        }

        $rental = new Rental();
        $rental->setCustomer($customer);
        $rental->setVhs($vhs);

        $this->em->persist($rental);
        $this->em->flush();

        return new JsonResponse($rental->toArray(), 201);
    }

    // -------- BY CUSTOMER --------
    #[Route('/customer/{id}', name: 'by_customer', methods: ['GET'])]
    public function byCustomer(string $id): JsonResponse
    {
        try {
            $uuid = new Uuid($id);
        } catch (\InvalidArgumentException) {
            return new JsonResponse(['error' => 'Invalid customer ID'], 400);
        }

        $customer = $this->customerRepo->find($uuid);
        if (!$customer) {
            return new JsonResponse(['error' => 'Customer not found'], 404);
        }

        $rentals = $this->rentalRepo->findByCustomer($customer);
        $json = $this->serializer->serialize($rentals, 'json', ['groups' => ['rental:read']]);

        return new JsonResponse($json, 200, [], true);
    }

    // -------- BY VHS --------
    #[Route('/vhs/{id}', name: 'by_vhs', methods: ['GET'])]
    public function byVhs(string $id): JsonResponse
    {
        try {
            $uuid = new Uuid($id);
        } catch (\InvalidArgumentException) {
            return new JsonResponse(['error' => 'Invalid VHS ID'], 400);
        }

        $vhs = $this->vhsRepo->find($uuid);
        if (!$vhs) {
            return new JsonResponse(['error' => 'VHS not found'], 404);
        }

        $rentals = $this->rentalRepo->findByVhs($vhs);
        $json = $this->serializer->serialize($rentals, 'json', ['groups' => ['rental:read']]);

        return new JsonResponse($json, 200, [], true);
    }

    // -------- OVERDUE --------
    #[Route('/overdue', name: 'rental_overdue', methods: ['GET'])]
    public function overdue(): JsonResponse
    {
        $rentals = $this->rentalRepo->findOverdue();
        return $this->json(array_map(fn (Rental $r) => $r->toArray(), $rentals));
    }

    // -------- RETURN (RETOUR DE CASSETTE) --------
    #[Route('/{id}/return', name: 'rental_return', methods: ['PATCH'])]
    public function returnRental(string $id): JsonResponse
    {
        try {
            $uuid = new Uuid($id);
        } catch (\InvalidArgumentException) {
            return new JsonResponse(['error' => 'Invalid rental ID'], 400);
        }

        $rental = $this->rentalRepo->find($uuid);

        if (!$rental) {
            return new JsonResponse(['error' => 'Rental not found'], 404);
        }

        if ($rental->getReturnedAt() !== null) {
            return new JsonResponse(['error' => 'This rental has already been returned'], 400);
        }

        $vhs = $rental->getVhs();

        if (!$vhs) {
            return new JsonResponse(['error' => 'Associated VHS not found'], 404);
        }

        // Mettre à jour les champs
        $rental->setReturnedAt(new \DateTimeImmutable());
        $vhs->setStatus(\App\Enum\VhsStatus::Available);

        $this->em->persist($rental);
        $this->em->persist($vhs);
        $this->em->flush();

        return $this->json([
            'message' => 'VHS successfully returned.',
            'rental' => $rental->toArray(),
            'vhs' => $vhs->toArray(),
        ]);
    }

}
