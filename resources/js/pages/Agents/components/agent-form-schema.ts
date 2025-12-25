import { z } from 'zod';

// CrewAI Agent Schema matching docs/agent.md
export const agentSchema = z.object({
    // Basic Info
    name: z.string().min(2, { message: '名称至少需要 2 个字符' }),
    role: z.string().min(2, { message: '角色至少需要 2 个字符' }),
    goal: z.string().min(10, { message: '目标至少需要 10 个字符' }),
    backstory: z.string().min(10, { message: '背景故事至少需要 10 个字符' }),

    // Model Config
    llm: z.string().min(1, { message: '请选择主模型' }),
    function_calling_llm: z.string().optional(),

    // Execution Controls
    max_iter: z.number().min(1).default(25),
    max_rpm: z.number().optional(),
    max_execution_time: z.number().optional(),
    max_retry_limit: z.number().min(0).default(2),

    // Capabilities / Booleans
    verbose: z.boolean().default(false),
    memory: z.boolean().default(true),
    cache: z.boolean().default(true),
    allow_delegation: z.boolean().default(false),
    allow_code_execution: z.boolean().default(false),
    code_execution_mode: z.enum(['safe', 'unsafe']).default('safe'),
    respect_context_window: z.boolean().default(true),
    reasoning: z.boolean().default(false),
    multimodal: z.boolean().default(false),
    inject_date: z.boolean().default(false),

    // Advanced Templates
    system_template: z.string().optional(),
    prompt_template: z.string().optional(),
    response_template: z.string().optional(),
});

export type AgentFormValues = z.infer<typeof agentSchema>;

export const defaultAgentValues: Partial<AgentFormValues> = {
    name: '',
    role: '',
    goal: '',
    backstory: '',
    llm: 'gpt-4-turbo',
    max_iter: 25,
    max_retry_limit: 2,
    verbose: true,
    memory: true,
    cache: true,
    allow_delegation: false,
    allow_code_execution: false,
    code_execution_mode: 'safe',
    respect_context_window: true,
    reasoning: false,
    multimodal: false,
    inject_date: false,
    function_calling_llm: undefined,
    max_rpm: undefined,
    max_execution_time: undefined,
    system_template: undefined,
    prompt_template: undefined,
    response_template: undefined,
};

// Mock Model Options (To be replaced by API data)
export const modelOptions = [
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
];
