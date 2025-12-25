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
import { ScenarioCard } from './components/ScenarioCard';
import { ScenarioForm } from './components/scenario-form';
import { ScenarioFormValues } from './components/scenario-form-schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '场景管理',
        href: '/scenarios',
    },
];

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

export default function ScenariosIndex() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const handleCreateSubmit = (data: ScenarioFormValues) => {
        console.log('提交场景配置:', data);
        setTimeout(() => {
            setIsCreateOpen(false);
        }, 1000);
    };

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="场景管理" />

            <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <SheetContent className="w-full p-0 sm:max-w-[400px]">
                    <SheetHeader className="border-b px-6 py-4">
                        <SheetTitle className="text-xl font-bold tracking-tight">
                            创建场景
                        </SheetTitle>
                        <SheetDescription className="text-muted-foreground">
                            配置新的 AI 调试场景。场景作为 Agent
                            和任务的编排容器。
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        <ScenarioForm
                            onSubmit={handleCreateSubmit}
                            onCancel={() => setIsCreateOpen(false)}
                            submitLabel="创建场景"
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="mx-auto max-w-[1600px] space-y-8 px-6 py-10">
                <Tabs
                    defaultValue="all"
                    value={activeTab}
                    className="space-y-6"
                    onValueChange={setActiveTab}
                >
                    <div className="flex flex-col gap-3 border-b pb-6 md:flex-row md:items-center md:justify-between">
                        <TabsList className="h-10 bg-muted/50 p-1">
                            <TabsTrigger
                                value="all"
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                全部场景
                            </TabsTrigger>
                            <TabsTrigger
                                value="active"
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                活跃运行中
                            </TabsTrigger>
                            <TabsTrigger
                                value="planning"
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                规划模式
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                            <div className="w-full md:w-72">
                                <Input
                                    placeholder="筛选场景..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="h-10 bg-background transition-all focus:ring-1"
                                />
                            </div>
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                size="lg"
                                className="h-11 px-6 font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                创建场景
                            </Button>
                        </div>
                    </div>

                    <motion.div
                        key={activeTab}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredScenarios.map((scenario) => (
                                <motion.div
                                    key={scenario.id}
                                    variants={itemVariants}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ScenarioCard scenario={scenario} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </Tabs>
            </div>
        </AppLayout>
    );
}
