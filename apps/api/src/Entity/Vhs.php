<?php

namespace App\Entity;

use App\Repository\VhsRepository;
use App\Enum\VhsStatus;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Ulid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: VhsRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Vhs
{
    #[ORM\Id]
    #[ORM\Column(type: 'ulid', unique: true)]
    private ?Ulid $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private string $title;

    #[ORM\Column(type: Types::INTEGER, nullable: true)]
    #[Assert\Range(min: 1900, max: 2100)]
    private ?int $year = null;

    /** @var string[] */
    #[ORM\Column(type: Types::JSON, options: ['jsonb' => true])]
    private array $genres = [];

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $synopsis = null;

    #[ORM\Column(length: 1024)]
    #[Assert\NotBlank]
    #[Assert\Url]
    private string $coverUrl;

    #[ORM\Column(type: 'string', length: 32, enumType: VhsStatus::class)]
    private VhsStatus $status = VhsStatus::Available;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private \DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $this->id = new Ulid();
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $now = new \DateTimeImmutable();
        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    // ---------- Getters / Setters ----------

    public function getId(): string
    {
        return (string) $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(?int $year): self
    {
        $this->year = $year;
        return $this;
    }

    /** @return string[] */
    public function getGenres(): array
    {
        return $this->genres;
    }

    /** @param string[] $genres */
    public function setGenres(array $genres): self
    {
        $this->genres = $genres;
        return $this;
    }

    public function getSynopsis(): ?string
    {
        return $this->synopsis;
    }

    public function setSynopsis(?string $synopsis): self
    {
        $this->synopsis = $synopsis;
        return $this;
    }

    public function getCoverUrl(): string
    {
        return $this->coverUrl;
    }

    public function setCoverUrl(string $coverUrl): self
    {
        $this->coverUrl = $coverUrl;
        return $this;
    }

    public function getStatus(): VhsStatus
    {
        return $this->status;
    }

    public function setStatus(VhsStatus $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    // ---------- Serialization Helper ----------

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'id' => (string) $this->id,
            'title' => $this->title,
            'year' => $this->year,
            'genres' => $this->genres,
            'synopsis' => $this->synopsis,
            'coverUrl' => $this->coverUrl,
            'status' => $this->status->value, // 👈 export en string
            'createdAt' => $this->createdAt->format(\DateTimeInterface::ATOM),
            'updatedAt' => $this->updatedAt->format(\DateTimeInterface::ATOM),
        ];
    }
}
