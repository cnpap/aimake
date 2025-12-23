'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';

export const description = '交互式柱状图';

const chartData = [
    { date: '2024-04-01', import: 2220, export: 1500 },
    { date: '2024-04-02', import: 970, export: 1800 },
    { date: '2024-04-03', import: 1670, export: 1200 },
    { date: '2024-04-04', import: 2420, export: 2600 },
    { date: '2024-04-05', import: 3730, export: 2900 },
    { date: '2024-04-06', import: 3010, export: 3400 },
    { date: '2024-04-07', import: 2450, export: 1800 },
    { date: '2024-04-08', import: 4090, export: 3200 },
    { date: '2024-04-09', import: 590, export: 1100 },
    { date: '2024-04-10', import: 2610, export: 1900 },
    { date: '2024-04-11', import: 3270, export: 3500 },
    { date: '2024-04-12', import: 2920, export: 2100 },
    { date: '2024-04-13', import: 3420, export: 3800 },
    { date: '2024-04-14', import: 1370, export: 2200 },
    { date: '2024-04-15', import: 1200, export: 1700 },
    { date: '2024-04-16', import: 1380, export: 1900 },
    { date: '2024-04-17', import: 4460, export: 3600 },
    { date: '2024-04-18', import: 3640, export: 4100 },
    { date: '2024-04-19', import: 2430, export: 1800 },
    { date: '2024-04-20', import: 890, export: 1500 },
    { date: '2024-04-21', import: 1370, export: 2000 },
    { date: '2024-04-22', import: 2240, export: 1700 },
    { date: '2024-04-23', import: 1380, export: 2300 },
    { date: '2024-04-24', import: 3870, export: 2900 },
    { date: '2024-04-25', import: 2150, export: 2500 },
    { date: '2024-04-26', import: 750, export: 1300 },
    { date: '2024-04-27', import: 3830, export: 4200 },
    { date: '2024-04-28', import: 1220, export: 1800 },
    { date: '2024-04-29', import: 3150, export: 2400 },
    { date: '2024-04-30', import: 4540, export: 3800 },
    { date: '2024-05-01', import: 1650, export: 2200 },
    { date: '2024-05-02', import: 2930, export: 3100 },
    { date: '2024-05-03', import: 2470, export: 1900 },
    { date: '2024-05-04', import: 3850, export: 4200 },
    { date: '2024-05-05', import: 4810, export: 3900 },
    { date: '2024-05-06', import: 4980, export: 5200 },
    { date: '2024-05-07', import: 3880, export: 3000 },
    { date: '2024-05-08', import: 1490, export: 2100 },
    { date: '2024-05-09', import: 2270, export: 1800 },
    { date: '2024-05-10', import: 2930, export: 3300 },
    { date: '2024-05-11', import: 3350, export: 2700 },
    { date: '2024-05-12', import: 1970, export: 2400 },
    { date: '2024-05-13', import: 1970, export: 1600 },
    { date: '2024-05-14', import: 4480, export: 4900 },
    { date: '2024-05-15', import: 4730, export: 3800 },
    { date: '2024-05-16', import: 3380, export: 4000 },
    { date: '2024-05-17', import: 4990, export: 4200 },
    { date: '2024-05-18', import: 3150, export: 3500 },
    { date: '2024-05-19', import: 2350, export: 1800 },
    { date: '2024-05-20', import: 1770, export: 2300 },
    { date: '2024-05-21', import: 820, export: 1400 },
    { date: '2024-05-22', import: 810, export: 1200 },
    { date: '2024-05-23', import: 2520, export: 2900 },
    { date: '2024-05-24', import: 2940, export: 2200 },
    { date: '2024-05-25', import: 2010, export: 2500 },
    { date: '2024-05-26', import: 2130, export: 1700 },
    { date: '2024-05-27', import: 4200, export: 4600 },
    { date: '2024-05-28', import: 2330, export: 1900 },
    { date: '2024-05-29', import: 780, export: 1300 },
    { date: '2024-05-30', import: 3400, export: 2800 },
    { date: '2024-05-31', import: 1780, export: 2300 },
    { date: '2024-06-01', import: 1780, export: 2000 },
    { date: '2024-06-02', import: 4700, export: 4100 },
    { date: '2024-06-03', import: 1030, export: 1600 },
    { date: '2024-06-04', import: 4390, export: 3800 },
    { date: '2024-06-05', import: 880, export: 1400 },
    { date: '2024-06-06', import: 2940, export: 2500 },
    { date: '2024-06-07', import: 3230, export: 3700 },
    { date: '2024-06-08', import: 3850, export: 3200 },
    { date: '2024-06-09', import: 4380, export: 4800 },
    { date: '2024-06-10', import: 1550, export: 2000 },
    { date: '2024-06-11', import: 920, export: 1500 },
    { date: '2024-06-12', import: 4920, export: 4200 },
    { date: '2024-06-13', import: 810, export: 1300 },
    { date: '2024-06-14', import: 4260, export: 3800 },
    { date: '2024-06-15', import: 3070, export: 3500 },
    { date: '2024-06-16', import: 3710, export: 3100 },
    { date: '2024-06-17', import: 4750, export: 5200 },
    { date: '2024-06-18', import: 1070, export: 1700 },
    { date: '2024-06-19', import: 3410, export: 2900 },
    { date: '2024-06-20', import: 4080, export: 4500 },
    { date: '2024-06-21', import: 1690, export: 2100 },
    { date: '2024-06-22', import: 3170, export: 2700 },
    { date: '2024-06-23', import: 4800, export: 5300 },
    { date: '2024-06-24', import: 1320, export: 1800 },
    { date: '2024-06-25', import: 1410, export: 1900 },
    { date: '2024-06-26', import: 4340, export: 3800 },
    { date: '2024-06-27', import: 4480, export: 4900 },
    { date: '2024-06-28', import: 1490, export: 2000 },
    { date: '2024-06-29', import: 1030, export: 1600 },
    { date: '2024-06-30', import: 4460, export: 4000 },
];

const chartConfig = {
    views: {
        label: '数据量',
    },
    import: {
        label: '导入量',
        color: 'var(--chart-2)',
    },
    export: {
        label: '导出量',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function DailyImportChart() {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>('import');

    const total = React.useMemo(
        () => ({
            import: chartData.reduce((acc, curr) => acc + curr.import, 0),
            export: chartData.reduce((acc, curr) => acc + curr.export, 0),
        }),
        [],
    );

    return (
        <Card className="py-0!">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>每日数据导入/导出量</CardTitle>
                    <CardDescription>
                        展示过去 3 个月的数据吞吐情况
                    </CardDescription>
                </div>
                <div className="flex">
                    {['import', 'export'].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg leading-none font-bold sm:text-3xl">
                                    {total[
                                        key as keyof typeof total
                                    ].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('zh-CN', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString('zh-CN', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
