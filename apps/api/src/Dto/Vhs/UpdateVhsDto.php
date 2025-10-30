<?php

namespace App\Dto\Vhs;

use Symfony\Component\Validator\Constraints as Assert;

class UpdateVhsDto
{
    public ?string $title = null;

    #[Assert\Range(min: 1900, max: 2100)]
    public ?int $year = null;

    /** @var string[]|null */
    #[Assert\All([new Assert\Type('string')])]
    public ?array $genres = null;

    public ?string $synopsis = null;

    #[Assert\Url]
    public ?string $coverUrl = null;

    #[Assert\Choice(choices: ['available', 'rented', 'lost'])]
    public ?string $status = null;
}
