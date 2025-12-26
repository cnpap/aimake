import { cn } from '@/lib/utils';

export const SectionHeader = ({
    title,
    description,
}: {
    title: string;
    description?: string;
}) => (
    <div className="flex flex-col space-y-1.5 pb-8">
        <h3 className="text-3xl leading-none font-semibold tracking-tight">
            {title}
        </h3>
        {description && (
            <p className="max-w-3xl text-lg text-muted-foreground">
                {description}
            </p>
        )}
    </div>
);

interface DesignSectionProps {
    title: string;
    description?: React.ReactNode;
    mode?: 'full' | 'split';
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export const DesignSection = ({
    title,
    description,
    mode = 'split',
    children,
    className,
    containerClassName,
}: DesignSectionProps) => {
    if (mode === 'full') {
        return (
            <section className={cn('space-y-6 py-6', className)}>
                <div className="space-y-2">
                    <h4 className="text-lg font-semibold tracking-tight text-foreground">
                        {title}
                    </h4>
                    {description && (
                        <div className="max-w-4xl text-base text-muted-foreground">
                            {description}
                        </div>
                    )}
                </div>
                <div className={cn('w-full', containerClassName)}>
                    {children}
                </div>
            </section>
        );
    }

    return (
        <section
            className={cn(
                'grid grid-cols-1 gap-8 border-t border-border/40 py-10 first:border-0 lg:grid-cols-12 lg:gap-16',
                className,
            )}
        >
            <div className="space-y-3 lg:col-span-4">
                <h4 className="text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h4>
                {description && (
                    <div className="text-base leading-relaxed text-muted-foreground">
                        {description}
                    </div>
                )}
            </div>
            <div className={cn('lg:col-span-8', containerClassName)}>
                {children}
            </div>
        </section>
    );
};
