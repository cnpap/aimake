import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AgentCard } from './components/AgentCard';
import { AgentForm } from './components/agent-form';
import { AgentFormValues } from './components/agent-form-schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '代理管理',
        href: '/agents',
    },
];

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

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function AgentsIndex() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const handleCreateSubmit = (data: AgentFormValues) => {
        console.log('Submitting Agent Config:', data);
        // Simulate API call
        setTimeout(() => {
            setIsCreateOpen(false);
        }, 1000);
    };

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="代理管理" />

            <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <SheetContent className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-[500px]">
                    <SheetHeader className="shrink-0 border-b p-6">
                        <SheetTitle>配置代理 (Agent)</SheetTitle>
                        <SheetDescription>
                            配置 CrewAI Agent 的核心参数、模型策略及执行能力。
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto">
                        <AgentForm
                            onSubmit={handleCreateSubmit}
                            onCancel={() => setIsCreateOpen(false)}
                            submitLabel="创建代理"
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="mx-auto max-w-[1600px] px-6">
                <Tabs
                    defaultValue="all"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <div className="sticky top-0 z-20 -mx-6 flex flex-col gap-3 border-b bg-background/80 px-6 py-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
                        <TabsList className="h-10 bg-muted/50 p-1">
                            <TabsTrigger
                                value="all"
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                全部代理
                            </TabsTrigger>
                            <TabsTrigger
                                value="active"
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                活跃运行中
                            </TabsTrigger>
                            <TabsTrigger
                                value="maintenance"
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                维护中
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                            <div className="w-full md:w-72">
                                <Input
                                    placeholder="搜索代理..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="h-10 bg-background transition-all focus:ring-1"
                                />
                            </div>
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="h-10 px-6 font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                创建代理
                            </Button>
                        </div>
                    </div>

                    <motion.div
                        key={activeTab}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredAgents.map((agent) => (
                                <motion.div
                                    key={agent.id}
                                    variants={itemVariants}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <AgentCard agent={agent} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </Tabs>
            </div>
        </AppLayout>
    );
}
