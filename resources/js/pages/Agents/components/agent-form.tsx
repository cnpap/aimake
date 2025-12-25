import { FormActionBar } from '@/components/form-action-bar';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { AgentAdvancedTemplates } from './agent-advanced-templates';
import { AgentBasicInfo } from './agent-basic-info';
import { AgentCapabilities } from './agent-capabilities';
import {
    AgentFormValues,
    agentSchema,
    defaultAgentValues,
} from './agent-form-schema';
import { AgentModelParams } from './agent-model-params';

interface AgentFormProps {
    defaultValues?: Partial<AgentFormValues>;
    onSubmit: (data: AgentFormValues) => void;
    onCancel?: () => void;
    submitLabel?: string;
}

export function AgentForm({
    defaultValues,
    onSubmit,
    onCancel,
    submitLabel = '保存',
}: AgentFormProps) {
    const form = useForm<AgentFormValues>({
        resolver: zodResolver(agentSchema) as any,
        defaultValues: { ...defaultAgentValues, ...defaultValues },
    });

    const handleSubmit = (data: AgentFormValues) => {
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form
                id="agent-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex h-full flex-col"
            >
                <Tabs
                    defaultValue="basic"
                    className="flex flex-1 flex-col"
                    activationMode="automatic"
                >
                    <div className="shrink-0 px-6 pt-4 pb-3">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="basic">基础信息</TabsTrigger>
                            <TabsTrigger value="model">模型参数</TabsTrigger>
                            <TabsTrigger value="capabilities">
                                能力开关
                            </TabsTrigger>
                            <TabsTrigger value="advanced">高级模版</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6">
                        <TabsContent
                            value="basic"
                            className="mt-0 space-y-4 pt-2 pb-8"
                        >
                            <AgentBasicInfo />
                        </TabsContent>

                        <TabsContent
                            value="model"
                            className="mt-0 space-y-4 pt-2 pb-8"
                        >
                            <AgentModelParams />
                        </TabsContent>

                        <TabsContent
                            value="capabilities"
                            className="mt-0 space-y-4 pt-2 pb-8"
                        >
                            <AgentCapabilities />
                        </TabsContent>

                        <TabsContent
                            value="advanced"
                            className="mt-0 space-y-4 pt-2 pb-8"
                        >
                            <AgentAdvancedTemplates />
                        </TabsContent>
                    </div>
                </Tabs>

                <FormActionBar>
                    {onCancel && (
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            type="button"
                        >
                            取消
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {submitLabel}
                    </Button>
                </FormActionBar>
            </form>
        </Form>
    );
}
