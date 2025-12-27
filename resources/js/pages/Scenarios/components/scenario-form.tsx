import { FormShell, useZodForm } from '@/components/form-shell';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
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
    const form = useZodForm<ScenarioFormValues>({
        schema: scenarioSchema,
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

    return (
        <FormShell
            id="scenario-form"
            form={form}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitLabel={submitLabel}
        >
            <div className="space-y-4 pt-4 pb-8">
                <ScenarioBasicInfo />
                <Separator />
                <ScenarioExecutionStrategy />
                <ScenarioPlanning />
            </div>
        </FormShell>
    );
}
