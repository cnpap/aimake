import { FormShell, useZodForm } from '@/components/form-shell';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
    defaultOpenApiFormValues,
    openApiToolSchema,
    type OpenApiFormValues,
} from './openapi-form-schema';

interface OpenApiFormProps {
    defaultValues?: Partial<OpenApiFormValues>;
    onSubmit: (data: OpenApiFormValues) => void;
    onCancel?: () => void;
    submitLabel?: string;
}

export function OpenApiForm({
    defaultValues,
    onSubmit,
    onCancel,
    submitLabel = '注册工具',
}: OpenApiFormProps) {
    const form = useZodForm<OpenApiFormValues>({
        schema: openApiToolSchema,
        defaultValues: { ...defaultOpenApiFormValues, ...defaultValues },
    });

    return (
        <FormShell
            id="openapi-form"
            form={form}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitLabel={submitLabel}
        >
            <div className="space-y-4 pt-4 pb-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                        基础信息
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>工具名称</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="例如：Customer Service API"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="version"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>版本</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="例如：v1.2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>描述</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="说明 API 的主要能力、配额、调用注意事项..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                        连接配置
                    </h3>
                    <FormField
                        control={form.control}
                        name="baseUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Base URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="例如：https://api.example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    OpenAPI 文档中 servers 的基础域名
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bearer Token（可选）</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="填写后会在调用时携带 Authorization: Bearer <token>"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    留空表示无需鉴权；填写后将自动使用 Bearer
                                    Token 调用
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </FormShell>
    );
}
