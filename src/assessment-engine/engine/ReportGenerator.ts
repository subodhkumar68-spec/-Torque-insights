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
    let strengths = config.recommendedCareers 
      ? config.recommendedCareers.map(c => `Demonstrates strong potential for success in ${c} related tracks.`)
      : ['Analytical Problem Solving', 'Conceptual Logic Mastery'];
      
    const getAssessmentSpecificContent = (id: string, title: string) => {
      switch (id) {
        case 'ast-aptitude':
          return {
            summary: `The candidate has completed the High School Career Aptitude Test. Their profile shows strong cognitive capabilities in quantitative reasoning and logical deduction. They demonstrate a high alignment with analytical and investigative career pathways.`,
            weaknesses: [
              'Improve speed in solving complex abstract spatial puzzles.',
              'Review structured vocabulary definitions and reading comprehension exercises.'
            ],
            growthAreas: [
              'Participate in school science fairs or math olympiads.',
              'Join public speaking clubs to balance verbal and analytical competencies.'
            ]
          };
        case 'ast-personality':
          return {
            summary: `The candidate has completed the Personality Mapping Diagnostic. Their profile highlights a distinct communication style, strong collaborative team energy, and a natural tendency toward empathetic and strategic decision-making.`,
            weaknesses: [
              'Tendency to overcommit to multiple team tasks simultaneously.',
              'Needs to balance logical structure with immediate action plans.'
            ],
            growthAreas: [
              'Set firm boundaries for project task ownership in group settings.',
              'Practice structured journal reflections on delegation methodologies.'
            ]
          };
        case 'ast-learning':
          return {
            summary: `The candidate has completed the Cognitive Learning Style Diagnostic. Their scores reveal a high preference for visual and kinesthetic learning channels. They process complex concepts best when utilizing diagrams, maps, and practical experiments.`,
            weaknesses: [
              'Difficulty retaining purely auditory lectures without visual note-taking.',
              'Tendency to skip reading textbooks in favor of hands-on tutorials.'
            ],
            growthAreas: [
              'Utilize mind-mapping and color-coded notes during self-study sessions.',
              'Convert text paragraphs into diagrams or process flowcharts.'
            ]
          };
        case 'ast-engineering':
          return {
            summary: `The candidate has completed the Engineering Readiness Assessment. Their performance indicates strong suitability for STEM tracks, with high marks in physics concepts, programming logic, and structural analysis.`,
            weaknesses: [
              'Refine speed in solving multi-variable calculus equations under time constraints.',
              'Focus on developing documentation and technical writing skills.'
            ],
            growthAreas: [
              'Enroll in hands-on robotics workshops or coding bootcamps.',
              'Contribute to open-source software projects or structural modeling labs.'
            ]
          };
        case 'ast-medical':
          return {
            summary: `The candidate has completed the Medical Career Fit Assessment. Their profile highlights a strong interest in anatomical sciences, clinical precision, and high emotional resilience required for healthcare careers.`,
            weaknesses: [
              'Needs to practice maintaining high alertness during prolonged clinical observation cycles.',
              'Ensure systematic documentation of physiological data observations.'
            ],
            growthAreas: [
              'Shadow medical professionals or volunteer in clinical/first-aid camps.',
              'Practice stress-management biofeedback techniques for emergency simulations.'
            ]
          };
        case 'ast-commerce':
          return {
            summary: `The candidate has completed the Commerce Career Fit Assessment. Their profile indicates high financial acumen, commercial logic, and a solid understanding of economics and tax frameworks.`,
            weaknesses: [
              'Improve speed in analyzing complex multi-ledger balance sheets.',
              'Needs to keep updated with real-time global trade policies.'
            ],
            growthAreas: [
              'Participate in mock stock trading tournaments and business plan competitions.',
              'Take up introductory courses in financial modeling and corporate law.'
            ]
          };
        case 'ast-management':
          return {
            summary: `The candidate has completed the Management Career Fit Assessment. Their diagnostics show high potential for organizational leadership, delegation control, and strategic business planning.`,
            weaknesses: [
              'Refine delegation strategies to avoid micro-management tendencies.',
              'Improve structured feedback delivery methods under high-stress conditions.'
            ],
            growthAreas: [
              'Take up leadership roles in college clubs or startup projects.',
              'Study case studies on transformational leadership and corporate conflict resolution.'
            ]
          };
        case 'ast-ipmat':
          return {
            summary: `The candidate has completed the IPMAT Readiness Diagnostic. Their scores indicate their baseline preparation level for entrance examinations at IIM Indore, Rohtak, Ranchi, and other top-tier business schools.`,
            weaknesses: [
              'Review higher mathematics topics such as permutations, combinations, and probability.',
              'Increase verbal reading comprehension speed and accuracy under strict time limits.'
            ],
            growthAreas: [
              'Solve daily timed practice sets of quantitative aptitude questions.',
              'Read daily editorials from standard newspapers (e.g., The Hindu, Aeon) to improve verbal reading speed.'
            ]
          };
        case 'ast-cuet':
          return {
            summary: `The candidate has completed the CUET UG Readiness Diagnostic. Their scores map their baseline academic and general aptitude preparation level for central, state, and private universities accepting CUET scores.`,
            weaknesses: [
              'Refine speed in answering domain-specific advanced questions under tight timed constraints.',
              'Revise current affairs timeline logs and logical puzzle structures.'
            ],
            growthAreas: [
              'Solve dedicated stream mock question sets daily.',
              'Optimize academic self-discipline and time management blocks.'
            ]
          };
        default:
          return {
            summary: `The candidate has completed the ${title} diagnostics. Their profile demonstrates high potential and suitability for growth in their chosen professional domain.`,
            weaknesses: [
              'Focus on reviewing practical project coordination methodologies.',
              'Refine timed structural decision speeds under pressure.'
            ],
            growthAreas: [
              'Take collaborative leadership roles in team milestones.',
              'Practice presentation delivery drafts under micro-sessions.'
            ]
          };
      }
    };

    const specContent = getAssessmentSpecificContent(config.id, config.title);
    
    // Resolve dynamic strengths/weaknesses based on dimension ranking
    let weaknesses = specContent.weaknesses;
    let growthAreas = specContent.growthAreas;

    if (config.id === 'ast-ipmat') {
      const sortedDims = [
        { name: 'Quantitative Aptitude', score: scores.dimensions.quantitativeAptitude || 0 },
        { name: 'Higher Mathematics', score: scores.dimensions.higherMathematics || 0 },
        { name: 'Logical Reasoning', score: scores.dimensions.logicalReasoning || 0 },
        { name: 'Verbal Ability', score: scores.dimensions.verbalAbility || 0 }
      ].sort((a, b) => b.score - a.score);

      strengths = [
        `Strong performance in ${sortedDims[0].name} (Score: ${sortedDims[0].score}%)`,
        `Demonstrates competitive aptitude in ${sortedDims[1].name} (Score: ${sortedDims[1].score}%)`
      ];

      weaknesses = [
        `Needs improvement in ${sortedDims[3].name} (Score: ${sortedDims[3].score}%)`,
        `Optimize question pacing and deduction accuracy in ${sortedDims[2].name} (Score: ${sortedDims[2].score}%)`
      ];

      growthAreas = [
        `Focus on refining topics in ${sortedDims[3].name} via daily mock practices.`,
        `Practice solving higher-difficulty logic puzzles under strict timed constraints.`
      ];
    }

    if (config.id === 'ast-cuet') {
      const sortedDims = [
        { name: 'Language Proficiency', score: scores.dimensions.language || 0 },
        { name: 'General Aptitude', score: scores.dimensions.generalAptitude || 0 },
        { name: 'Domain Readiness', score: scores.dimensions.domainReadiness || 0 },
        { name: 'Academic Skills', score: scores.dimensions.academicReadiness || 0 }
      ].sort((a, b) => b.score - a.score);

      strengths = [
        `Highly competitive in ${sortedDims[0].name} (Score: ${sortedDims[0].score}%)`,
        `Solid foundations in ${sortedDims[1].name} (Score: ${sortedDims[1].score}%)`
      ];

      weaknesses = [
        `Improve capabilities in ${sortedDims[3].name} (Score: ${sortedDims[3].score}%)`,
        `Refine focus and timed practice in ${sortedDims[2].name} (Score: ${sortedDims[2].score}%)`
      ];

      growthAreas = [
        `Target concepts in ${sortedDims[3].name} via structured daily revisions.`,
        `Improve mock pacing and strategies for ${sortedDims[2].name} sections.`
      ];
    }

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
        details: [`Obtain credentials for Top Integrated BBA/MBA programs`, `Build interactive case studies`]
      }
    ];

    const getSuggestedColleges = () => {
      if (config.id === 'ast-ipmat') {
        if (scores.overallScore >= 75) {
          return ['IIM Indore', 'IIM Rohtak', 'IIM Ranchi', 'IIFT Kakinada', 'NALSAR Hyderabad'];
        } else if (scores.overallScore >= 40) {
          return ['NMIMS Mumbai', 'Christ University Bangalore', 'Symbiosis Pune', 'TAPMI Manipal', 'Alliance University'];
        } else {
          return ['Management Foundation Program', 'IPM Bridge Course', 'Quantitative Skill Improvement Plan'];
        }
      }
      if (config.id === 'ast-cuet') {
        if (scores.overallScore >= 75) {
          return ['Delhi University (DU)', 'Banaras Hindu University (BHU)', 'Jawaharlal Nehru University (JNU)', 'University of Hyderabad', 'Pondicherry University', 'Central Universities'];
        } else if (scores.overallScore >= 40) {
          return ['State Universities accepting CUET', 'Top Private Universities', 'Autonomous College Panels'];
        } else {
          return ['Subject Foundation Program', 'Bridge Learning Course', 'Subject Strengthening Plan'];
        }
      }
      return ['Tier 1 Universities', 'Symbiosis Pune', 'BITS Pilani'];
    };

    const getSuggestedCourses = () => {
      if (config.id === 'ast-cuet') {
        const stream = answers.selectedStream || 'science';
        if (stream === 'science') {
          return ['B.Sc. Physics (Honours)', 'B.Sc. Computer Science', 'B.Tech / B.Sc. Mathematics'];
        } else if (stream === 'commerce') {
          return ['B.Com. (Honours)', 'B.A. Economics (Honours)', 'BBA in Business Analytics'];
        } else {
          return ['B.A. Political Science (Honours)', 'B.A. History (Honours)', 'B.A. Psychology & Sociology'];
        }
      }
      return config.recommendedCourses || [];
    };

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
        criticalThinking: scores.dimensions.criticalThinking || scores.overallScore,
        ...scores.dimensions
      } as any,
      strengths,
      weaknesses,
      growthAreas,
      careerRecommendations,
      suggestedDegrees: getSuggestedCourses(),
      suggestedCertifications: [`${config.title} Certified Associate`],
      suggestedColleges: getSuggestedColleges(),
      skillGapAnalysis,
      learningRoadmap,
      
      // Enterprise database requirements
      assessmentId: config.id,
      assessmentName: config.title,
      candidateId: userId,
      candidateName: activeUser.name,
      summary: specContent.summary,
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
