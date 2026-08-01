import { highSchoolConfig } from '../configs/assessments/high-school';
import { personalityConfig } from '../configs/assessments/personality';
import { learningStyleConfig } from '../configs/assessments/learning-style';
import { engineeringConfig } from '../configs/assessments/engineering';
import { medicalConfig } from '../configs/assessments/medical';
import { commerceConfig } from '../configs/assessments/commerce';
import { managementConfig } from '../configs/assessments/management';
import { ipmatConfig } from '../configs/assessments/ipmat';
import { cuetConfig } from '../configs/assessments/cuet';
import { communicationConfig } from '../configs/assessments/communication';

import { aiReadinessPlaceholder } from '../configs/future/ai-readiness';
import { studyAbroadPlaceholder } from '../configs/future/study-abroad';
import { employabilityPlaceholder } from '../configs/future/employability';
import { leadershipPlaceholder } from '../configs/future/leadership';
import { startupReadinessPlaceholder } from '../configs/future/startup-readiness';

export interface AssessmentConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: string;
  duration?: number;
  instructions?: string[];
  sections?: Array<{ id: string; title: string }>;
  questionBank?: any[];
  scoringModel?: {
    type: string;
    dimensions: string[];
  };
  reportTemplate?: any;
  themeColor?: string;
  recommendedCourses?: string[];
  recommendedCareers?: string[];
  pdfTemplate?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  isPlaceholder?: boolean;
}

const activeAssessments: AssessmentConfig[] = [
  highSchoolConfig,
  personalityConfig,
  learningStyleConfig,
  engineeringConfig,
  medicalConfig,
  commerceConfig,
  managementConfig,
  ipmatConfig,
  cuetConfig,
  communicationConfig
];

const futurePlaceholders: AssessmentConfig[] = [
  aiReadinessPlaceholder,
  studyAbroadPlaceholder,
  employabilityPlaceholder,
  leadershipPlaceholder,
  startupReadinessPlaceholder,
  // Programmatic Future Ready Placeholders
  { id: 'future-clat', title: 'CLAT Readiness Diagnostic', subtitle: 'Benchmark logical reasoning and legal aptitude indices.', icon: 'Compass', category: 'College Entrance', isPlaceholder: true },
  { id: 'future-cat', title: 'CAT Readiness Diagnostic', subtitle: 'Evaluate verbal, quantitative, and data reasoning profiles.', icon: 'Compass', category: 'College Entrance', isPlaceholder: true },
  { id: 'future-gmat', title: 'GMAT Readiness Diagnostic', subtitle: 'Evaluate verbal reasoning and critical data analytics fit.', icon: 'Compass', category: 'College Entrance', isPlaceholder: true },
  { id: 'future-digital-skills', title: 'Digital Skills Assessment', subtitle: 'Audit competency in digital tools and cloud workflows.', icon: 'Zap', category: 'Digital Skills', isPlaceholder: true },
  { id: 'future-entrepreneurship', title: 'Entrepreneurship Readiness', subtitle: 'Benchmark venture ideation and risk appetite profiles.', icon: 'Rocket', category: 'Entrepreneurship', isPlaceholder: true },
  { id: 'future-graduate-employability', title: 'Graduate Employability Benchmark', subtitle: 'Audit core campus-to-corporate readiness variables.', icon: 'Briefcase', category: 'Employability', isPlaceholder: true },
  { id: 'future-campus-placement', title: 'Campus Placement Readiness', subtitle: 'Evaluate verbal reasoning and data reasoning.', icon: 'Briefcase', category: 'Employability', isPlaceholder: true },
  { id: 'future-coding', title: 'Coding Readiness Diagnostic', subtitle: 'Benchmark algorithm design and programming syntax.', icon: 'BrainCircuit', category: 'Tech Fluency', isPlaceholder: true },
  { id: 'future-soft-skills', title: 'Soft Skills Assessment', subtitle: 'Evaluate interpersonal dynamics and workplace etiquette.', icon: 'Users', category: 'Soft Skills', isPlaceholder: true },
  { id: 'future-behavioural', title: 'Behavioral Suitability Audit', subtitle: 'Measure workplace stress tolerances and values fit.', icon: 'Users', category: 'Psychometrics', isPlaceholder: true },
  { id: 'future-teacher-competency', title: 'Teacher Competency Diagnostic', subtitle: 'Benchmark modern classroom management techniques.', icon: 'GraduationCap', category: 'Professional', isPlaceholder: true },
  { id: 'future-faculty', title: 'Faculty Competency Assessment', subtitle: 'Evaluate academic research and pedagogy indices.', icon: 'GraduationCap', category: 'Professional', isPlaceholder: true },
  { id: 'future-corporate-ld', title: 'Corporate L&D Needs Audit', subtitle: 'Map corporate skill gaps and training recommendations.', icon: 'Zap', category: 'L&D Assessment', isPlaceholder: true }
];

export const AssessmentRegistry = {
  getAll: (): AssessmentConfig[] => {
    return [...activeAssessments, ...futurePlaceholders];
  },
  
  getActive: (): AssessmentConfig[] => {
    return activeAssessments;
  },
  
  getById: (id: string): AssessmentConfig | undefined => {
    const slug = id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return activeAssessments.find(a => a.id.toLowerCase() === id.toLowerCase() || a.id.toLowerCase().replace('ast-', '') === slug || a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) ||
           futurePlaceholders.find(f => f.id.toLowerCase() === id.toLowerCase() || f.id.toLowerCase().replace('future-', '') === slug || f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
  }
};
