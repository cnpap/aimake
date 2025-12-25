import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScenarioBasicInfo } from './scenario-basic-info';
import { ScenarioExecutionStrategy } from './scenario-execution-strategy';
import {
    defaultScenarioValues,
    ScenarioFormValues,
    scenarioSchema,
} from './scenario-form-schema';
import { ScenarioPlanning } from './scenario-planning';

interface ScenarioFormProps {
    defaultValues?: Partial<ScenarioFormValues>;
    onSubmit: (data: ScenarioFormValues) => void;
    onCancel?: () => void;
    submitLabel?: string;
}

export function ScenarioForm({
    defaultValues,
    onSubmit,
    onCancel,
    submitLabel = '保存',
}: ScenarioFormProps) {
    const form = useForm<ScenarioFormValues>({
        resolver: zodResolver(scenarioSchema) as any,
        defaultValues: { ...defaultScenarioValues, ...defaultValues },
    });

    // Watch values for conditional rendering/validation logic
    const processValue = form.watch('process');
    const planningValue = form.watch('planning');

    // Effect to clear/set defaults based on selection
    useEffect(() => {
        if (processValue === 'sequential') {
            form.setValue('manager_llm', undefined);
        }
    }, [processValue, form]);

    useEffect(() => {
        if (!planningValue) {
            form.setValue('planning_llm', undefined);
        }
    }, [planningValue, form]);

    const handleSubmit = (data: ScenarioFormValues) => {
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form
                id="scenario-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex h-full flex-col"
            >
                <div className="flex-1 overflow-y-auto px-6">
                    <div className="space-y-6">
                        <ScenarioBasicInfo />
                        <Separator />
                        <ScenarioExecutionStrategy />
                        <ScenarioPlanning />
                    </div>
                </div>

                <div className="z-10 flex shrink-0 items-center justify-end gap-2 border-t bg-background p-6 py-2">
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
                </div>
            </form>
        </Form>
    );
}
