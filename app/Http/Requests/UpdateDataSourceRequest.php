<?php

namespace App\Http\Requests;

use App\Models\DataSource;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDataSourceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('data_sources')
                    ->where(fn ($query) => $query->where('driver', $this->string('driver')->toString()))
                    ->ignore($this->route('data_source')),
            ],
            'driver' => ['required', 'string', 'max:100'],
            'ingest_mode' => ['required', Rule::in(DataSource::INGEST_MODES)],
            'url' => ['nullable', 'string', 'max:2048'],
            'host' => ['nullable', 'string', 'max:255'],
            'port' => ['nullable', 'integer', 'min:1', 'max:65535'],
            'database' => ['nullable', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'max:255'],
            'charset' => ['nullable', 'string', 'max:50'],
            'collation' => ['nullable', 'string', 'max:100'],
            'prefix' => ['nullable', 'string', 'max:50'],
            'prefix_indexes' => ['sometimes', 'boolean'],
        ];
    }
}
