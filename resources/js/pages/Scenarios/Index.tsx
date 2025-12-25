import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    BrainCircuit,
    Map as MapIcon,
    MoreHorizontal,
    Play,
    Plus,
    Search,
    Settings,
    Tag,
} from 'lucide-react';

import { useState } from 'react';
import { ScenarioForm } from './components/scenario-form';
import { ScenarioFormValues } from './components/scenario-form-schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '场景',
        href: '/scenarios',
    },
];

// Mock Data for Scenarios
const scenarios = [
    {
        id: 1,
        name: '市场调研助手',
        description: '自动搜集并分析特定行业的市场趋势、竞争对手动态。',
        tags: ['调研', '分析', '报告'],
        process: 'sequential',
        planning: true,
        manager_llm: null,
        agents_count: 3,
        tasks_count: 5,
        last_run: '3 小时前',
        status: 'ready',
    },
    {
        id: 2,
        name: '代码审计与重构',
        description:
            '针对 Python 项目进行代码质量分析、安全漏洞扫描及重构建议。',
        tags: ['开发', '审计', 'Python'],
        process: 'hierarchical',
        planning: false,
        manager_llm: 'gpt-4-turbo',
        agents_count: 2,
        tasks_count: 2,
        last_run: '1 天前',
        status: 'active',
    },
    {
        id: 3,
        name: '客户邮件自动回复',
        description: '监控收件箱，分类邮件并草拟回复内容，支持人工审核。',
        tags: ['客服', '邮件', '自动化'],
        process: 'sequential',
        planning: false,
        manager_llm: null,
        agents_count: 1,
        tasks_count: 2,
        last_run: '5 分钟前',
        status: 'ready',
    },
];

export default function ScenariosIndex() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleCreateSubmit = (data: ScenarioFormValues) => {
        console.log('Submitting Scenario Config:', data);
        // Simulate API call
        setTimeout(() => {
            setIsCreateOpen(false);
        }, 1000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="场景管理" />

            <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <SheetContent className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-[600px]">
                    <SheetHeader className="shrink-0 border-b p-6">
                        <SheetTitle>创建新场景 (Scenario)</SheetTitle>
                        <SheetDescription>
                            定义一个新的 AI 调试场景。场景是 Agents 和 Tasks
                            的编排容器。
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-hidden">
                        <ScenarioForm
                            onSubmit={handleCreateSubmit}
                            onCancel={() => setIsCreateOpen(false)}
                            submitLabel="创建场景"
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex h-full flex-col space-y-8 p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            场景管理 (Scenarios)
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            创建并管理 AI 调试场景，编排 Agent 与 Task。
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            className="shadow-lg shadow-primary/20"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            创建场景
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="all" className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <TabsList>
                            <TabsTrigger value="all">所有场景</TabsTrigger>
                            <TabsTrigger value="active">最近运行</TabsTrigger>
                            <TabsTrigger value="favorites">收藏</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="搜索场景..."
                                    className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                                />
                            </div>
                        </div>
                    </div>

                    <TabsContent value="all" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {scenarios.map((scenario) => (
                                <Card
                                    key={scenario.id}
                                    className="group border-muted/60 transition-all hover:shadow-md"
                                >
                                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                <MapIcon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base font-semibold">
                                                    {scenario.name}
                                                </CardTitle>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <Badge
                                                        variant="secondary"
                                                        className="h-5 px-1.5 text-[10px] font-normal"
                                                    >
                                                        {scenario.process ===
                                                        'sequential'
                                                            ? '顺序执行'
                                                            : '层级执行'}
                                                    </Badge>
                                                    {scenario.planning && (
                                                        <Badge
                                                            variant="outline"
                                                            className="h-5 border-amber-200 bg-amber-50 px-1.5 text-[10px] font-normal text-amber-700"
                                                        >
                                                            <BrainCircuit className="mr-1 h-3 w-3" />
                                                            Planning
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="-mr-2 h-8 w-8 text-muted-foreground"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    操作
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" />{' '}
                                                    编排 Agents
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Play className="mr-2 h-4 w-4" />{' '}
                                                    运行调试
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">
                                                    删除
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <p className="mb-4 line-clamp-2 h-10 text-sm text-muted-foreground">
                                            {scenario.description}
                                        </p>

                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {scenario.tags.map((tag, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                                                >
                                                    <Tag className="mr-1 h-3 w-3" />
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between border-t bg-muted/20 p-4">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-foreground">
                                                    {scenario.agents_count}
                                                </span>{' '}
                                                Agents
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-foreground">
                                                    {scenario.tasks_count}
                                                </span>{' '}
                                                Tasks
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 gap-1 hover:bg-primary/10 hover:text-primary"
                                        >
                                            <Play className="h-3.5 w-3.5" />
                                            <span className="text-xs">
                                                进入场景
                                            </span>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
