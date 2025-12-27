import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type ReactNode } from 'react';
import {
    type FieldValues,
    type Resolver,
    type SubmitHandler,
    type UseFormProps,
    type UseFormReturn,
    useForm,
} from 'react-hook-form';
import { FormActionBar } from './form-action-bar';
import { Button } from './ui/button';
import { Form } from './ui/form';
type ZodResolverSchema = Parameters<typeof zodResolver>[0];

interface UseZodFormProps<TValues extends FieldValues>
    extends Omit<UseFormProps<TValues>, 'resolver'> {
    schema: ZodResolverSchema;
}

export function useZodForm<TValues extends FieldValues>({
    schema,
    ...rest
}: UseZodFormProps<TValues>): UseFormReturn<TValues> {
    return useForm<TValues>({
        ...rest,
        resolver: zodResolver(schema) as unknown as Resolver<TValues>,
    });
}

interface FormShellProps<TValues extends FieldValues> {
    id: string;
    form: UseFormReturn<TValues>;
    onSubmit: SubmitHandler<TValues>;
    children: ReactNode;
    onCancel?: () => void;
    submitLabel?: string;
    contentClassName?: string;
    formClassName?: string;
    contentWrapper?: boolean;
}

export function FormShell<TValues extends FieldValues>({
    id,
    form,
    onSubmit,
    onCancel,
    submitLabel = '保存',
    children,
    contentClassName,
    formClassName,
    contentWrapper = true,
}: FormShellProps<TValues>) {
    const content = contentWrapper ? (
        <div className={cn('flex-1 overflow-y-auto px-6', contentClassName)}>
            {children}
        </div>
    ) : (
        children
    );

    return (
        <Form {...form}>
            <form
                id={id}
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('flex h-full flex-col', formClassName)}
            >
                {content}

                <FormActionBar>
                    {onCancel && (
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            type="button"
                        >
                            取消
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {submitLabel}
                    </Button>
                </FormActionBar>
            </form>
        </Form>
    );
}
