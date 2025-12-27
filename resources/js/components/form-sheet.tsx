import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from './ui/sheet';

interface FormSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    contentWidthClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
}

export function FormSheet({
    open,
    onOpenChange,
    title,
    description,
    children,
    contentWidthClassName,
    headerClassName,
    bodyClassName,
}: FormSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className={cn(
                    'flex h-full w-full flex-col gap-0 p-0 sm:max-w-[500px]',
                    contentWidthClassName,
                )}
            >
                <SheetHeader
                    className={cn('shrink-0 border-b p-6', headerClassName)}
                >
                    <SheetTitle>{title}</SheetTitle>
                    {description ? (
                        <SheetDescription>{description}</SheetDescription>
                    ) : null}
                </SheetHeader>
                <div className={cn('flex-1 overflow-y-auto', bodyClassName)}>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}
