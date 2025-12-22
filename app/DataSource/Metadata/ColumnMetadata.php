<?php

namespace App\DataSource\Metadata;

class ColumnMetadata
{
    public function __construct(
        public string $name,
        public ?string $type,
        public ?string $comment,
    ) {}
}
