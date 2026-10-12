export interface FrequencyClass {
  lower: number;
  upper: number;
  frequency: number;
  label?: string; // e.g. "0 ≤ t < 1"
}

export interface DiscreteCategory {
  category: string;
  frequency: number;
}

export interface Dataset {
  id: string;
  title: string;
  subtitle: string;
  variableName: string; // e.g. "Screen time"
  symbol?: string; // e.g. "t"
  unit?: string; // e.g. "hours/day"
  dataType: 'continuous' | 'discrete';
  classes?: FrequencyClass[];
  discreteData?: DiscreteCategory[];
  story: string;
  realWorldContext: string;
}

export interface LearningGoal {
  id: string;
  textEn: string;
  textId: string;
  sectionTarget: number;
}

export interface GlossaryTerm {
  term: string;
  termId: string;
  cambridgeDefinitionEn: string;
  definitionId: string;
  example: string;
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  datasetId: string;
  type: 'multiple-choice' | 'number-input' | 'true-false';
  questionEn: string;
  questionId?: string;
  options?: string[];
  correctAnswer: string | number;
  hintEn: string;
  hintId: string;
  explanationEn: string;
  explanationId: string;
}

export interface SpotMistakeItem {
  id: string;
  title: string;
  description: string;
  faultType: 'gap-in-continuous' | 'touching-in-discrete' | 'uneven-scale';
  options: {
    id: string;
    textEn: string;
    isCorrect: boolean;
    explanationEn: string;
  }[];
}

export interface UserProgress {
  completedSections: number[];
  masteredGoals: string[];
  level1Score: number;
  level2HistogramDone: boolean;
  level2BarChartDone: boolean;
  level3Score: number;
  exitTicketReflection: string;
  exitTicketAnswers: Record<string, string>;
  starsEarned: number;
}
