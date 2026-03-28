
export interface StepResult {
  step: number;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  content?: string;
  error?: string;
}

export interface PipelineExecution {
  prompt: string;
  results: StepResult[];
  isGenerating: boolean;
}

export interface ProductPRD {
  metadata: {
    version: string;
    author: string;
  };
  overview: {
    title: string;
    summary: string;
  };
  features: {
    id: string;
    name: string;
    description: string;
    priority: 'P0' | 'P1' | 'P2';
  }[];
  user_stories: string[];
  technical_constraints: string[];
}
