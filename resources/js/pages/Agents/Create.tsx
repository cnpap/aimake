import { FormPage } from '@/components/form-page';
import { useZodForm } from '@/components/form-shell';
import { TabsContent } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/agents';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { AgentAdvancedTemplates } from './components/agent-advanced-templates';
import { AgentBasicInfo } from './components/agent-basic-info';
import { AgentCapabilities } from './components/agent-capabilities';
import {
    type AgentFormValues,
    agentSchema,
    defaultAgentValues,
} from './components/agent-form-schema';
import { AgentModelParams } from './components/agent-model-params';

export default function AgentCreate() {
    const [activeTab, setActiveTab] = useState('basic');

    const form = useZodForm<AgentFormValues>({
        schema: agentSchema,
        defaultValues: defaultAgentValues,
    });

    const onSubmit = (data: AgentFormValues) => {
        router.post(store.url(), data);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: '代理管理', href: index.url() },
                { title: '创建代理', href: '#' },
            ]}
        >
            <Head title="创建代理" />

            <FormPage
                form={form}
                onSubmit={onSubmit}
                saveLabel="创建代理"
                tabs={[
                    { value: 'basic', label: '基础信息' },
                    { value: 'model', label: '模型参数' },
                    { value: 'capabilities', label: '能力开关' },
                    { value: 'advanced', label: '高级模版' },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onBack={() => router.visit(index.url())}
                formWidth="sm"
            >
                <div className="space-y-6">
                    <TabsContent value="basic" className="mt-0">
                        <AgentBasicInfo />
                    </TabsContent>

                    <TabsContent value="model" className="mt-0">
                        <AgentModelParams />
                    </TabsContent>

                    <TabsContent value="capabilities" className="mt-0">
                        <AgentCapabilities />
                    </TabsContent>

                    <TabsContent value="advanced" className="mt-0">
                        <AgentAdvancedTemplates />
                    </TabsContent>
                </div>
            </FormPage>
        </AppLayout>
    );
}
