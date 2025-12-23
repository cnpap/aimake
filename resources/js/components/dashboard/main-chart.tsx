import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from 'recharts';

const chartData = [
    { month: '1月', assets: 186, lineage: 80 },
    { month: '2月', assets: 305, lineage: 200 },
    { month: '3月', assets: 237, lineage: 120 },
    { month: '4月', assets: 73, lineage: 190 },
    { month: '5月', assets: 209, lineage: 130 },
    { month: '6月', assets: 214, lineage: 140 },
    { month: '7月', assets: 280, lineage: 160 },
];

export function MainChart() {
    return (
        <Card className="col-span-4 flex h-full flex-col lg:col-span-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>资产增长与血缘覆盖</CardTitle>
                        <CardDescription>
                            实时追踪数据资产和血缘连接情况
                        </CardDescription>
                    </div>
                    {/* Optional: Add time range selector here */}
                </div>
            </CardHeader>
            <CardContent className="min-h-[300px] flex-1 p-0">
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorAssets"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--chart-1)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--chart-1)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="colorLineage"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--chart-2)"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--chart-2)"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ dy: 10 }}
                                height={40}
                                interval="preserveStartEnd"
                            />
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                                strokeOpacity={0.1}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--background)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="assets"
                                stroke="var(--chart-1)"
                                fillOpacity={1}
                                fill="url(#colorAssets)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="lineage"
                                stroke="var(--chart-2)"
                                fillOpacity={1}
                                fill="url(#colorLineage)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
