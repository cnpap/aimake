import { DailyImportChart } from '@/components/dashboard/daily-import-chart';
import { DatabaseStatusList } from '@/components/dashboard/database-status-list';
import { MainChart } from '@/components/dashboard/main-chart';
import { RecentAssetsTable } from '@/components/dashboard/recent-assets-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, RefreshCw } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '仪表盘',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="仪表盘" />

            <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            平台概览
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            实时洞察您的 AI 数据资产和血缘健康状况。
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden md:flex"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            刷新
                        </Button>
                        <Button
                            size="sm"
                            className="shadow-lg shadow-primary/20"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            新建资产
                        </Button>
                    </div>
                </div>

                {/* Daily Import Chart (Full Width) */}
                <div>
                    <DailyImportChart />
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="数据资产总数"
                        value="2,854"
                        trend={{
                            value: 12.5,
                            isPositive: true,
                            label: '较上月',
                        }}
                        description="活跃数据集 & 模型"
                    />
                    <StatCard
                        title="血缘覆盖率"
                        value="94%"
                        trend={{
                            value: 2.1,
                            isPositive: true,
                            label: '较上月',
                        }}
                        description="拥有完整血缘的资产"
                    />
                    <StatCard
                        title="数据质量评分"
                        value="88.5"
                        trend={{
                            value: 0.4,
                            isPositive: false,
                            label: '较上月',
                        }}
                        description="所有资产平均分"
                    />
                    <StatCard
                        title="活跃 AI 模型"
                        value="42"
                        trend={{ value: 4, isPositive: true, label: '较上月' }}
                        description="生产环境运行中"
                    />
                </div>

                {/* Main Content Area */}
                <div className="grid h-full gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Main Chart */}
                    <div className="col-span-4 lg:col-span-5">
                        <MainChart />
                    </div>

                    {/* System Health */}
                    <Card className="col-span-2 flex flex-col lg:col-span-2">
                        <CardHeader>
                            <CardTitle>数据源状态</CardTitle>
                            <CardDescription>实时数据源监控</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 pb-4 pl-4">
                            <DatabaseStatusList
                                items={[
                                    {
                                        id: 'stats-bureau',
                                        name: '国家数据局实时库',
                                        type: 'postgres',
                                        status: 'operational',
                                        uptime: '99.99%',
                                        latency: '18ms',
                                    },
                                    {
                                        id: 'province-stats',
                                        name: '省统计局指标仓',
                                        type: 'mysql',
                                        status: 'operational',
                                        uptime: '99.90%',
                                        latency: '35ms',
                                    },
                                    {
                                        id: 'city-social',
                                        name: '市社保局缴费库',
                                        type: 'sqlserver',
                                        status: 'degraded',
                                        uptime: '98.40%',
                                        latency: '110ms',
                                    },
                                    {
                                        id: 'tax-center',
                                        name: '财政税务共享平台',
                                        type: 'postgres',
                                        status: 'maintenance',
                                        uptime: '99.10%',
                                        latency: '-',
                                    },
                                    {
                                        id: 'healthcare',
                                        name: '卫健委医疗数据网',
                                        type: 'mysql',
                                        status: 'operational',
                                        uptime: '99.95%',
                                        latency: '27ms',
                                    },
                                    {
                                        id: 'population',
                                        name: '公安人口基础库',
                                        type: 'sqlserver',
                                        status: 'error',
                                        uptime: '96.50%',
                                        latency: '420ms',
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Assets Table */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight">
                            最近活动
                        </h2>
                        <Button variant="ghost" className="text-sm">
                            查看全部
                        </Button>
                    </div>
                    <RecentAssetsTable
                        assets={[
                            {
                                id: 1,
                                name: 'Customer_360_View',
                                type: 'dataset',
                                owner: '数据工程',
                                status: 'active',
                                lastUpdated: '2 小时前',
                            },
                            {
                                id: 2,
                                name: 'Churn_Prediction_v2',
                                type: 'model',
                                owner: '数据科学',
                                status: 'active',
                                lastUpdated: '4 小时前',
                            },
                            {
                                id: 3,
                                name: 'Payment_Gateway_Raw',
                                type: 'dataset',
                                owner: '支付团队',
                                status: 'draft',
                                lastUpdated: '1 天前',
                            },
                            {
                                id: 4,
                                name: 'Marketing_Lineage',
                                type: 'lineage',
                                owner: '市场运营',
                                status: 'active',
                                lastUpdated: '2 天前',
                            },
                            {
                                id: 5,
                                name: 'User_Behavior_Logs',
                                type: 'dataset',
                                owner: '分析团队',
                                status: 'archived',
                                lastUpdated: '5 天前',
                            },
                        ]}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
