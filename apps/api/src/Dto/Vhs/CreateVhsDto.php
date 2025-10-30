<?php

namespace App\Dto\Vhs;

use Symfony\Component\Validator\Constraints as Assert;

class CreateVhsDto
{
    #[Assert\NotBlank]
    private string $title;

    #[Assert\Range(min: 1900, max: 2100)]
    private ?int $year = null;

    /** @var string[] */
    #[Assert\Type('array')]
    #[Assert\All([new Assert\Type('string')])]
    private array $genres = [];

    private ?string $synopsis = null;

    #[Assert\NotBlank]
    #[Assert\Url]
    private string $coverUrl;

    #[Assert\Choice(choices: ['available', 'rented', 'lost'])]
    private string $status = 'available';

    // ---- Getters ----
    public function getTitle(): string
    {
        return $this->title;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    /**
     * @return string[]
     */
    public function getGenres(): array
    {
        return $this->genres;
    }

    public function getSynopsis(): ?string
    {
        return $this->synopsis;
    }

    public function getCoverUrl(): string
    {
        return $this->coverUrl;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    // ---- Setters ----
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setYear(string|int|null $year): void
    {
        $this->year = $year !== null ? (int) $year : null;
    }

    /**
     * @param string[] $genres
     */
    public function setGenres(array $genres): void
    {
        $this->genres = $genres;
    }

    public function setSynopsis(?string $synopsis): void
    {
        $this->synopsis = $synopsis;
    }

    public function setCoverUrl(string $coverUrl): void
    {
        $this->coverUrl = $coverUrl;
    }

    public function setStatus(string $status): void
    {
        $this->status = $status;
    }
}
