<?php

namespace App\Entity;

use App\Repository\RentalRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RentalRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ORM\Table(name: 'rental')]
class Rental
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[Groups(['rental:read'])]
    private ?Uuid $id = null;

    #[ORM\ManyToOne(targetEntity: Vhs::class, inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['rental:read'])]
    private ?Vhs $vhs = null;

    #[ORM\ManyToOne(targetEntity: Customer::class, inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['rental:read'])]
    private ?Customer $customer = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    #[Groups(['rental:read'])]
    private \DateTimeImmutable $rentedAt;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    #[Groups(['rental:read'])]
    private \DateTimeImmutable $dueDate;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    #[Groups(['rental:read'])]
    private ?\DateTimeImmutable $returnedAt = null;

    public function __construct()
    {
        $this->id = Uuid::v7();
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        if (!isset($this->rentedAt)) {
            $this->rentedAt = new \DateTimeImmutable();
        }
        if (!isset($this->dueDate)) {
            $this->dueDate = $this->rentedAt->modify('+7 days');
        }
    }

    // ---------- Getters / Setters ----------

    public function getId(): string
    {
        return (string) $this->id;
    }

    public function getVhs(): ?Vhs
    {
        return $this->vhs;
    }

    public function setVhs(Vhs $vhs): self
    {
        $this->vhs = $vhs;
        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(Customer $customer): self
    {
        $this->customer = $customer;
        return $this;
    }

    public function getRentedAt(): \DateTimeImmutable
    {
        return $this->rentedAt;
    }

    public function setRentedAt(\DateTimeImmutable $rentedAt): self
    {
        $this->rentedAt = $rentedAt;
        return $this;
    }

    public function getDueDate(): \DateTimeImmutable
    {
        return $this->dueDate;
    }

    public function setDueDate(\DateTimeImmutable $dueDate): self
    {
        $this->dueDate = $dueDate;
        return $this;
    }

    public function getReturnedAt(): ?\DateTimeImmutable
    {
        return $this->returnedAt;
    }

    public function setReturnedAt(?\DateTimeImmutable $returnedAt): self
    {
        $this->returnedAt = $returnedAt;
        return $this;
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'id' => (string) $this->id,
            'vhs' => $this->vhs?->getId(),
            'customer' => $this->customer?->getId(),
            'rentedAt' => $this->rentedAt->format(\DateTimeInterface::ATOM),
            'dueDate' => $this->dueDate->format(\DateTimeInterface::ATOM),
            'returnedAt' => $this->returnedAt?->format(\DateTimeInterface::ATOM),
        ];
    }
}
