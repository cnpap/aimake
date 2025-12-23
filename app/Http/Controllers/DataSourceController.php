<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDataSourceRequest;
use App\Http\Requests\UpdateDataSourceRequest;
use App\Models\DataSource;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DataSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $dataSources = DataSource::query()
            ->latest('id')
            ->paginate(10)
            ->through(fn (DataSource $dataSource): array => $this->transform($dataSource));

        return Inertia::render('data-sources/index', [
            'dataSources' => $dataSources,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('data-sources/create', [
            'ingestModes' => DataSource::INGEST_MODES,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDataSourceRequest $request): RedirectResponse
    {
        $dataSource = DataSource::create([
            ...$request->validated(),
            'prefix' => $request->string('prefix')->toString(),
            'prefix_indexes' => $request->boolean('prefix_indexes'),
            'status' => 'pending',
            'tables_count' => 0,
        ]);

        return to_route('data-sources.edit', $dataSource);
    }

    /**
     * Display the specified resource.
     */
    public function show(DataSource $dataSource): Response
    {
        return Inertia::render('data-sources/show', [
            'dataSource' => $this->transform($dataSource),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataSource $dataSource): Response
    {
        return Inertia::render('data-sources/edit', [
            'dataSource' => $this->transform($dataSource),
            'ingestModes' => DataSource::INGEST_MODES,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDataSourceRequest $request, DataSource $dataSource): RedirectResponse
    {
        $dataSource->update([
            ...$request->validated(),
            'prefix' => $request->string('prefix')->toString(),
            'prefix_indexes' => $request->boolean('prefix_indexes'),
        ]);

        return to_route('data-sources.edit', $dataSource);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataSource $dataSource): RedirectResponse
    {
        $dataSource->delete();

        return to_route('data-sources.index');
    }

    /**
     * @return array<string, mixed>
     */
    protected function transform(DataSource $dataSource): array
    {
        return [
            'id' => $dataSource->id,
            'name' => $dataSource->name,
            'driver' => $dataSource->driver,
            'ingest_mode' => $dataSource->ingest_mode,
            'url' => $dataSource->url,
            'host' => $dataSource->host,
            'port' => $dataSource->port,
            'database' => $dataSource->database,
            'username' => $dataSource->username,
            'charset' => $dataSource->charset,
            'collation' => $dataSource->collation,
            'prefix' => $dataSource->prefix,
            'prefix_indexes' => $dataSource->prefix_indexes,
            'status' => $dataSource->status,
            'tables_count' => $dataSource->tables_count,
            'last_scanned_at' => optional($dataSource->last_scanned_at)?->toAtomString(),
            'created_at' => optional($dataSource->created_at)?->toAtomString(),
            'updated_at' => optional($dataSource->updated_at)?->toAtomString(),
        ];
    }
}
