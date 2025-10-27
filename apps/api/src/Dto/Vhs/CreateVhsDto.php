<?php

namespace App\Dto\Vhs;

use Symfony\Component\Validator\Constraints as Assert;

class CreateVhsDto
{
    #[Assert\NotBlank]
    public string $title;

    #[Assert\Range(min: 1900, max: 2100)]
    public ?int $year = null;

    /** @var string[] */
    #[Assert\Type('array')]
    #[Assert\All([new Assert\Type('string')])]
    public array $genres = [];

    public ?string $synopsis = null;

    #[Assert\NotBlank]
    #[Assert\Url]
    public string $coverUrl;

    #[Assert\Choice(choices: ['available', 'rented', 'overdue', 'lost'])]
    public string $status = 'available';
}
