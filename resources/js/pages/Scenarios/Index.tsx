import { CardPage } from '@/components/card-page';
import { FormSheetModal } from '@/components/form-sheet-modal';
import AppLayout from '@/layouts/app-layout';
import NiceModal from '@ebay/nice-modal-react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ScenarioCard } from './components/ScenarioCard';
import { ScenarioForm } from './components/scenario-form';
import { ScenarioFormValues } from './components/scenario-form-schema';

// Enhanced Mock Data (Chinese)
const scenarios = [
    {
        id: 1,
        name: '市场调研助手',
        description: '自动收集和分析特定行业内的市场趋势和竞争对手动态。',
        tags: ['调研', '分析', '报告'],
        process: '顺序执行',
        planning: true,
        manager_llm: null,
        agents_count: 3,
        tasks_count: 5,
        last_run: '3小时前',
        status: '就绪',
        version: 'v1.0.2',
    },
    {
        id: 2,
        name: '代码审计与重构',
        description:
            '针对 Python 项目的全面代码质量分析、安全漏洞扫描及重构建议。',
        tags: ['开发', '审计', 'Python'],
        process: '层级式',
        planning: false,
        manager_llm: 'GPT-4 Turbo',
        agents_count: 2,
        tasks_count: 2,
        last_run: '1天前',
        status: '活跃',
        version: 'v2.1.0',
    },
    {
        id: 3,
        name: '客户邮件自动回复',
        description: '监控收件箱，自动分类并生成回复草稿，支持人工审核循环。',
        tags: ['客服', '邮件', '自动化'],
        process: '顺序执行',
        planning: false,
        manager_llm: null,
        agents_count: 1,
        tasks_count: 2,
        last_run: '5分钟前',
        status: '就绪',
        version: 'v1.0.0',
    },
    {
        id: 4,
        name: '数据管道监控',
        description: '实时监控 ETL 作业，具备异常检测和自动报警机制。',
        tags: ['数据', '运维', '监控'],
        process: '顺序执行',
        planning: true,
        manager_llm: null,
        agents_count: 4,
        tasks_count: 8,
        last_run: '刚刚',
        status: '活跃',
        version: 'v1.2.5',
    },
];

export default function ScenariosIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const handleCreateSubmit = (
        data: ScenarioFormValues,
        close: () => void,
    ) => {
        console.log('提交场景配置:', data);
        setTimeout(() => {
            close();
        }, 1000);
    };

    const openCreateModal = () =>
        NiceModal.show(FormSheetModal, {
            title: '创建场景',
            description: '场景作为 Agent 和任务的编排容器。',
            children: (close) => (
                <ScenarioForm
                    onSubmit={(data) => handleCreateSubmit(data, close)}
                    onCancel={close}
                    submitLabel="创建场景"
                />
            ),
        });

    const filteredScenarios = scenarios.filter((scenario) => {
        const matchesSearch =
            scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scenario.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'active')
            return matchesSearch && scenario.status === '活跃';
        if (activeTab === 'planning') return matchesSearch && scenario.planning;

        return matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="场景管理" />

            <CardPage
                tabs={[
                    { value: 'all', label: '全部场景' },
                    { value: 'active', label: '活跃运行中' },
                    { value: 'planning', label: '规划模式' },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchPlaceholder="筛选场景..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                ctaLabel="创建场景"
                onCtaClick={openCreateModal}
                items={filteredScenarios}
                renderItem={(scenario) => <ScenarioCard scenario={scenario} />}
                getKey={(scenario) => scenario.id}
                emptyText="暂无符合条件的场景"
            />
        </AppLayout>
    );
}
