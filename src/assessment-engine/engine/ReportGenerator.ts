import { AssessmentConfig } from './AssessmentRegistry';
import { AssessmentScoring } from './AssessmentScoring';
import { CareerDNAReport, dbService } from '../../services/dbService';
import { supabase } from '../../lib/supabase';

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
        case 'future-communication':
          return {
            summary: `The candidate has completed the Communication Skills Diagnostic. Their scores map their baseline verbal, written, business, interpersonal, presentation, and interview communication competencies, highlighting their readiness for professional placement and corporate leadership tracks.`,
            weaknesses: [
              'Refine assertive public speaking delivery under direct audience gaze.',
              'Revise business proposal syntax patterns to maintain brevity.'
            ],
            growthAreas: [
              'Participate in mock team presentation and executive workshops.',
              'Solve daily business email writing and client conversation simulation exercises.'
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

    // Format all dimension keys into reader-friendly labels
    const sortedDims = Object.keys(scores.dimensions).map(key => {
      const readableName = key
        .replace(/Score|Index|Intelligence/g, '')
        .replace(/([A-Z])/g, ' $1') // insert space before capital letters
        .replace(/^./, str => str.toUpperCase()) // capitalize first letter
        .trim();
      return {
        key,
        name: readableName,
        score: scores.dimensions[key] || 0
      };
    }).sort((a, b) => b.score - a.score);

    if (sortedDims.length >= 2) {
      const highest1 = sortedDims[sortedDims.length - 1];
      const highest2 = sortedDims[sortedDims.length - 2];
      const lowest1 = sortedDims[0];
      const lowest2 = sortedDims[1];

      strengths = [
        `Exhibits advanced competency in ${highest1.name} (Score: ${highest1.score}%), demonstrating strong capability.`,
        `Solid execution profiles in ${highest2.name} (Score: ${highest2.score}%), supporting strategic growth.`
      ];

      weaknesses = [
        `Pacing or precision gaps observed in ${lowest1.name} (Score: ${lowest1.score}%), requiring dedicated study.`,
        `Needs focused optimization in ${lowest2.name} (Score: ${lowest2.score}%) to elevate baseline benchmarks.`
      ];

      growthAreas = [
        `Engage in targeted exercises for ${lowest1.name} to reinforce core structures.`,
        `Allocate weekly study cycles to optimize performance in ${lowest2.name} modules.`
      ];
    }

    const getDynamicCareers = () => {
      const topDimKey = sortedDims[sortedDims.length - 1]?.key || '';
      const secondDimKey = sortedDims[sortedDims.length - 2]?.key || '';
      
      const key1 = topDimKey.toLowerCase();
      const key2 = secondDimKey.toLowerCase();
      
      const resolveCareers = (k: string) => {
        if (k.includes('analytic') || k.includes('math') || k.includes('logic') || k.includes('physics') || k.includes('scientific') || k.includes('techno') || k.includes('innovat')) {
          return ['Data Analytics Architect', 'AI/ML Research Scientist', 'Quantitative Analyst'];
        }
        if (k.includes('business') || k.includes('financial') || k.includes('finance') || k.includes('quant') || k.includes('strategy') || k.includes('market')) {
          return ['Investment Banker', 'Product Strategy Lead', 'Venture Capital Associate'];
        }
        if (k.includes('biology') || k.includes('patience') || k.includes('empathy') || k.includes('observation')) {
          return ['Clinical Surgeon', 'Biomedical Researcher', 'Healthcare Consultant'];
        }
        if (k.includes('leader') || k.includes('adapt') || k.includes('emotional') || k.includes('teamwork')) {
          return ['Management Specialist', 'Startup Founder', 'Human Resource Director'];
        }
        if (k.includes('grammar') || k.includes('voc') || k.includes('writing') || k.includes('speaking') || k.includes('communication') || k.includes('verbal')) {
          return ['Corporate Communications Director', 'Brand PR Strategist', 'Public Policy Analyst'];
        }
        return ['Consulting Principal', 'Operations Lead', 'Client Relationship Manager'];
      };

      const primaryList = resolveCareers(key1);
      const secondaryList = resolveCareers(key2);

      const uniqueCareers = Array.from(new Set([...primaryList, ...secondaryList])).slice(0, 3);
      return uniqueCareers.map((c, i) => ({
        career: c,
        matchPercentage: scores.overallScore - i * 4,
        description: `Targeting growth trajectories in professional ${c.toLowerCase()} ecosystems based on your competency profile.`
      }));
    };

    const careerRecommendations = getDynamicCareers();

    const skillGapAnalysis = Object.keys(scores.dimensions).map((dim, idx) => ({
      skill: dim.replace(/Score|Index|Intelligence/g, '').replace(/([A-Z])/g, ' $1').trim(),
      current: scores.dimensions[dim] || 75,
      required: 90
    })) || [];

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

      const topDimKey = sortedDims[sortedDims.length - 1]?.key || '';
      const key = topDimKey.toLowerCase();
      
      if (key.includes('analytic') || key.includes('math') || key.includes('logic') || key.includes('physics') || key.includes('scientific') || key.includes('techno') || key.includes('innovat')) {
        return ['B.Tech Computer Science & AI', 'B.Sc. Mathematics & Computing', 'M.Sc. Data Science'];
      }
      if (key.includes('business') || key.includes('financial') || key.includes('finance') || key.includes('quant') || key.includes('strategy') || key.includes('market')) {
        return ['B.Com (Honours) / BBA Finance', 'Chartered Financial Analyst (CFA) Prep', 'MBA in Strategic Management'];
      }
      if (key.includes('biology') || key.includes('patience') || key.includes('empathy') || key.includes('observation')) {
        return ['MBBS / Pre-Med Specialization', 'B.Sc. Biomedical Sciences', 'M.Sc. Clinical Psychology'];
      }
      if (key.includes('leader') || key.includes('adapt') || key.includes('emotional') || key.includes('teamwork')) {
        return ['MBA Leadership & Change Management', 'Executive Leadership Certification', 'BBA in Human Resource Strategy'];
      }
      return config.recommendedCourses || ['Bachelor of Business Administration', 'Bachelor of Arts (Honours)', 'Executive Development Diploma'];
    };

    const learningRoadmap = [
      {
        phase: 'Phase 1 (1-2 Months)',
        title: `Bridge Gaps in ${sortedDims[0]?.name || 'Core Skills'}`,
        duration: '8 Weeks',
        details: [
          `Enroll in introductory programs and focused learning pathways targeting ${sortedDims[0]?.name || 'the lowest scoring dimension'}.`,
          `Implement a systematic review of basic structures and trace daily practice logs.`
        ]
      },
      {
        phase: 'Phase 2 (3-6 Months)',
        title: `Leverage Strengths in ${sortedDims[sortedDims.length - 1]?.name || 'Advanced Modules'}`,
        duration: '16 Weeks',
        details: [
          `Apply advanced methodologies in ${sortedDims[sortedDims.length - 1]?.name || 'highest scoring dimension'} to mock client case studies.`,
          `Attempt premium certifications like ${getSuggestedCourses()[0]} to validate capability.`
        ]
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

      const topDimKey = sortedDims[sortedDims.length - 1]?.key || '';
      const key = topDimKey.toLowerCase();
      
      if (key.includes('analytic') || key.includes('math') || key.includes('logic') || key.includes('physics') || key.includes('scientific') || key.includes('techno') || key.includes('innovat')) {
        if (scores.overallScore >= 75) {
          return ['MIT', 'Stanford University', 'IIT Delhi', 'BITS Pilani'];
        } else if (scores.overallScore >= 40) {
          return ['Delhi Technological University', 'VIT Vellore', 'Manipal Institute of Technology'];
        } else {
          return ['STEM Foundation Bridge Program', 'Engineering Basic Coding Bootcamp'];
        }
      }
      
      if (key.includes('business') || key.includes('financial') || key.includes('finance') || key.includes('quant') || key.includes('strategy') || key.includes('market')) {
        if (scores.overallScore >= 75) {
          return ['Wharton School', 'London School of Economics', 'IIM Ahmedabad', 'SRCC Delhi'];
        } else if (scores.overallScore >= 40) {
          return ['NMIMS Mumbai', 'Symbiosis Pune', 'Christ University Bangalore'];
        } else {
          return ['Finance for Non-Finance Managers', 'Basic Accounting & Economics Course'];
        }
      }

      if (key.includes('biology') || key.includes('patience') || key.includes('empathy') || key.includes('observation')) {
        if (scores.overallScore >= 75) {
          return ['Johns Hopkins University', 'AIIMS New Delhi', 'Oxford Medical School', 'Harvard Medical School'];
        } else if (scores.overallScore >= 40) {
          return ['KMC Manipal', 'JIPMER Pondicherry', 'D.Y. Patil Medical College'];
        } else {
          return ['Pre-Med Preparation Course', 'Empathy & Communication in Patient Care'];
        }
      }

      if (key.includes('leader') || key.includes('adapt') || key.includes('emotional') || key.includes('teamwork')) {
        if (scores.overallScore >= 75) {
          return ['Harvard Business School', 'INSEAD France', 'ISB Hyderabad', 'IIM Bangalore'];
        } else if (scores.overallScore >= 40) {
          return ['SPJIMR Mumbai', 'MDI Gurgaon', 'IMT Ghaziabad'];
        } else {
          return ['Executive Leadership Development Program', 'Conflict Management Certification'];
        }
      }

      if (scores.overallScore >= 75) {
        return ['Oxford University', 'Cambridge University', 'Delhi University', 'Central Universities'];
      }
      return ['State Universities accepting scores', 'Top Private Universities', 'Local Study Circles'];
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

    const isUuid = (str: string) => {
      const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return regex.test(str);
    };

    const syncReportToSupabase = async () => {
      try {
        const payload = {
          id: newReport.id,
          user_id: isUuid(newReport.userId) ? newReport.userId : null,
          guest_id: !isUuid(newReport.userId) ? newReport.userId : null,
          category: newReport.category,
          sub_category: newReport.subCategory,
          submitted_at: new Date(newReport.submittedAt).toISOString(),
          scores: newReport.scores,
          strengths: newReport.strengths,
          weaknesses: newReport.weaknesses,
          growth_areas: newReport.growthAreas,
          career_recommendations: newReport.careerRecommendations,
          suggested_degrees: newReport.suggestedDegrees,
          suggested_certifications: newReport.suggestedCertifications,
          suggested_colleges: newReport.suggestedColleges,
          skill_gap_analysis: newReport.skillGapAnalysis,
          learning_roadmap: newReport.learningRoadmap,
          assessment_id: newReport.assessmentId,
          assessment_name: newReport.assessmentName,
          candidate_name: newReport.candidateName,
          email: newReport.email,
          mobile: newReport.mobile,
          school: newReport.school,
          class: newReport.class,
          city: newReport.city,
          answers: newReport.answers,
          created_at: new Date(newReport.createdAt || Date.now()).toISOString()
        };
        const { error } = await supabase
          .from('reports')
          .insert([payload]);
        if (error) console.warn('Supabase reports insert error:', error);
      } catch (err) {
        console.warn('Supabase reports synchronization skipped:', err);
      }
    };
    syncReportToSupabase();

    // Update assessment session mapping
    const sessions = dbService.getSessions();
    const activeSession = sessions.find(s => s.userId === userId && !s.submitted);
    if (activeSession) {
      activeSession.submitted = true;
      activeSession.completedAt = Date.now();
      activeSession.reportId = newReport.id;
      dbService.saveSessions(sessions);

      const syncCompletedSessionToSupabase = async (session: any) => {
        try {
          const payload = {
            id: session.id,
            user_id: isUuid(session.userId) ? session.userId : null,
            guest_id: !isUuid(session.userId) ? session.userId : null,
            category: session.category,
            sub_category: session.subCategory,
            start_time: new Date(session.startTime).toISOString(),
            duration_ms: session.durationMs,
            answers: session.answers,
            submitted: true,
            completed_at: new Date().toISOString(),
            report_id: newReport.id
          };
          const { error } = await supabase
            .from('assessment_sessions')
            .upsert([payload]);
          if (error) console.warn('Supabase sessions complete update error:', error);
        } catch (err) {
          console.warn('Supabase sessions complete synchronization skipped:', err);
        }
      };
      syncCompletedSessionToSupabase(activeSession);
    }

    return newReport;
  }
};
