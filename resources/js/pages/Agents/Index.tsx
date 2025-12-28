import { CardPage } from '@/components/card-page';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/agents';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { AgentCard } from './components/AgentCard';

// Mock Data
const agents = [
    {
        id: 1,
        name: '数据分析师',
        role: '高级数据分析师',
        goal: '分析数据趋势并生成报告',
        description: '精通 SQL、Python 和数据可视化。能够处理大型数据集。',
        type: 'ReAct',
        model: 'gpt-4-turbo',
        status: 'active',
        tools: ['SQL Client', 'Python REPL', 'Chart Generator'],
        lastRun: '2 小时前',
    },
    {
        id: 2,
        name: '研究助手',
        role: '研究员',
        goal: '进行深入的网络研究并总结发现',
        description: '搜索网络，验证来源，并编制全面的摘要。',
        type: 'Plan & Execute',
        model: 'claude-3-opus',
        status: 'idle',
        tools: ['Web Search', 'Content Scraper', 'Summarizer'],
        lastRun: '1 天前',
    },
    {
        id: 3,
        name: '代码审查员',
        role: '高级软件工程师',
        goal: '审查代码拉取请求并提出改进建议',
        description: '分析代码中的错误、安全问题和风格违规。',
        type: 'ReAct',
        model: 'gpt-4o',
        status: 'active',
        tools: ['GitHub API', 'Linter', 'Security Scanner'],
        lastRun: '5 分钟前',
    },
    {
        id: 4,
        name: '客户支持',
        role: '支持代表',
        goal: '回答客户查询并解决问题',
        description: '处理支持工单、常见问题解答，并升级复杂问题。',
        type: 'Conversational',
        model: 'gpt-3.5-turbo',
        status: 'maintenance',
        tools: ['Knowledge Base', 'Ticket System', 'Email Client'],
        lastRun: '刚刚',
    },
];

export default function AgentsIndex() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const filteredAgents = agents.filter((agent) => {
        const matchesSearch =
            agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'active')
            return matchesSearch && agent.status === 'active';
        if (activeTab === 'maintenance')
            return matchesSearch && agent.status === 'maintenance';

        return matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="代理管理" />

            <CardPage
                tabs={[
                    { value: 'all', label: '全部代理' },
                    { value: 'active', label: '活跃运行中' },
                    { value: 'maintenance', label: '维护中' },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchPlaceholder="搜索代理..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                ctaLabel="创建代理"
                onCtaClick={() => router.visit(create.url())}
                items={filteredAgents}
                renderItem={(agent) => <AgentCard agent={agent} />}
                getKey={(agent) => agent.id}
                emptyText="暂无符合条件的代理"
            />
        </AppLayout>
    );
}
