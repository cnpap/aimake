import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Clock, XCircle } from 'lucide-react';

export type SystemStatus =
    | 'operational'
    | 'degraded'
    | 'outage'
    | 'maintenance';

interface SystemHealthItemProps {
    name: string;
    status: SystemStatus;
    uptime: string;
    latency: string;
}

const statusConfig = {
    operational: {
        icon: CheckCircle2,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        label: 'Operational',
    },
    degraded: {
        icon: AlertTriangle,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        label: 'Degraded',
    },
    outage: {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        label: 'Outage',
    },
    maintenance: {
        icon: Clock,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        label: 'Maintenance',
    },
};

export function SystemHealthList({
    items,
}: {
    items: SystemHealthItemProps[];
}) {
    return (
        <div className="divide-y divide-border">
            {items.map((item) => {
                const config = statusConfig[item.status];
                const Icon = config.icon;

                return (
                    <div
                        key={item.name}
                        className="group flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    'rounded-full p-2 transition-colors group-hover:bg-accent/50',
                                    config.bg,
                                )}
                            >
                                <Icon className={cn('h-4 w-4', config.color)} />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-foreground">
                                    {item.name}
                                </div>
                                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span
                                        className={cn(
                                            'h-1.5 w-1.5 animate-pulse rounded-full',
                                            config.color === 'text-green-500'
                                                ? 'bg-green-500'
                                                : 'bg-yellow-500',
                                        )}
                                    />
                                    {config.label}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-xs text-muted-foreground">
                                {item.latency}
                            </div>
                            <div className="text-xs font-medium text-green-500">
                                {item.uptime}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
