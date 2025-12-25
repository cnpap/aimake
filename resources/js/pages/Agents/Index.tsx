import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
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
    Bot,
    BrainCircuit,
    MoreHorizontal,
    Play,
    Plus,
    Search,
    Settings,
    Sparkles,
    Terminal,
} from 'lucide-react';

import { useState } from 'react';
import { AgentForm } from './components/agent-form';
import { AgentFormValues } from './components/agent-form-schema';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '代理',
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

export default function AgentsIndex() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleCreateSubmit = (data: AgentFormValues) => {
        console.log('Submitting Agent Config:', data);
        // Simulate API call
        setTimeout(() => {
            setIsCreateOpen(false);
        }, 1000);
    };

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

                    <div className="flex-1 overflow-hidden">
                        <AgentForm
                            onSubmit={handleCreateSubmit}
                            onCancel={() => setIsCreateOpen(false)}
                            submitLabel="创建代理"
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex h-full flex-col space-y-8 p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            代理管理
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            设计、配置并监控您的 AI 劳动力。
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            className="shadow-lg shadow-primary/20"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            创建代理
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="all" className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <TabsList>
                            <TabsTrigger value="all">所有代理</TabsTrigger>
                            <TabsTrigger value="active">活跃</TabsTrigger>
                            <TabsTrigger value="archived">已归档</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="搜索代理..."
                                    className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                                />
                            </div>
                        </div>
                    </div>

                    <TabsContent value="all" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {agents.map((agent) => (
                                <Card
                                    key={agent.id}
                                    className="group border-muted/60 py-0! transition-all hover:shadow-md"
                                >
                                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pt-4 pb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                <Bot className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base font-semibold">
                                                    {agent.name}
                                                </CardTitle>
                                                <CardDescription className="text-xs">
                                                    {agent.role}
                                                </CardDescription>
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
                                                    配置
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Terminal className="mr-2 h-4 w-4" />{' '}
                                                    查看日志
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
                                            {agent.description}
                                        </p>

                                        <div className="mb-4 flex flex-wrap gap-2">
                                            <Badge
                                                variant="secondary"
                                                className="text-xs font-normal"
                                            >
                                                <BrainCircuit className="mr-1 h-3 w-3" />
                                                {agent.type}
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="text-xs font-normal"
                                            >
                                                <Sparkles className="mr-1 h-3 w-3" />
                                                {agent.model}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="text-xs text-muted-foreground">
                                                <span className="font-medium text-foreground">
                                                    {agent.tools.length}
                                                </span>{' '}
                                                个已启用工具
                                            </div>
                                            <div className="flex gap-1">
                                                {agent.tools
                                                    .slice(0, 3)
                                                    .map((tool, i) => (
                                                        <div
                                                            key={i}
                                                            className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                                        >
                                                            {tool}
                                                        </div>
                                                    ))}
                                                {agent.tools.length > 3 && (
                                                    <div className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                                        +
                                                        {agent.tools.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between border-t bg-muted/20 p-4">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${
                                                    agent.status === 'active'
                                                        ? 'bg-green-500'
                                                        : agent.status ===
                                                            'maintenance'
                                                          ? 'bg-yellow-500'
                                                          : 'bg-slate-300'
                                                }`}
                                            />
                                            <span className="text-xs text-muted-foreground capitalize">
                                                {agent.status === 'active'
                                                    ? '活跃'
                                                    : agent.status ===
                                                        'maintenance'
                                                      ? '维护中'
                                                      : '空闲'}
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 gap-1 hover:bg-primary/10 hover:text-primary"
                                        >
                                            <Play className="h-3.5 w-3.5" />
                                            <span className="text-xs">
                                                运行
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
