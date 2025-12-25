import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({
    variant = 'header',
    children,
    className,
    style,
    ...props
}: AppContentProps) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset
                style={style}
                className={cn('min-h-0 flex-1 overflow-y-auto', className)}
                {...props}
            >
                {children}
            </SidebarInset>
        );
    }

    return (
        <main
            className={cn(
                'mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl',
                className,
            )}
            style={style}
            {...props}
        >
            {children}
        </main>
    );
}
