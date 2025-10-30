<?php

namespace App\Enum;

enum VhsStatus: string
{
    case Available = 'available';
    case Rented    = 'rented';
    case Lost      = 'lost';
}
