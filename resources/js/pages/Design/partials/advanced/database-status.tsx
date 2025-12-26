import { DatabaseStatusList } from '@/components/dashboard/database-status-list';
import { DesignSection } from '../../components/layout';

export default function DatabaseStatus() {
    return (
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
    );
}
