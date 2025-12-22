<?php

namespace App\DataSource\Metadata;

/**
 * @psalm-type TableColumns=list<ColumnMetadata>
 */
class TableMetadata
{
    /**
     * @param  TableColumns  $columns
     */
    public function __construct(
        public ?string $schemaName,
        public string $tableName,
        public ?string $comment,
        public array $columns,
        public ?string $schemaQualifiedName = null,
    ) {}
}
