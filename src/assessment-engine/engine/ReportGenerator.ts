import { AssessmentConfig } from './AssessmentRegistry';
import { AssessmentScoring } from './AssessmentScoring';
import { CareerDNAReport, dbService } from '../../services/dbService';

export const ReportGenerator = {
  generateReport: (
    userId: string,
    config: AssessmentConfig,
    answers: Record<string, any>
  ): CareerDNAReport => {
    // 1. Calculate scores dynamically
    const scores = AssessmentScoring.calculateScores(config, answers);
    const activeUser = JSON.parse(localStorage.getItem('careerdna_current_user') || 'null') || { name: 'Sarah Jenkins', email: 'guest@example.com' };
    
    // 2. Resolve content from configuration
    const strengths = config.recommendedCareers 
      ? config.recommendedCareers.map(c => `Demonstrates strong potential for success in ${c} related tracks.`)
      : ['Analytical Problem Solving', 'Conceptual Logic Mastery'];
      
    const weaknesses = [
      'Focus on reviewing practical project coordination methodologies.',
      'Refine timed structural decision speeds under pressure.'
    ];

    const growthAreas = [
      'Take collaborative leadership roles in team milestones.',
      'Practice presentation delivery drafts under micro-sessions.'
    ];

    const careerRecommendations = config.recommendedCareers?.map((c, i) => ({
      career: c,
      matchPercentage: scores.overallScore - i * 4,
      description: `Targeting growth trajectories in professional ${c.toLowerCase()} ecosystems.`
    })) || [];

    const skillGapAnalysis = config.scoringModel?.dimensions.map((dim, idx) => ({
      skill: dim.replace(/Score|Index|Intelligence/g, '').replace(/([A-Z])/g, ' $1').trim(),
      current: scores.dimensions[dim] || 75,
      required: 90
    })) || [];

    const learningRoadmap = [
      {
        phase: 'Phase 1',
        title: 'Foundational Knowledge & Skills',
        duration: '3 Months',
        details: config.recommendedCourses?.map(c => `Explore core modules in ${c}`) || ['Study base disciplines']
      },
      {
        phase: 'Phase 2',
        title: 'Advanced Diagnostic Certs',
        duration: '6 Months',
        details: [`Obtain domain credentials`, `Build interactive project portfolios`]
      }
    ];

    // 3. Compile report object with rich schema properties
    const newReport: CareerDNAReport = {
      id: `rep-${userId.substring(4)}-${Date.now()}`,
      userId,
      category: config.category,
      subCategory: config.title, // store assessment name in subCategory
      submittedAt: Date.now(),
      scores: {
        riasec: scores.riasec as any,
        mbti: scores.mbti,
        leadershipScore: scores.dimensions.leadershipScore || scores.overallScore,
        communicationScore: scores.dimensions.communicationScore || scores.overallScore,
        problemSolving: scores.dimensions.problemSolving || scores.overallScore,
        emotionalIntelligence: scores.dimensions.emotionalIntelligence || scores.overallScore,
        decisionMaking: scores.dimensions.decisionMaking || scores.overallScore,
        criticalThinking: scores.dimensions.criticalThinking || scores.overallScore
      },
      strengths,
      weaknesses,
      growthAreas,
      careerRecommendations,
      suggestedDegrees: config.recommendedCourses || [],
      suggestedCertifications: [`${config.title} Certified Associate`],
      suggestedColleges: ['Tier 1 Universities', 'Symbiosis Pune', 'BITS Pilani'],
      skillGapAnalysis,
      learningRoadmap,
      
      // Enterprise database requirements
      assessmentId: config.id,
      assessmentName: config.title,
      candidateId: userId,
      candidateName: activeUser.name,
      email: activeUser.email,
      mobile: activeUser.phone || activeUser.mobile || '',
      school: activeUser.schoolName || activeUser.collegeName || '',
      class: activeUser.class || activeUser.educationClass || 'Undergraduate',
      city: activeUser.city || '',
      answers: answers,
      createdAt: Date.now()
    };

    // Save report in db
    const reports = dbService.getReports();
    reports.push(newReport);
    dbService.saveReports(reports);

    // Update assessment session mapping
    const sessions = dbService.getSessions();
    const activeSession = sessions.find(s => s.userId === userId && !s.submitted);
    if (activeSession) {
      activeSession.submitted = true;
      activeSession.completedAt = Date.now();
      activeSession.reportId = newReport.id;
      dbService.saveSessions(sessions);
    }

    return newReport;
  }
};
