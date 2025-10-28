<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/v1/customers', name: 'api_customers_')]
class CustomerController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(CustomerRepository $repo): JsonResponse
    {
        $customers = $repo->findAll();

        return $this->json(array_map(fn(Customer $c) => [
            'id' => $c->getId(),
            'firstName' => $c->getFirstName(),
            'lastName' => $c->getLastName(),
            'email' => $c->getEmail(),
            'phone' => $c->getPhone(),
            'createdAt' => $c->getCreatedAt()->format('Y-m-d H:i:s'),
        ], $customers));
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Customer $customer): JsonResponse
    {
        return $this->json([
            'id' => (string) $customer->getId(),
            'firstName' => $customer->getFirstName(),
            'lastName' => $customer->getLastName(),
            'email' => $customer->getEmail(),
            'phone' => $customer->getPhone(),
            'createdAt' => $customer->getCreatedAt()->format('Y-m-d H:i:s'),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $customer = (new Customer())
            ->setFirstName($data['firstName'] ?? '')
            ->setLastName($data['lastName'] ?? '')
            ->setEmail($data['email'] ?? '')
            ->setPhone($data['phone'] ?? null);

        $em->persist($customer);
        $em->flush();

        return $this->json(['message' => 'Customer created', 'id' => $customer->getId()], 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH'])]
    public function update(Request $req, Customer $customer, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $customer
            ->setFirstName($data['firstName'] ?? $customer->getFirstName())
            ->setLastName($data['lastName'] ?? $customer->getLastName())
            ->setEmail($data['email'] ?? $customer->getEmail())
            ->setPhone($data['phone'] ?? $customer->getPhone());

        $em->flush();

        return $this->json(['message' => 'Customer updated']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Customer $customer, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($customer);
        $em->flush();

        return $this->json(['message' => 'Customer deleted']);
    }
}
