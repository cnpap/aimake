<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class IssueTokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array{
     *     email: array<int, string>,
     *     password: array<int, string>,
     *     token_name?: array<int, string>,
     *     scopes?: array<int, string|array<int, string>>
     * }
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'token_name' => ['sometimes', 'string'],
            'scopes' => ['sometimes', 'array'],
            'scopes.*' => ['string'],
        ];
    }
}
