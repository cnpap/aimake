import { z } from 'zod';

export const openApiToolSchema = z.object({
    name: z.string().min(2, { message: '名称至少需要 2 个字符' }),
    version: z.string().min(1, { message: '请输入版本号，例如 v1 或 2024-12' }),
    baseUrl: z.string().url({
        message: '请输入合法的 Base URL（例如 https://api.example.com）',
    }),
    description: z.string().min(10, { message: '描述至少需要 10 个字符' }),
    token: z.string().optional(),
});

export type OpenApiFormValues = z.infer<typeof openApiToolSchema>;

export const defaultOpenApiFormValues: Partial<OpenApiFormValues> = {
    name: '',
    version: 'v1',
    baseUrl: '',
    description: '',
    token: '',
};
