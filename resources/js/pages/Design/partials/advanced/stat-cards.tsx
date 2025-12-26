import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { DesignSection } from '../../components/layout';

export default function StatCards() {
    return (
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
    );
}
