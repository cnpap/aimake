import { FormShell, useZodForm } from '@/components/form-shell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    const form = useZodForm<AgentFormValues>({
        schema: agentSchema,
        defaultValues: { ...defaultAgentValues, ...defaultValues },
    });

    return (
        <FormShell
            id="agent-form"
            form={form}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitLabel={submitLabel}
            contentWrapper={false}
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
                        <TabsTrigger value="capabilities">能力开关</TabsTrigger>
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
        </FormShell>
    );
}
