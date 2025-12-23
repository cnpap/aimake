import {
    databaseIconAssets,
    databaseTypeLabels,
    type DatabaseType,
} from '@/components/dashboard/database-icons';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Database,
    XCircle,
} from 'lucide-react';

export type DataSourceStatus =
    | 'operational'
    | 'degraded'
    | 'error'
    | 'maintenance';

interface DataSourceItem {
    id: string;
    name: string;
    type: DatabaseType;
    status: DataSourceStatus;
    uptime: string;
    latency: string;
}

const statusConfig = {
    operational: {
        icon: CheckCircle2,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        label: '运行中',
    },
    degraded: {
        icon: AlertTriangle,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        label: '降级',
    },
    error: {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        label: '异常',
    },
    maintenance: {
        icon: Activity,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        label: '维护中',
    },
};

const DatabaseLogo = ({ type }: { type: DatabaseType }) => {
    const asset = databaseIconAssets[type];

    if (!asset) {
        return <Database className="h-7 w-7 text-muted-foreground" />;
    }

    return (
        <picture className="block h-7 w-7">
            {asset.dark ? (
                <source
                    srcSet={asset.dark}
                    media="(prefers-color-scheme: dark)"
                />
            ) : null}
            <img
                src={asset.light}
                alt={`${databaseTypeLabels[type]} logo`}
                className="h-7 w-7 object-contain"
                loading="lazy"
            />
        </picture>
    );
};

export function DatabaseStatusList({ items }: { items: DataSourceItem[] }) {
    return (
        <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
                {items.map((item) => {
                    const config = statusConfig[item.status];
                    const dbLabel =
                        databaseTypeLabels[item.type] ??
                        item.type.toUpperCase();

                    return (
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-center gap-3">
                                <DatabaseLogo type={item.type} />
                                <div>
                                    <div className="text-sm font-medium text-foreground">
                                        {item.name}
                                    </div>
                                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                        <Badge
                                            variant="secondary"
                                            className="h-4 px-1 text-[10px]"
                                        >
                                            {dbLabel}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground/70">
                                            {item.uptime} 在线
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-right">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'border-0 px-1.5 py-0 text-[10px]',
                                        config.bg,
                                        config.color,
                                    )}
                                >
                                    <config.icon className="mr-1 h-3 w-3" />
                                    {config.label}
                                </Badge>
                                <span className="font-mono text-[10px] text-muted-foreground">
                                    {item.latency}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
