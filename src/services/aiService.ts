import { dbService, CareerDNAReport } from './dbService';

export const aiService = {
  // Analyzes assessment session answers and generates a CareerDNAReport
  generateReport: (
    userId: string,
    category: 'Class XI-XII' | 'BBA' | 'MBA',
    subCategory: string,
    answers: Record<string, any>
  ): CareerDNAReport => {
    // 1. Process RIASEC Interest scores (0 to 100 scale)
    // Default fallback scores
    let R = Math.floor(Math.random() * 30) + 50;
    let I = Math.floor(Math.random() * 30) + 50;
    let A = Math.floor(Math.random() * 30) + 50;
    let S = Math.floor(Math.random() * 30) + 50;
    let E = Math.floor(Math.random() * 30) + 50;
    let C = Math.floor(Math.random() * 30) + 50;

    // Apply exact weights based on answers if available
    // Likert inputs: q-xi-1 to q-xi-6 are 1-5 scales
    const getVal = (qid: string) => {
      const v = answers[qid];
      return v ? (Number(v) - 1) * 25 : 50; // Scale 1-5 to 0-100
    };

    if (answers['q-xi-1']) R = getVal('q-xi-1');
    if (answers['q-xi-2']) I = getVal('q-xi-2');
    if (answers['q-xi-3']) A = getVal('q-xi-3');
    if (answers['q-xi-4']) S = getVal('q-xi-4');
    if (answers['q-xi-5']) E = getVal('q-xi-5');
    if (answers['q-xi-6']) C = getVal('q-xi-6');

    // 2. Process MBTI Personality Code
    let m1 = answers['q-xi-7'] || (Math.random() > 0.5 ? 'E' : 'I');
    let m2 = answers['q-xi-8'] || (Math.random() > 0.5 ? 'S' : 'N');
    let m3 = answers['q-xi-9'] || (Math.random() > 0.5 ? 'T' : 'F');
    let m4 = answers['q-xi-10'] || (Math.random() > 0.5 ? 'J' : 'P');
    const mbtiCode = `${m1}${m2}${m3}${m4}`;

    // 3. Competency scores based on role and questions
    let leadershipScore = Math.floor(Math.random() * 20) + 70; // default 70-90
    let communicationScore = Math.floor(Math.random() * 20) + 72;
    let problemSolving = Math.floor(Math.random() * 20) + 75;
    let emotionalIntelligence = Math.floor(Math.random() * 20) + 74;
    let decisionMaking = Math.floor(Math.random() * 20) + 68;
    let criticalThinking = Math.floor(Math.random() * 20) + 73;

    if (category === 'BBA') {
      if (answers['q-bba-2'] === 'L1') leadershipScore = 92;
      else if (answers['q-bba-2'] === 'L2') leadershipScore = 80;
      else if (answers['q-bba-2'] === 'L3') leadershipScore = 58;

      if (answers['q-bba-3']) criticalThinking = (Number(answers['q-bba-3']) - 1) * 25;
    }

    if (category === 'MBA') {
      if (answers['q-mba-1'] === 'S2') decisionMaking = 94;
      else if (answers['q-mba-1'] === 'S1') decisionMaking = 76;
      else if (answers['q-mba-1'] === 'S3') decisionMaking = 82;

      if (answers['q-mba-2'] === 'D2') criticalThinking = 91;
      else if (answers['q-mba-2'] === 'D3') communicationScore = 88;
      
      if (answers['q-mba-3'] === 'E1') emotionalIntelligence = 95;
      else if (answers['q-mba-3'] === 'E2') emotionalIntelligence = 68;
      else if (answers['q-mba-3'] === 'E3') emotionalIntelligence = 78;
    }

    // 4. Generate customized contents based on top interests
    const riasecArray = [
      { name: 'Realistic', val: R, desc: 'Prefers hands-on, practical activities, working with tools, machinery, or outdoors.' },
      { name: 'Investigative', val: I, desc: 'Analytical, scientific, intellectual, enjoys solving complex puzzles and researching.' },
      { name: 'Artistic', val: A, desc: 'Creative, expressive, original, prefers unstructured environments and design.' },
      { name: 'Social', val: S, desc: 'Empathetic, helpful, friendly, loves teaching, counseling, and servicing communities.' },
      { name: 'Enterprising', val: E, desc: 'Ambitious, persuasive, energetic, thrives on leadership, sales, and business projects.' },
      { name: 'Conventional', val: C, desc: 'Detail-oriented, organized, structured, excels in data administration and auditing.' },
    ];
    
    // Sort to find dominant interest
    riasecArray.sort((a, b) => b.val - a.val);
    const primaryInterest = riasecArray[0].name;
    const secondaryInterest = riasecArray[1].name;

    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let growthAreas: string[] = [];
    let careerRecommendations: Array<{ career: string; matchPercentage: number; description: string }> = [];
    let suggestedDegrees: string[] = [];
    let suggestedCertifications: string[] = [];
    let suggestedColleges: string[] = [];
    let skillGapAnalysis: Array<{ skill: string; current: number; required: number }> = [];
    let learningRoadmap: Array<{ phase: string; title: string; duration: string; details: string[] }> = [];

    // Customize outputs based on primary interest and target category
    if (primaryInterest === 'Investigative') {
      strengths = ['Analytical Problem Solving', 'Scientific Reasoning', 'Deep Research Capabilities', 'Logical Integrity'];
      weaknesses = ['Over-analyzing details', 'Struggling with ambiguous team settings', 'Reluctance to delegate'];
      growthAreas = ['Public presentation skills', 'Pragmatic decision speed under tight deadlines', 'Interpersonal flexibility'];
      
      if (category === 'Class XI-XII') {
        careerRecommendations = [
          { career: 'AI / Machine Learning Engineer', matchPercentage: 96, description: 'Design complex algorithms and neural networks to power predictive intelligence.' },
          { career: 'Bioinformatics Research Scientist', matchPercentage: 88, description: 'Apply computation and data analytics to decode genomic structures and medical records.' },
          { career: 'Cybersecurity Analyst', matchPercentage: 85, description: 'Analyze software code and network logs to prevent digital security intrusions.' }
        ];
        suggestedDegrees = ['B.Tech Computer Science', 'B.Sc Data Science & AI', 'Integrated M.Tech Software Engineering'];
        suggestedColleges = ['IIT Delhi', 'BITS Pilani', 'IISc Bangalore', 'IIIT Hyderabad'];
        suggestedCertifications = ['Google Advanced Data Analytics', 'AWS Certified Machine Learning', 'Python Coding Associate'];
        skillGapAnalysis = [
          { skill: 'Algorithm Design', current: 75, required: 90 },
          { skill: 'Statistics & Math', current: 80, required: 95 },
          { skill: 'Systems Architecture', current: 50, required: 85 }
        ];
        learningRoadmap = [
          { phase: 'Phase 1', title: 'Foundational Coding & Math', duration: '6 Months', details: ['Master Python programming structures', 'Complete advanced statistics and linear algebra', 'Build 3 basic open-source code libraries'] },
          { phase: 'Phase 2', title: 'Core Machine Learning Core', duration: '9 Months', details: ['Study supervised and unsupervised learning models', 'Implement PyTorch and TensorFlow basics', 'Participate in Kaggle student challenges'] },
          { phase: 'Phase 3', title: 'Applied Capstone & Internships', duration: '6 Months', details: ['Build a real-world predictive AI model', 'Pursue a research internship at an AI lab', 'Author a project documentation report'] }
        ];
      } else {
        // BBA / MBA Investigative
        careerRecommendations = [
          { career: 'Management & Strategy Consultant', matchPercentage: 94, description: 'Deconstruct complex organizational challenges and deliver data-backed strategic solutions.' },
          { career: 'Financial Risk Analyst', matchPercentage: 89, description: 'Use statistical models to predict market trends and manage asset exposures.' },
          { career: 'Operations Optimizer', matchPercentage: 86, description: 'Audit supply chain logistics using data tools to eliminate workflow waste.' }
        ];
        suggestedDegrees = ['MBA Business Analytics', 'PGDM Strategy Consulting', 'Master of Finance'];
        suggestedColleges = ['IIM Ahmedabad', 'ISB Hyderabad', 'IIM Bangalore', 'FMS Delhi'];
        suggestedCertifications = ['Chartered Financial Analyst (CFA)', 'Certified Management Consultant (CMC)', 'SQL for Analytics Specialization'];
        skillGapAnalysis = [
          { skill: 'Financial Modeling', current: 60, required: 90 },
          { skill: 'Strategic Frameworks', current: 70, required: 95 },
          { skill: 'Stakeholder Negotiation', current: 65, required: 88 }
        ];
        learningRoadmap = [
          { phase: 'Phase 1', title: 'Quantitative Financial Core', duration: '6 Months', details: ['Master advanced valuation and cash flow modeling', 'Study macroeconomic variables', 'Earn CFA Level 1 or equivalent certificate'] },
          { phase: 'Phase 2', title: 'Case Analysis & Pitching', duration: '6 Months', details: ['Deconstruct 50+ Harvard case studies', 'Build dynamic consulting slide decks', 'Practice structural mock interviews'] }
        ];
      }
    } else if (primaryInterest === 'Enterprising') {
      strengths = ['High Persuasion & Influence', 'Visionary Leadership Style', 'Risk Calculation & Tolerance', 'Strategic Goal Orientation'];
      weaknesses = ['Impatience with routine administrative details', 'Tendency to override consensus', 'Workplace burnout'];
      growthAreas = ['Active listening and validation of peer ideas', 'Patience with compliance requirements', 'Structured data tracking'];

      if (category === 'Class XI-XII') {
        careerRecommendations = [
          { career: 'Product Manager', matchPercentage: 95, description: 'Bridge business vision, customer experience design, and engineering output.' },
          { career: 'Tech Entrepreneur', matchPercentage: 92, description: 'Launch and scale software or physical product startups in active market segments.' },
          { career: 'Corporate Brand Strategist', matchPercentage: 87, description: 'Design viral campaigns and manage modern media relations for consumer brands.' }
        ];
        suggestedDegrees = ['BBA Business Analytics', 'B.Sc Product Management', 'B.A. Communication & Media'];
        suggestedColleges = ['Shaheed Sukhdev College of Business Studies', 'NMIMS Mumbai', 'Ashoka University', 'Christ University'];
        suggestedCertifications = ['Product Management First Steps', 'Professional Scrum Master (PSM I)', 'Meta Certified Digital Marketing Associate'];
        skillGapAnalysis = [
          { skill: 'Agile Methodologies', current: 45, required: 85 },
          { skill: 'Product Roadmap Design', current: 50, required: 90 },
          { skill: 'Market Validation', current: 68, required: 88 }
        ];
        learningRoadmap = [
          { phase: 'Phase 1', title: 'Product & User Research', duration: '6 Months', details: ['Learn user journey mapping techniques', 'Conduct 15 customer validation interviews', 'Read core product manuals (Inspired, Hooked)'] },
          { phase: 'Phase 2', title: 'Agile & Technical Operations', duration: '6 Months', details: ['Learn Scrum frameworks and Jira task boards', 'Coordinate with a student developer to build a mock app MVP', 'Launch landing page for conversions testing'] }
        ];
      } else {
        // BBA / MBA Enterprising
        careerRecommendations = [
          { career: 'Venture Capital Associate', matchPercentage: 93, description: 'Screen fast-growing startups, audit business models, and negotiate funding terms.' },
          { career: 'Chief of Staff / Executive VP', matchPercentage: 90, description: 'Drive core strategic operations, align executive departments, and scale operations.' },
          { career: 'Investment Banker', matchPercentage: 88, description: 'Facilitate mergers & acquisitions, corporate restructuring, and major IPO capital issues.' }
        ];
        suggestedDegrees = ['MBA Finance & Entrepreneurship', 'PGDM Executive Leadership', 'M.Sc Investment Banking'];
        suggestedColleges = ['IIM Ahmedabad', 'IIM Calcutta', 'ISB Hyderabad', 'XLRI Jamshedpur'];
        suggestedCertifications = ['Project Management Professional (PMP)', 'Chartered Financial Analyst (CFA)', 'M&A Negotiation Masterclass'];
        skillGapAnalysis = [
          { skill: 'Corporate Valuation', current: 70, required: 95 },
          { skill: 'Venture Capital Term Sheets', current: 55, required: 90 },
          { skill: 'Board Presentation', current: 75, required: 95 }
        ];
        learningRoadmap = [
          { phase: 'Phase 1', title: 'LBO & Merger Modeling', duration: '6 Months', details: ['Build Excel sheets for leveraged buyout structures', 'Master corporate governance regulations', 'Participate in inter-school pitch competitions'] },
          { phase: 'Phase 2', title: 'M&A Simulations & Negotiation', duration: '6 Months', details: ['Engage in live mock negotiation tournaments', 'Draft term sheets and pitch decks for actual VC seed deals', 'Establish corporate networks'] }
        ];
      }
    } else {
      // General fallbacks (Mix of Social, Artistic, Conventional, Realistic)
      strengths = ['High Empathy & Collaboration', 'Structured Project Execution', 'Outstanding Verbal Expression', 'Detail Rigor'];
      weaknesses = ['Avoiding confrontation in team conflicts', 'Reluctance to take rapid financial risks', 'Perfectionism stalling progress'];
      growthAreas = ['Direct constructive feedback delivery', 'Basic programming and data visualization', 'Assertive management presence'];

      careerRecommendations = [
        { career: 'Product Designer (UI/UX)', matchPercentage: 91, description: 'Design beautiful, highly accessible digital layouts and user research models.' },
        { career: 'Corporate HR Business Partner', matchPercentage: 88, description: 'Lead organizational talent planning, design team engagement models, and direct hiring.' },
        { career: 'Public Policy Consultant', matchPercentage: 84, description: 'Research socio-economic trends and draft regulatory guides for government groups.' }
      ];
      suggestedDegrees = ['B.Des Interactive Design', 'MBA Human Resource Management', 'M.A. Public Policy & Economics'];
      suggestedColleges = ['NID Ahmedabad', 'XLRI Jamshedpur', 'Tata Institute of Social Sciences', 'TISS Mumbai'];
      suggestedCertifications = ['Google UX Design Professional Certificate', 'SHRM-CP HR Certification', 'Data Visualization in Tableau'];
      skillGapAnalysis = [
        { skill: 'UX Wireframing & Prototyping', current: 60, required: 90 },
        { skill: 'User Research Metrics', current: 65, required: 85 },
        { skill: 'Visual Branding Design', current: 50, required: 85 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'UX Design Essentials', duration: '6 Months', details: ['Master Figma, wireframing, and interactive design tools', 'Create 2 digital portfolio case studies', 'Complete foundational design courses'] },
        { phase: 'Phase 2', title: 'Advanced User Prototyping', duration: '6 Months', details: ['Conduct remote usability tests for web pages', 'Build complete interactive design libraries', 'Collaborate with developers to verify CSS compliance'] }
      ];
    }

    // 5. Build and save the Report object
    const newReport: CareerDNAReport = {
      id: `rep-${userId.substring(4)}-${Date.now()}`,
      userId,
      category,
      subCategory,
      submittedAt: Date.now(),
      scores: {
        riasec: { R, I, A, S, E, C },
        mbti: mbtiCode,
        leadershipScore,
        communicationScore,
        problemSolving,
        emotionalIntelligence,
        decisionMaking,
        criticalThinking
      },
      strengths,
      weaknesses,
      growthAreas,
      careerRecommendations,
      suggestedDegrees,
      suggestedCertifications,
      suggestedColleges,
      skillGapAnalysis,
      learningRoadmap
    };

    // Save report in db
    const reports = dbService.getReports();
    reports.push(newReport);
    dbService.saveReports(reports);

    // Update assessment session mapping
    const sessions = dbService.getSessions();
    const activeSession = sessions.find(s => s.userId === userId && s.category === category && !s.submitted);
    if (activeSession) {
      activeSession.submitted = true;
      activeSession.completedAt = Date.now();
      activeSession.reportId = newReport.id;
      dbService.saveSessions(sessions);
    }

    return newReport;
  }
};
