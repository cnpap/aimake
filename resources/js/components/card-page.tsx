import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { type CSSProperties, type ReactElement, type ReactNode } from 'react';

interface CardPageTab {
    value: string;
    label: string;
}

interface CardPageProps<TItem> {
    tabs: CardPageTab[];
    activeTab: string;
    onTabChange: (value: string) => void;
    searchPlaceholder: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    ctaLabel: string;
    onCtaClick: () => void;
    items: TItem[];
    renderItem: (item: TItem) => ReactNode;
    getKey?: (item: TItem, index: number) => string | number;
    emptyText?: string;
    className?: string;
    headerClassName?: string;
    gridClassName?: string;
    gridMinWidth?: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function CardPage<TItem>({
    tabs,
    activeTab,
    onTabChange,
    searchPlaceholder,
    searchValue,
    onSearchChange,
    ctaLabel,
    onCtaClick,
    items,
    renderItem,
    getKey,
    emptyText = '暂无数据',
    className,
    headerClassName,
    gridClassName,
    gridMinWidth = 280,
}: CardPageProps<TItem>): ReactElement {
    return (
        <div className={cn('w-full px-6', className)}>
            <Tabs
                defaultValue={tabs[0]?.value}
                value={activeTab}
                onValueChange={onTabChange}
            >
                <div
                    className={cn(
                        'sticky top-0 z-20 -mx-6 flex flex-col gap-3 border-b bg-background/80 px-6 py-6 backdrop-blur-md md:flex-row md:items-center md:justify-between',
                        headerClassName,
                    )}
                >
                    <TabsList className="h-10 bg-muted/50 p-1">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="h-full px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                        <div className="w-full md:w-72">
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={(event) =>
                                    onSearchChange(event.target.value)
                                }
                                className="h-10 bg-background transition-all focus:ring-1"
                            />
                        </div>
                        <Button
                            onClick={onCtaClick}
                            className="h-10 px-6 font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {ctaLabel}
                        </Button>
                    </div>
                </div>

                <motion.div
                    key={activeTab}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className={cn(
                        'grid grid-cols-[repeat(auto-fill,minmax(var(--card-min-width),1fr))] gap-6 py-4',
                        gridClassName,
                    )}
                    style={
                        {
                            '--card-min-width': `${gridMinWidth}px`,
                        } as CSSProperties
                    }
                >
                    <AnimatePresence mode="popLayout">
                        {items.length > 0 ? (
                            items.map((item, index) => {
                                const key =
                                    getKey?.(item, index) ?? index.toString();

                                return (
                                    <motion.div
                                        key={key}
                                        variants={itemVariants}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {renderItem(item)}
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full rounded-lg border border-dashed bg-muted/30 p-10 text-center text-sm text-muted-foreground">
                                {emptyText}
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Tabs>
        </div>
    );
}
