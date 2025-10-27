<?php

namespace App\Enum;

enum VhsStatus: string
{
    case Available = 'available';
    case Rented    = 'rented';
    case Overdue   = 'overdue';
    case Lost      = 'lost';
}
