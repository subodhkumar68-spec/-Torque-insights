import { AssessmentConfig } from './AssessmentRegistry';

export interface ScoreOutput {
  dimensions: Record<string, number>;
  mbti?: string;
  riasec?: Record<string, number>;
  vark?: Record<string, number>;
  overallScore: number;
}

export const AssessmentScoring = {
  calculateScores: (config: AssessmentConfig, answers: Record<string, any>): ScoreOutput => {
    const questions = config.questionBank || [];
    const model = config.scoringModel;
    
    // Custom scoring logic for IPMAT (exact percentage of correct answers)
    if (config.id === 'ast-ipmat') {
      const dimensions: Record<string, number> = {
        quantitativeAptitude: 0,
        higherMathematics: 0,
        logicalReasoning: 0,
        verbalAbility: 0
      };

      questions.forEach(q => {
        const dim = q.category; // maps to quantitativeAptitude, higherMathematics, etc.
        if (dim in dimensions) {
          // Increment total questions counter for that dimension programmatically
          if (!dimensions[`_total_${dim}`]) {
            dimensions[`_total_${dim}`] = 0;
            dimensions[`_correct_${dim}`] = 0;
          }
          dimensions[`_total_${dim}`]++;
          const answerVal = answers[q.id];
          if (answerVal === q.correctAnswer) {
            dimensions[`_correct_${dim}`]++;
          }
        }
      });

      // Calculate final percentages
      const activeDims = ['quantitativeAptitude', 'higherMathematics', 'logicalReasoning', 'verbalAbility'];
      let overallSum = 0;
      activeDims.forEach(dim => {
        const total = dimensions[`_total_${dim}`] || 0;
        const correct = dimensions[`_correct_${dim}`] || 0;
        dimensions[dim] = total > 0 ? Math.max(30, Math.min(100, Math.round((correct / total) * 100))) : 75;
        // Clean up temporary counters
        delete dimensions[`_total_${dim}`];
        delete dimensions[`_correct_${dim}`];
        overallSum += dimensions[dim];
      });

      const overallScore = Math.round(overallSum / activeDims.length);

      return {
        dimensions,
        overallScore
      };
    }
    
    // Custom scoring logic for CUET (exact percentage of correct answers + Likert for academic skills)
    if (config.id === 'ast-cuet') {
      const dimensions: Record<string, number> = {
        language: 0,
        generalAptitude: 0,
        domainReadiness: 0,
        academicReadiness: 0
      };

      questions.forEach(q => {
        const dim = q.category; // maps to language, generalAptitude, domainReadiness, academicReadiness
        if (dim in dimensions) {
          if (!dimensions[`_total_${dim}`]) {
            dimensions[`_total_${dim}`] = 0;
            dimensions[`_correct_${dim}`] = 0;
          }
          const answerVal = answers[q.id];
          
          if (q.type === 'likert') {
            // For academic skills (Likert)
            dimensions[`_total_${dim}`] += 100; // max value representation
            if (answerVal !== undefined && answerVal !== null) {
              const val = Number(answerVal);
              const percentage = (val - 1) * 25; // Scale 1-5 to 0-100
              dimensions[`_correct_${dim}`] += percentage;
            } else {
              dimensions[`_correct_${dim}`] += 75; // default neutral baseline
            }
          } else {
            // For single choice questions
            dimensions[`_total_${dim}`]++;
            if (answerVal === q.correctAnswer) {
              dimensions[`_correct_${dim}`]++;
            }
          }
        }
      });

      // Calculate final percentages
      const activeDims = ['language', 'generalAptitude', 'domainReadiness', 'academicReadiness'];
      let overallSum = 0;
      activeDims.forEach(dim => {
        if (dim === 'academicReadiness') {
          const totalMax = dimensions[`_total_${dim}`] || 100;
          const totalEarned = dimensions[`_correct_${dim}`] || 0;
          dimensions[dim] = Math.max(30, Math.min(100, Math.round((totalEarned / totalMax) * 100)));
        } else {
          const total = dimensions[`_total_${dim}`] || 0;
          const correct = dimensions[`_correct_${dim}`] || 0;
          dimensions[dim] = total > 0 ? Math.max(30, Math.min(100, Math.round((correct / total) * 100))) : 75;
        }
        delete dimensions[`_total_${dim}`];
        delete dimensions[`_correct_${dim}`];
        overallSum += dimensions[dim];
      });

      const overallScore = Math.round(overallSum / activeDims.length);

      return {
        dimensions,
        overallScore
      };
    }
    
    // Custom scoring logic for Communication Skills (exact percentage of correct answers)
    if (config.id === 'future-communication') {
      const dimensions: Record<string, number> = {
        verbal: 0,
        written: 0,
        business: 0,
        interpersonal: 0,
        presentation: 0,
        interview: 0
      };

      questions.forEach(q => {
        const dim = q.category; // maps to verbal, written, business, interpersonal, presentation, interview
        if (dim in dimensions) {
          if (!dimensions[`_total_${dim}`]) {
            dimensions[`_total_${dim}`] = 0;
            dimensions[`_correct_${dim}`] = 0;
          }
          dimensions[`_total_${dim}`]++;
          const answerVal = answers[q.id];
          if (answerVal === q.correctAnswer) {
            dimensions[`_correct_${dim}`]++;
          }
        }
      });

      // Calculate final percentages
      const activeDims = ['verbal', 'written', 'business', 'interpersonal', 'presentation', 'interview'];
      let overallSum = 0;
      activeDims.forEach(dim => {
        const total = dimensions[`_total_${dim}`] || 0;
        const correct = dimensions[`_correct_${dim}`] || 0;
        dimensions[dim] = total > 0 ? Math.max(30, Math.min(100, Math.round((correct / total) * 100))) : 75;
        delete dimensions[`_total_${dim}`];
        delete dimensions[`_correct_${dim}`];
        overallSum += dimensions[dim];
      });

      const overallScore = Math.round(overallSum / activeDims.length);

      return {
        dimensions,
        overallScore
      };
    }
    
    // 1. Get competencies for config ID
    const getCompetenciesForConfig = (configId: string): string[] => {
      const id = configId.toLowerCase();
      if (id.includes('high-school') || id.includes('aptitude') || id.includes('career')) {
        return ['analyticalAbility', 'numericalAbility', 'logicalReasoning', 'spatialIntelligence', 'problemSolving'];
      }
      if (id.includes('personality')) {
        return ['introversion', 'extroversion', 'leadership', 'emotionalStability', 'adaptability'];
      }
      if (id.includes('communication')) {
        return ['grammar', 'vocabulary', 'businessWriting', 'publicSpeaking', 'listening'];
      }
      if (id.includes('engineering')) {
        return ['mathematics', 'physics', 'logicalThinking', 'technologyInterest', 'innovation'];
      }
      if (id.includes('medical')) {
        return ['biology', 'observation', 'empathy', 'scientificThinking', 'patience'];
      }
      if (id.includes('commerce')) {
        return ['businessAptitude', 'financialLiteracy', 'quantitativeSkills', 'decisionMaking', 'entrepreneurship'];
      }
      if (id.includes('management')) {
        return ['leadership', 'teamwork', 'strategy', 'communication', 'decisionMaking'];
      }
      // Fallback
      return ['analyticalAbility', 'problemSolving', 'communication', 'leadership', 'decisionMaking'];
    };

    const compKeys = getCompetenciesForConfig(config.id);

    // Initialize accumulators
    const accumulators: Record<string, { earned: number; max: number }> = {};
    compKeys.forEach(k => {
      accumulators[k] = { earned: 0, max: 0 };
    });

    // Helper to find matching competency key
    const findMatchingCompetency = (q: any, idx: number): string => {
      const textToSearch = `${q.id} ${q.category || ''} ${q.prompt || ''} ${JSON.stringify(q.weights || {})}`.toLowerCase();
      for (const key of compKeys) {
        // Match key substrings (e.g. 'math' inside mathematics)
        const partial = key.toLowerCase().substring(0, 5);
        if (textToSearch.includes(partial)) {
          return key;
        }
      }
      // Modulo distribute
      return compKeys[idx % compKeys.length];
    };

    let answeredCount = 0;

    questions.forEach((q, idx) => {
      const answerVal = answers[q.id];
      if (answerVal === undefined || answerVal === null || answerVal === '') return;

      answeredCount++;
      const targetComp = findMatchingCompetency(q, idx);

      // Determine option selected value (1 to 5)
      let selectedOptionVal = 3; // default neutral
      
      if (q.type === 'likert') {
        const val = Number(answerVal);
        if (!isNaN(val)) {
          selectedOptionVal = Math.max(1, Math.min(5, val));
        }
      } else {
        // Single choice or scenario questions
        if (q.correctAnswer !== undefined) {
          selectedOptionVal = (answerVal === q.correctAnswer) ? 5 : 1;
        } else if (q.options && Array.isArray(q.options)) {
          const optIdx = q.options.findIndex((o: any) => o.value === answerVal);
          if (optIdx !== -1) {
            selectedOptionVal = Math.min(5, optIdx + 1);
          } else {
            const charCode = String(answerVal).toLowerCase().charCodeAt(0);
            if (charCode >= 97 && charCode <= 101) { // 'a' to 'e'
              selectedOptionVal = charCode - 96;
            }
          }
        }
      }

      // Check if question has weights to scale importance
      let weight = 1;
      if (q.weights && typeof q.weights === 'object') {
        weight = q.weights[targetComp] || q.weights[Object.keys(q.weights)[0]] || 1;
      }

      accumulators[targetComp].earned += selectedOptionVal * weight;
      accumulators[targetComp].max += 5 * weight;
    });

    // Calculate normalized dimension percentages (30% to 100%)
    const dimensions: Record<string, number> = {};
    let overallSum = 0;
    compKeys.forEach(k => {
      const acc = accumulators[k];
      const score = acc.max > 0 ? Math.round((acc.earned / acc.max) * 100) : 75;
      dimensions[k] = Math.max(30, Math.min(100, score));
      overallSum += dimensions[k];
    });

    const overallScore = compKeys.length > 0 ? Math.round(overallSum / compKeys.length) : 75;

    // Holland RIASEC traits
    const riasec: Record<string, number> = {
      R: Math.round((dimensions[compKeys[0]] || 70) * 0.9),
      I: Math.round((dimensions[compKeys[1] || compKeys[0]] || 75) * 0.95),
      A: Math.round((dimensions[compKeys[2] || compKeys[0]] || 65) * 0.85),
      S: Math.round((dimensions[compKeys[3] || compKeys[0]] || 70) * 0.9),
      E: Math.round((dimensions[compKeys[4] || compKeys[0]] || 80) * 0.92),
      C: Math.round((dimensions[compKeys[1] || compKeys[0]] || 65) * 0.88)
    };

    // MBTI traits
    const isHigh = (k: string) => (dimensions[k] || 70) >= 70;
    const mbtiCode = 
      (isHigh(compKeys[4] || '') ? 'E' : 'I') +
      (isHigh(compKeys[3] || '') ? 'N' : 'S') +
      (isHigh(compKeys[0] || '') ? 'T' : 'F') +
      (isHigh(compKeys[2] || '') ? 'J' : 'P');

    // VARK preferences
    const vark: Record<string, number> = {
      V: Math.round((dimensions[compKeys[0]] || 70) * 0.8),
      A: Math.round((dimensions[compKeys[1] || compKeys[0]] || 75) * 0.85),
      R: Math.round((dimensions[compKeys[2] || compKeys[0]] || 65) * 0.75),
      K: Math.round((dimensions[compKeys[3] || compKeys[0]] || 70) * 0.9)
    };

    return {
      dimensions,
      mbti: mbtiCode,
      riasec,
      vark,
      overallScore
    };
  }
};
