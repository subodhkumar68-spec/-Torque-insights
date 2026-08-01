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
    
    // Initialize dimension scores
    const dimensions: Record<string, number> = {};
    
    // Setup standard defaults
    const defaultDims = ['problemSolving', 'criticalThinking', 'communicationScore', 'leadershipScore', 'emotionalIntelligence', 'decisionMaking'];
    const activeDims = model?.dimensions && model.dimensions.length > 0 ? model.dimensions : defaultDims;
    
    activeDims.forEach(dim => {
      dimensions[dim] = 75; // default baseline benchmark
    });

    // Likert summation counters
    let totalScoreSum = 0;
    let answeredCount = 0;
    
    // Holland RIASEC trait counters
    const riasec: Record<string, number> = { R: 60, I: 75, A: 65, S: 70, E: 80, C: 65 };
    
    // MBTI preference counters
    const mbtiCounts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    // VARK preference counters
    const vark: Record<string, number> = { V: 40, A: 20, R: 25, K: 15 };

    questions.forEach(q => {
      const answerVal = answers[q.id];
      if (answerVal === undefined || answerVal === null || answerVal === '') return;
      
      answeredCount++;

      // 1. Process Likert scale (1-5 value)
      if (q.type === 'likert') {
        const val = Number(answerVal); // 1 to 5
        const percentage = (val - 1) * 25; // Scale 1-5 to 0-100
        totalScoreSum += percentage;

        // Apply weights if defined
        if (q.weights) {
          Object.keys(q.weights).forEach(wKey => {
            const weight = q.weights[wKey];
            if (wKey in riasec) {
              riasec[wKey] = Math.min(100, Math.max(0, riasec[wKey] + (val - 3) * weight * 4));
            }
            if (wKey in dimensions) {
              dimensions[wKey] = Math.min(100, Math.max(0, dimensions[wKey] + (val - 3) * weight * 5));
            }
          });
        }
      } 
      // 2. Process Choice based Questions
      else if (q.type === 'single' || q.type === 'multiple' || q.type === 'scenario') {
        const values = Array.isArray(answerVal) ? answerVal : [answerVal];
        values.forEach(v => {
          const opt = q.options?.find((o: any) => o.value === v);
          if (opt?.weights) {
            Object.keys(opt.weights).forEach(wKey => {
              const weight = opt.weights[wKey];
              if (wKey in mbtiCounts) {
                mbtiCounts[wKey as keyof typeof mbtiCounts] += weight;
              }
              if (wKey in vark) {
                vark[wKey] = Math.min(100, vark[wKey] + weight * 20);
              }
              if (wKey in dimensions) {
                dimensions[wKey] = Math.min(100, dimensions[wKey] + weight * 15);
              }
            });
          }
        });
      }
    });

    // Compute MBTI code
    const mbtiCode = 
      (mbtiCounts.E >= mbtiCounts.I ? 'E' : 'I') +
      (mbtiCounts.S >= mbtiCounts.N ? 'S' : 'N') +
      (mbtiCounts.T >= mbtiCounts.F ? 'T' : 'F') +
      (mbtiCounts.J >= mbtiCounts.P ? 'J' : 'P');

    // Compute overall score
    const overallScore = answeredCount > 0 ? Math.round(totalScoreSum / answeredCount) : 88;

    // Normalizations
    Object.keys(dimensions).forEach(k => {
      dimensions[k] = Math.max(30, Math.min(100, Math.round(dimensions[k])));
    });

    return {
      dimensions,
      mbti: mbtiCode,
      riasec,
      vark,
      overallScore
    };
  }
};
