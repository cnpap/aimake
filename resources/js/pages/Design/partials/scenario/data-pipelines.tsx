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
import { cn } from '@/lib/utils';
import {
    Activity,
    CheckCircle2,
    MoreHorizontal,
    Search,
    Settings2,
    Sliders,
    Waves,
    XCircle,
} from 'lucide-react';
import { DesignSection, SectionHeader } from '../../components/layout';

export default function DataPipelines() {
    return (
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
                            <Button size="default" className="shadow-sm">
                                <Waves className="mr-2 h-4 w-4" /> 新建管道
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
                                                    item.status === 'active' &&
                                                        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400',
                                                    item.status === 'syncing' &&
                                                        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400',
                                                    item.status === 'failed' &&
                                                        'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-400',
                                                    item.status === 'paused' &&
                                                        'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400',
                                                )}
                                            >
                                                {item.status === 'active' && (
                                                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                                                )}
                                                {item.status === 'syncing' && (
                                                    <Activity className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                                                )}
                                                {item.status === 'failed' && (
                                                    <XCircle className="mr-1.5 h-3.5 w-3.5" />
                                                )}
                                                {item.status === 'active'
                                                    ? '运行中'
                                                    : item.status === 'syncing'
                                                      ? '同步中'
                                                      : item.status === 'failed'
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
                                                    {item.throughput}
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
                            <Button variant="outline" size="sm" disabled>
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
    );
}
