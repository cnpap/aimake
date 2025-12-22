<?php

namespace App\Actions\DataSource\Adapters;

use App\DataSource\Metadata\TableMetadata;
use App\Models\DataSource;

interface DataSourceIntrospectAdapter
{
    /**
     * @return list<TableMetadata>
     */
    public function listTables(DataSource $dataSource): array;
}
