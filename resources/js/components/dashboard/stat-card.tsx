import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
        label?: string;
    };
    description?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    trend,
    description,
    className,
}: StatCardProps) {
    return (
        <Card className={cn('relative overflow-hidden', className)}>
            <img
                src="/svg/subtle/ccchaos.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-30 w-65 opacity-30"
            />
            <div className="translate-y--8 absolute top-0 right-0 h-24 w-24 translate-x-8 rounded-full bg-primary/10 blur-3xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                {trend && (
                    <div className="mt-1 flex items-center text-xs">
                        <span
                            className={cn(
                                'mr-1 font-medium',
                                trend.isPositive
                                    ? 'text-green-500'
                                    : 'text-red-500',
                            )}
                        >
                            {trend.isPositive ? '+' : ''}
                            {trend.value}%
                        </span>
                        <span className="text-muted-foreground">
                            {trend.label || 'from last month'}
                        </span>
                    </div>
                )}
                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
