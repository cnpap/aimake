import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { type ReactNode } from 'react';
import {
    type FieldValues,
    type SubmitHandler,
    type UseFormReturn,
} from 'react-hook-form';

export interface FormPageTab {
    value: string;
    label: string;
}

export type FormPageWidth = 'sm' | 'md' | 'lg' | 'full';

const maxWidthMap: Record<FormPageWidth, string> = {
    sm: 'max-w-xl',
    md: 'max-w-3xl',
    lg: 'max-w-6xl',
    full: 'max-w-full',
};

interface FormPageProps<TValues extends FieldValues> {
    tabs: FormPageTab[];
    activeTab: string;
    onTabChange: (value: string) => void;
    form: UseFormReturn<TValues>;
    onSubmit: SubmitHandler<TValues>;
    saveLabel?: string;
    children: ReactNode;
    className?: string;
    headerClassName?: string;
    onBack?: () => void;
    formWidth?: FormPageWidth;
}

export function FormPage<TValues extends FieldValues>({
    tabs,
    activeTab,
    onTabChange,
    form,
    onSubmit,
    saveLabel = '保存',
    children,
    className,
    headerClassName,
    onBack,
    formWidth = 'md',
}: FormPageProps<TValues>) {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('w-full px-6', className)}
            >
                <div
                    className={cn(
                        'sticky top-0 z-20 -mx-6 flex flex-col gap-3 border-b bg-background/80 px-6 py-6 backdrop-blur-md md:flex-row md:items-center md:justify-between',
                        headerClassName,
                    )}
                >
                    <div className="flex items-center gap-2">
                        {onBack && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={onBack}
                                className="mr-2"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        )}
                    </div>

                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="h-10 px-6 font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {form.formState.isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {saveLabel}
                        </Button>
                    </div>
                </div>

                <Tabs
                    defaultValue={tabs[0]?.value}
                    value={activeTab}
                    onValueChange={onTabChange}
                    className={cn(
                        'mx-auto mt-6 flex flex-col gap-6',
                        maxWidthMap[formWidth],
                    )}
                >
                    <TabsList className="h-10 w-fit justify-start bg-muted/50 p-1">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="px-4 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="w-full">{children}</div>
                </Tabs>
            </form>
        </Form>
    );
}
