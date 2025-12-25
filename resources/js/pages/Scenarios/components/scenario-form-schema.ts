import { z } from 'zod';

// Scenario Schema
export const scenarioSchema = z.object({
    name: z.string().min(2, { message: '场景名称至少需要 2 个字符' }),
    description: z.string().optional(),
    tags: z.string().optional(), // Comma separated string for MVP

    // Execution Strategy
    process: z.enum(['sequential', 'hierarchical']).default('sequential'),
    manager_llm: z.string().optional(),

    // Planning
    planning: z.boolean().default(false),
    planning_llm: z.string().optional(),
});

export type ScenarioFormValues = z.infer<typeof scenarioSchema>;

export const defaultScenarioValues: Partial<ScenarioFormValues> = {
    name: '',
    description: '',
    tags: '',
    process: 'sequential',
    planning: false,
    manager_llm: undefined,
    planning_llm: undefined,
};

// Mock Model Options
export const modelOptions = [
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
];
