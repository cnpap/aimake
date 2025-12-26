import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { SectionHeader } from './components/layout';
import DatabaseStatus from './partials/advanced/database-status';
import StatCards from './partials/advanced/stat-cards';
import Buttons from './partials/basic/buttons';
import Colors from './partials/basic/colors';
import MultiSelectDemo from './partials/basic/multi-select-demo';
import Typography from './partials/basic/typography';
import DataPipelines from './partials/scenario/data-pipelines';

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
                        <DataPipelines />
                    </TabsContent>

                    {/* Tab: 基础组件 */}
                    <TabsContent
                        value="basic"
                        className="animate-in space-y-12 duration-500 fade-in-50"
                    >
                        <Buttons />
                        <MultiSelectDemo />
                        <Colors />
                        <Typography />
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
                            <div className="flex flex-col gap-12">
                                <StatCards />
                                <DatabaseStatus />
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
