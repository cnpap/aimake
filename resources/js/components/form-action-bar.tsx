import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

interface FormActionBarProps {
    align?: 'start' | 'end' | 'between';
    className?: string;
}

export function FormActionBar({
    align = 'end',
    children,
    className,
}: PropsWithChildren<FormActionBarProps>) {
    const alignmentClass =
        align === 'between'
            ? 'justify-between'
            : align === 'start'
              ? 'justify-start'
              : 'justify-end';

    return (
        <div
            className={cn(
                'sticky bottom-0 z-10 flex shrink-0 items-center gap-2 border-t bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80',
                alignmentClass,
                className,
            )}
        >
            {children}
        </div>
    );
}
