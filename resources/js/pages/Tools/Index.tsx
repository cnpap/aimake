import { CardPage } from '@/components/card-page';
import { FormSheetModal } from '@/components/form-sheet-modal';
import AppLayout from '@/layouts/app-layout';
import NiceModal from '@ebay/nice-modal-react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ToolCard, type Tool } from './components/OpenApiToolCard';
import { OpenApiForm } from './components/openapi-form';
import { type OpenApiFormValues } from './components/openapi-form-schema';

const tools: Tool[] = [
    {
        id: 1,
        name: '客户支持 API',
        type: 'openapi',
        version: 'v1.2.0',
        description:
            '统一客服渠道的工单、会话、知识库接口，支持多轮跟进与满意度回传，已通过安全扫描。',
        baseUrl: 'https://api.support.acme.com',
        operations: 68,
        owner: '客户体验团队',
        status: 'active',
        lastSync: '5 分钟前',
        boundAgents: ['客户支持', '知识助手'],
        tokenConfigured: true,
        tags: ['客服', '工单', '知识库'],
    },
    {
        id: 2,
        name: '数据资产目录 API',
        type: 'openapi',
        version: '2024.12',
        description:
            '提供数据集、字段血缘、分区和采样查询能力，面向数据分析与治理的开放接口。',
        baseUrl: 'https://data.api.internal',
        operations: 42,
        owner: '数据平台',
        status: 'active',
        lastSync: '20 分钟前',
        boundAgents: ['数据分析师', '代码审查员'],
        tokenConfigured: true,
        tags: ['数据源', '血缘', '治理'],
    },
    {
        id: 3,
        name: '供应链 OpenAPI',
        type: 'openapi',
        version: 'v2-beta',
        description:
            '覆盖采购、库存、物流跟踪的接口集合，当前处于 beta 联调阶段，需提前申请配额。',
        baseUrl: 'https://supply.beta.acme.com',
        operations: 57,
        owner: '供应链数字化',
        status: 'draft',
        lastSync: '2 小时前',
        boundAgents: ['研究助手'],
        tokenConfigured: false,
        tags: ['供应链', '物流', 'beta'],
    },
    {
        id: 4,
        name: '旧版计费 API',
        type: 'openapi',
        version: 'v1',
        description: '已迁移到新版计费中心，仅保留查询功能，计划 Q2 完全下线。',
        baseUrl: 'https://billing.legacy.acme.com',
        operations: 18,
        owner: '财务结算',
        status: 'deprecated',
        lastSync: '3 天前',
        boundAgents: [],
        tokenConfigured: false,
        tags: ['计费', 'legacy'],
    },
];

export default function ToolsIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | Tool['status']>('all');

    const handleCreateSubmit = (data: OpenApiFormValues, close: () => void) => {
        console.log('Registering tool:', data);
        setTimeout(() => {
            close();
        }, 800);
    };

    const openCreateModal = () =>
        NiceModal.show(FormSheetModal, {
            title: '注册工具集',
            description: '录入工具集信息，让 Agent 可以安全调用。',
            children: (close) => (
                <OpenApiForm
                    onSubmit={(payload) => handleCreateSubmit(payload, close)}
                    onCancel={close}
                    submitLabel="注册工具"
                />
            ),
        });

    const filteredTools = tools.filter((tool) => {
        const matchesSearch =
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            tool.baseUrl?.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        return matchesSearch && tool.status === activeTab;
    });

    return (
        <AppLayout>
            <Head title="工具集" />

            <CardPage
                tabs={[
                    { value: 'all', label: '全部工具集' },
                    { value: 'active', label: '已发布' },
                    { value: 'draft', label: '草稿 / 联调中' },
                    { value: 'deprecated', label: '下线 / 废弃' },
                ]}
                activeTab={activeTab}
                onTabChange={(value) =>
                    setActiveTab(value as 'all' | Tool['status'])
                }
                searchPlaceholder="搜索工具集 / base URL / 描述..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                ctaLabel="注册工具集"
                onCtaClick={openCreateModal}
                items={filteredTools}
                renderItem={(tool) => <ToolCard tool={tool} />}
                getKey={(tool) => tool.id}
                emptyText="暂无符合条件的工具集"
                gridMinWidth={340}
            />
        </AppLayout>
    );
}
