import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowLeft,
    CheckCircle2,
    MoreHorizontal,
    Palette,
    Search,
    Settings2,
    Sliders,
    Waves,
    XCircle,
} from 'lucide-react';

import { DatabaseStatusList } from '@/components/dashboard/database-status-list';
import { StatCard } from '@/components/dashboard/stat-card';

// Helper component for section headers - minimal now as we use DesignSection
const SectionHeader = ({
    title,
    description,
}: {
    title: string;
    description?: string;
}) => (
    <div className="flex flex-col space-y-1.5 pb-8">
        <h3 className="text-3xl leading-none font-semibold tracking-tight">
            {title}
        </h3>
        {description && (
            <p className="max-w-3xl text-lg text-muted-foreground">
                {description}
            </p>
        )}
    </div>
);

// New Section Layout Component
interface DesignSectionProps {
    title: string;
    description?: React.ReactNode;
    mode?: 'full' | 'split';
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

const DesignSection = ({
    title,
    description,
    mode = 'split',
    children,
    className,
    containerClassName,
}: DesignSectionProps) => {
    if (mode === 'full') {
        return (
            <section className={cn('space-y-6 py-6', className)}>
                <div className="space-y-2">
                    <h4 className="text-lg font-semibold tracking-tight text-foreground">
                        {title}
                    </h4>
                    {description && (
                        <div className="max-w-4xl text-base text-muted-foreground">
                            {description}
                        </div>
                    )}
                </div>
                <div className={cn('w-full', containerClassName)}>
                    {children}
                </div>
            </section>
        );
    }

    return (
        <section
            className={cn(
                'grid grid-cols-1 gap-8 border-t border-border/40 py-10 first:border-0 lg:grid-cols-12 lg:gap-16',
                className,
            )}
        >
            <div className="space-y-3 lg:col-span-4">
                <h4 className="text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h4>
                {description && (
                    <div className="text-base leading-relaxed text-muted-foreground">
                        {description}
                    </div>
                )}
            </div>
            <div className={cn('lg:col-span-8', containerClassName)}>
                {children}
            </div>
        </section>
    );
};

export default function DesignIndex() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head title="设计规范" />

            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/dashboard"
                            className="group flex items-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <div className="mr-2 rounded-md bg-muted p-1.5 transition-colors group-hover:bg-muted/80">
                                <ArrowLeft className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">
                                返回控制台
                            </span>
                        </Link>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
                            <span className="bg-gradient-to-tr from-primary to-primary/80 bg-clip-text text-transparent">
                                DataX Design
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl space-y-16 px-6 py-12">
                {/* Hero Section */}
                <div className="flex flex-col gap-6 border-b pb-12">
                    <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
                        设计系统
                    </h1>
                    <p className="max-w-3xl text-2xl leading-relaxed font-light text-muted-foreground">
                        构建{' '}
                        <span className="font-medium text-foreground">
                            清晰、高效、一致
                        </span>{' '}
                        的数据可视化调试体验。
                    </p>
                </div>

                <Tabs defaultValue="scenario" className="space-y-12">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="basic">基础组件</TabsTrigger>
                        <TabsTrigger value="advanced">高级组件</TabsTrigger>
                        <TabsTrigger value="scenario">场景界面</TabsTrigger>
                    </TabsList>

                    {/* Tab: 场景界面 (默认显示) */}
                    <TabsContent
                        value="scenario"
                        className="animate-in space-y-12 duration-500 fade-in-50"
                    >
                        <div>
                            <SectionHeader
                                title="数据管道管理"
                                description="高密度数据展示场景。设计重点在于清晰的信息层级与高效的操作路径。"
                            />

                            <DesignSection
                                title="全屏模拟"
                                description="完整的数据管理界面模拟，展示了列表、筛选、状态展示等核心交互。"
                                mode="full"
                            >
                                {/* Simulation Container */}
                                <div className="overflow-hidden rounded-xl border bg-background shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                                    {/* Simulated App Header */}
                                    <div className="flex flex-col items-start justify-between gap-6 border-b bg-muted/20 p-6 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                                                <Waves className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold tracking-tight">
                                                    活跃管道
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    管理您的实时数据摄入。
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-3 sm:w-auto">
                                            <div className="relative flex-1 sm:w-[280px]">
                                                <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="搜索管道..."
                                                    className="h-10 bg-background pl-9"
                                                />
                                            </div>
                                            <Button
                                                size="default"
                                                className="shadow-sm"
                                            >
                                                <Waves className="mr-2 h-4 w-4" />{' '}
                                                新建管道
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Filters Toolbar */}
                                    <div className="flex items-center gap-3 border-b bg-muted/5 p-4 px-6">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-dashed"
                                        >
                                            <Sliders className="mr-2 h-3.5 w-3.5" />
                                            状态
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 border-dashed"
                                        >
                                            <Activity className="mr-2 h-3.5 w-3.5" />
                                            吞吐量
                                        </Button>
                                        <Separator
                                            orientation="vertical"
                                            className="mx-2 h-4"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs text-muted-foreground"
                                        >
                                            重置视图
                                        </Button>
                                        <div className="ml-auto flex items-center gap-4">
                                            <span className="font-mono text-xs text-muted-foreground">
                                                最后更新：刚刚
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Settings2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Table Area */}
                                    <div className="relative w-full overflow-auto">
                                        <Table>
                                            <TableHeader className="bg-muted/30">
                                                <TableRow className="border-b border-border/60 hover:bg-transparent">
                                                    <TableHead className="w-[50px] pl-6">
                                                        <Checkbox />
                                                    </TableHead>
                                                    <TableHead className="h-12 w-[300px]">
                                                        管道名称
                                                    </TableHead>
                                                    <TableHead className="h-12 w-[140px]">
                                                        状态
                                                    </TableHead>
                                                    <TableHead className="h-12 w-[200px]">
                                                        数据源
                                                    </TableHead>
                                                    <TableHead className="h-12 w-[200px]">
                                                        运行指标
                                                    </TableHead>
                                                    <TableHead className="h-12 w-[150px]">
                                                        更新时间
                                                    </TableHead>
                                                    <TableHead className="h-12 w-[60px]"></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    {
                                                        name: 'User_Behavior_Stream',
                                                        id: 'pipe_8291',
                                                        status: 'active',
                                                        source: 'Kafka',
                                                        throughput: '2.4 MB/s',
                                                        updated: '刚刚',
                                                    },
                                                    {
                                                        name: 'Inventory_Batch_Daily',
                                                        id: 'pipe_1029',
                                                        status: 'syncing',
                                                        source: 'PostgreSQL',
                                                        throughput: '120 KB/s',
                                                        updated: '2小时前',
                                                    },
                                                    {
                                                        name: 'Legacy_CRM_Export',
                                                        id: 'pipe_0001',
                                                        status: 'failed',
                                                        source: 'FTP Server',
                                                        throughput: '0 B/s',
                                                        updated: '1天前',
                                                    },
                                                    {
                                                        name: 'Web_Logs_Aggregator',
                                                        id: 'pipe_4492',
                                                        status: 'active',
                                                        source: 'Elasticsearch',
                                                        throughput: '1.8 MB/s',
                                                        updated: '5分钟前',
                                                    },
                                                    {
                                                        name: 'AI_Training_Set_V3',
                                                        id: 'pipe_9921',
                                                        status: 'paused',
                                                        source: 'S3 Bucket',
                                                        throughput: '-',
                                                        updated: '3天前',
                                                    },
                                                ].map((item, i) => (
                                                    <TableRow
                                                        key={i}
                                                        className="group border-b border-border/40 transition-colors hover:bg-muted/30"
                                                    >
                                                        <TableCell className="pl-6">
                                                            <Checkbox />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col py-1">
                                                                <span className="text-sm font-semibold text-foreground">
                                                                    {item.name}
                                                                </span>
                                                                <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                                                                    {item.id}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    'rounded-full border px-2.5 py-0.5 font-medium',
                                                                    item.status ===
                                                                        'active' &&
                                                                        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400',
                                                                    item.status ===
                                                                        'syncing' &&
                                                                        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400',
                                                                    item.status ===
                                                                        'failed' &&
                                                                        'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-400',
                                                                    item.status ===
                                                                        'paused' &&
                                                                        'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400',
                                                                )}
                                                            >
                                                                {item.status ===
                                                                    'active' && (
                                                                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                                                                )}
                                                                {item.status ===
                                                                    'syncing' && (
                                                                    <Activity className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                                                                )}
                                                                {item.status ===
                                                                    'failed' && (
                                                                    <XCircle className="mr-1.5 h-3.5 w-3.5" />
                                                                )}
                                                                {item.status ===
                                                                'active'
                                                                    ? '运行中'
                                                                    : item.status ===
                                                                        'syncing'
                                                                      ? '同步中'
                                                                      : item.status ===
                                                                          'failed'
                                                                        ? '失败'
                                                                        : '暂停'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-sm font-medium">
                                                            {item.source}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-16 text-right font-mono text-xs font-medium">
                                                                    {
                                                                        item.throughput
                                                                    }
                                                                </span>
                                                                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/50">
                                                                    {item.status ===
                                                                        'active' && (
                                                                        <div className="h-full w-[70%] rounded-full bg-emerald-500" />
                                                                    )}
                                                                    {item.status ===
                                                                        'syncing' && (
                                                                        <div className="h-full w-[30%] rounded-full bg-amber-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-muted-foreground">
                                                            {item.updated}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex items-center justify-between border-t bg-muted/5 p-4 px-6">
                                        <p className="text-sm text-muted-foreground">
                                            显示 5 / 24 条管道
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled
                                            >
                                                上一页
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                下一页
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DesignSection>
                        </div>
                    </TabsContent>

                    {/* Tab: 基础组件 */}
                    <TabsContent
                        value="basic"
                        className="animate-in space-y-12 duration-500 fade-in-50"
                    >
                        {/* Buttons */}
                        <section>
                            <SectionHeader
                                title="按钮 (Buttons)"
                                description="核心交互元素，包含多种变体以适应不同层级的操作。"
                            />
                            <DesignSection
                                title="按钮变体"
                                description={
                                    <ul className="mt-4 list-none space-y-2 text-sm">
                                        <li className="flex items-start">
                                            <span className="w-24 shrink-0 font-medium text-foreground">
                                                主要操作
                                            </span>
                                            <span className="text-muted-foreground">
                                                页面中最主要的操作，通常只有一个。
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-24 shrink-0 font-medium text-foreground">
                                                次要操作
                                            </span>
                                            <span className="text-muted-foreground">
                                                次要操作，如“取消”或辅助功能。
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-24 shrink-0 font-medium text-foreground">
                                                幽灵按钮
                                            </span>
                                            <span className="text-muted-foreground">
                                                用于工具栏或列表中的操作图标。
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-24 shrink-0 font-medium text-foreground">
                                                破坏性操作
                                            </span>
                                            <span className="text-muted-foreground">
                                                仅用于不可逆的删除或危险操作。
                                            </span>
                                        </li>
                                    </ul>
                                }
                            >
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <Button>主要操作</Button>
                                        <Button variant="secondary">
                                            次要操作
                                        </Button>
                                        <Button variant="outline">
                                            轮廓按钮
                                        </Button>
                                        <Button variant="ghost">
                                            幽灵按钮
                                        </Button>
                                        <Button variant="destructive">
                                            破坏性操作
                                        </Button>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-wrap items-end gap-4">
                                        <Button size="sm">小</Button>
                                        <Button size="default">默认</Button>
                                        <Button size="lg">大</Button>
                                        <div className="px-4"></div>
                                        <Button size="icon" variant="outline">
                                            <Palette className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <Settings2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </DesignSection>
                        </section>

                        {/* Colors */}
                        <section>
                            <SectionHeader
                                title="配色方案 (Colors)"
                                description="基于系统级变量的主题色板，支持自动暗色模式切换。"
                            />
                            <DesignSection
                                title="系统颜色"
                                description="基于 Shadcn UI 变量的核心主题色。"
                                mode="full"
                            >
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                    {[
                                        {
                                            name: 'Primary',
                                            class: 'bg-primary',
                                            text: 'text-primary-foreground',
                                        },
                                        {
                                            name: 'Secondary',
                                            class: 'bg-secondary',
                                            text: 'text-secondary-foreground',
                                        },
                                        {
                                            name: 'Destructive',
                                            class: 'bg-destructive',
                                            text: 'text-destructive-foreground',
                                        },
                                        {
                                            name: 'Muted',
                                            class: 'bg-muted',
                                            text: 'text-muted-foreground',
                                        },
                                        {
                                            name: 'Accent',
                                            class: 'bg-accent',
                                            text: 'text-accent-foreground',
                                        },
                                        {
                                            name: 'Card',
                                            class: 'bg-card',
                                            text: 'text-card-foreground',
                                        },
                                    ].map((color) => (
                                        <div
                                            key={color.name}
                                            className="group flex flex-col gap-2"
                                        >
                                            <div
                                                className={cn(
                                                    'relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md',
                                                    color.class,
                                                )}
                                            ></div>
                                            <div className="flex flex-col px-1">
                                                <span className="text-sm font-semibold">
                                                    {color.name}
                                                </span>
                                                <span className="font-mono text-[10px] text-muted-foreground opacity-60">
                                                    var(--
                                                    {color.name.toLowerCase()})
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DesignSection>
                        </section>

                        {/* Typography */}
                        <section>
                            <SectionHeader
                                title="字体排印 (Typography)"
                                description="Inter 字体家族，强调数字与代码的易读性。"
                            />

                            <DesignSection
                                title="标题"
                                description="标题的字号与字重。"
                            >
                                <div className="space-y-8">
                                    <div className="space-y-1">
                                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                                            H1 / 4xl / Bold
                                        </p>
                                        <h1 className="text-4xl font-bold tracking-tight">
                                            敏捷的棕色狐狸
                                        </h1>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                                            H2 / 3xl / Semibold
                                        </p>
                                        <h2 className="text-3xl font-semibold tracking-tight">
                                            跳过懒惰的狗
                                        </h2>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                                            H3 / 2xl / Semibold
                                        </p>
                                        <h3 className="text-2xl font-semibold tracking-tight">
                                            数据可视化与调试
                                        </h3>
                                    </div>
                                </div>
                            </DesignSection>

                            <DesignSection
                                title="正文与 UI"
                                description="内容的标准文本样式。"
                            >
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                                            Body / Regular
                                        </p>
                                        <p className="max-w-lg leading-7">
                                            有效的数据管理需要像监控代码一样精确的工具。
                                            DataX 为您的 AI 工作流提供无缝接口。
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                                            Small / Medium (Muted)
                                        </p>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            最后更新于 2 分钟前 • 只读模式
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="mb-2 font-mono text-xs text-muted-foreground">
                                            Code / Mono
                                        </p>
                                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                            npm install @datax/sdk
                                        </code>
                                    </div>
                                </div>
                            </DesignSection>
                        </section>
                    </TabsContent>

                    {/* Tab: 高级组件 */}
                    <TabsContent
                        value="advanced"
                        className="animate-in space-y-12 duration-500 fade-in-50"
                    >
                        <section>
                            <SectionHeader
                                title="业务组件"
                                description="用于仪表盘与详情页的高级封装组件。"
                            />

                            <DesignSection
                                title="统计卡片"
                                description="带有趋势指示的标准统计展示。支持正向、负向和中性趋势。"
                            >
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xs text-muted-foreground">
                                                默认样式
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="font-mono text-[10px]"
                                            >
                                                v1.0
                                            </Badge>
                                        </div>
                                        <StatCard
                                            title="活跃会话"
                                            value="2,845"
                                            trend={{
                                                value: 12.5,
                                                isPositive: true,
                                            }}
                                            description="当前在线用户"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xs text-muted-foreground">
                                                负向趋势
                                            </span>
                                        </div>
                                        <StatCard
                                            title="平均延迟"
                                            value="124ms"
                                            trend={{
                                                value: 8.2,
                                                isPositive: false,
                                            }}
                                            description="全球边缘网络"
                                        />
                                    </div>
                                </div>
                            </DesignSection>

                            <DesignSection
                                title="数据库状态列表"
                                description="数据源实时监控列表。用于仪表盘组件中展示连接健康状态。"
                                className="items-start"
                            >
                                <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-sm">
                                    <div className="flex flex-col space-y-1.5 p-6 pb-2">
                                        <h3 className="leading-none font-semibold tracking-tight">
                                            系统健康度
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            数据源实时监控列表。
                                        </p>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <DatabaseStatusList
                                            items={[
                                                {
                                                    id: '1',
                                                    name: '主 PostgreSQL',
                                                    type: 'postgres',
                                                    status: 'operational',
                                                    uptime: '99.9%',
                                                    latency: '24ms',
                                                },
                                                {
                                                    id: '2',
                                                    name: 'Redis 缓存',
                                                    type: 'mysql',
                                                    status: 'degraded',
                                                    uptime: '98.5%',
                                                    latency: '85ms',
                                                },
                                                {
                                                    id: '3',
                                                    name: '分析库',
                                                    type: 'sqlserver',
                                                    status: 'maintenance',
                                                    uptime: '99.0%',
                                                    latency: '-',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </DesignSection>
                        </section>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
