import { dbService, CareerDNAReport } from './dbService';

export const aiService = {
  // Analyzes assessment session answers and generates a CareerDNAReport
  generateReport: (
    userId: string,
    category: string,
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

    // Switch on subCategory (Assessment Name)
    if (subCategory.includes('Personality') || subCategory.includes('16-Personality')) {
      strengths = ['Introspective Thinking', 'Principled Communication', 'Strategic Focus', 'Empathetic Collaboration'];
      weaknesses = ['Preference for Solo Tasks', 'Occasional Analysis Paralysis', 'Reluctance to Direct Teams'];
      growthAreas = ['Assertive Delegation', 'Active Group Brainstorming', 'Short-term Goal Execution'];
      careerRecommendations = [
        { career: 'Software Product Manager', matchPercentage: 94, description: 'Bridge business strategy and development teams with absolute clarity.' },
        { career: 'Strategic Management Consultant', matchPercentage: 88, description: 'Solve structural corporate bottlenecks and present board decks.' },
        { career: 'Clinical Psychologist', matchPercentage: 85, description: 'Consult candidates and guide behavioral changes with empathy.' }
      ];
      suggestedDegrees = ['BA / B.Sc Psychology', 'BBA in Human Resource Management', 'MBA in Leadership & Strategy'];
      suggestedColleges = ['Delhi University', 'TISS Mumbai', 'Symbiosis Pune'];
      suggestedCertifications = ['MBTI Certified Practitioner', 'NLP Communication Professional'];
      skillGapAnalysis = [
        { skill: 'Team Delegation', current: 60, required: 90 },
        { skill: 'Empathetic Feedback', current: 75, required: 95 },
        { skill: 'Presentation Articulation', current: 70, required: 85 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Communication Essentials', duration: '3 Months', details: ['Study group communication frameworks', 'Practice emotional intelligence techniques'] },
        { phase: 'Phase 2', title: 'Leadership Lab', duration: '6 Months', details: ['Organize 2 collaborative projects', 'Complete public presentation exercises'] }
      ];
    } else if (subCategory.includes('Learning') || subCategory.includes('Cognitive Learning') || subCategory.includes('Learning Style')) {
      strengths = ['Visual Memory Retention', 'Diagrammatic Processing', 'Structured Reading Comprehension'];
      weaknesses = ['Distractibility in Lecture Halls', 'Slower Auditory Recall'];
      growthAreas = ['Active Listening Practice', 'Hands-on Kinesthetic Exercises'];
      careerRecommendations = [
        { career: 'Technical Instructional Designer', matchPercentage: 95, description: 'Design modern study assets and outline lesson plans.' },
        { career: 'Visual Data Analyst', matchPercentage: 90, description: 'Format transaction logs and databases into intuitive dashboards.' },
        { career: 'Creative Content Strategist', matchPercentage: 86, description: 'Draft visual marketing assets and design branding campaigns.' }
      ];
      suggestedDegrees = ['B.Des Visual Communication', 'B.Ed Educational Technology', 'B.Sc Cognitive Science'];
      suggestedColleges = ['NID Ahmedabad', 'IIT Bombay Design Centre', 'JNU New Delhi'];
      suggestedCertifications = ['VARK Learning Specialist', 'Instructional Design Certification'];
      skillGapAnalysis = [
        { skill: 'Auditory Recall', current: 55, required: 80 },
        { skill: 'Kinesthetic Application', current: 65, required: 85 },
        { skill: 'Visual Mind Mapping', current: 80, required: 90 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Mind Mapping & Visualization', duration: '2 Months', details: ['Convert lecture notes into color-coded charts', 'Use flashcard software for spaced repetition'] },
        { phase: 'Phase 2', title: 'Active Recalling & Timed Quizzes', duration: '3 Months', details: ['Take timed self-assessments', 'Engage in group teaching to verify concept clarity'] }
      ];
    } else if (subCategory.includes('Engineering') || subCategory.includes('STEM')) {
      strengths = ['Mathematical Modeling', 'Spatial Rotation Capacity', 'Physics Concept Application', 'Logical Acumen'];
      weaknesses = ['Impatience with Theoretical Writing', 'Underestimating Project Management Costs'];
      growthAreas = ['Technical Communication', 'Software Architecture Concepts'];
      careerRecommendations = [
        { career: 'Robotics & Automation Engineer', matchPercentage: 96, description: 'Build physical automations and code microcontroller behaviors.' },
        { career: 'Computer Systems Architect', matchPercentage: 92, description: 'Design network pipelines, cloud infrastructures, and databases.' },
        { career: 'Aerospace Structural Designer', matchPercentage: 88, description: 'Draft CAD schematics for aircraft fuselages and testing modules.' }
      ];
      suggestedDegrees = ['B.Tech Mechanical Engineering', 'B.Tech Computer Science', 'M.Tech Robotics'];
      suggestedColleges = ['IIT Madras', 'BITS Pilani', 'IIT Kanpur', 'COEP Pune'];
      suggestedCertifications = ['SOLIDWORKS Certified Associate', 'Python Programming Specialist'];
      skillGapAnalysis = [
        { skill: 'Coding Fundamentals', current: 50, required: 85 },
        { skill: 'Spatial Mechanics', current: 75, required: 90 },
        { skill: 'Quantitative Reasoning', current: 80, required: 95 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Mathematical Foundations', duration: '4 Months', details: ['Complete advanced calculus and physics modules', 'Code 5 basic numerical algorithms'] },
        { phase: 'Phase 2', title: 'Applied Engineering', duration: '6 Months', details: ['Build a spatial mechanical CAD model', 'Practice BITSAT/JEE mock test series'] }
      ];
    } else if (subCategory.includes('Medical')) {
      strengths = ['Organic Science Aptitude', 'Sustained Clinical Focus', 'High Empathy Quotient', 'Observational Precision'];
      weaknesses = ['High Emotional Stress Absorption', 'Slow Decision Making in Crisis'];
      growthAreas = ['Emergency Stress Resilience', 'Systemic Hospital Protocols'];
      careerRecommendations = [
        { career: 'Specialized Cardiologist', matchPercentage: 95, description: 'Diagnose structural heart defects and run clinical surgeries.' },
        { career: 'Clinical Research Pathologist', matchPercentage: 90, description: 'Audit biopsy logs and organic tissue samples in research labs.' },
        { career: 'Pediatric Neurologist', matchPercentage: 87, description: 'Treat young candidate neurological frameworks and sensory profiles.' }
      ];
      suggestedDegrees = ['MBBS / Medical Graduate', 'B.Sc Biotechnology', 'M.Sc Clinical Research'];
      suggestedColleges = ['AIIMS New Delhi', 'CMC Vellore', 'KGMU Lucknow', 'JIPMER Puducherry'];
      suggestedCertifications = ['First Aid & CPR Certification', 'Bioethics & Clinical Practice'];
      skillGapAnalysis = [
        { skill: 'Anatomy Knowledge', current: 60, required: 90 },
        { skill: 'Clinical Empathy', current: 85, required: 95 },
        { skill: 'Emergency Protocols', current: 50, required: 85 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Clinical Foundations', duration: '6 Months', details: ['Study human anatomy and physiology guides', 'Complete introductory organic chemistry courses'] },
        { phase: 'Phase 2', title: 'NEP Biology & NEET Mock Training', duration: '6 Months', details: ['Practice biology test modules', 'Attend a medical camp or first-aid workshop'] }
      ];
    } else if (subCategory.includes('Commerce')) {
      strengths = ['Financial Auditing Acumen', 'Microeconomics Comprehension', 'Data Tracking Rigor', 'Business Calculations'];
      weaknesses = ['Reluctance to Take High Financial Risks', 'Prefers Rote Accounting Rules Over Ambiguous Deals'];
      growthAreas = ['Strategic Risk Management', 'Financial Forecasting Models'];
      careerRecommendations = [
        { career: 'Corporate Investment Banker', matchPercentage: 93, description: 'Audit company valuations and arrange capital distributions.' },
        { career: 'Chartered Accountant', matchPercentage: 90, description: 'Manage corporate audits, tax filings, and transaction records.' },
        { career: 'Equity Research Strategy Lead', matchPercentage: 86, description: 'Model financial assets and evaluate stock portfolios.' }
      ];
      suggestedDegrees = ['Bachelor of Commerce (B.Com Hons)', 'Chartered Accountancy (CA)', 'BBA in Finance'];
      suggestedColleges = ['SRCC Delhi', 'LSR New Delhi', 'St. Xavier\'s Kolkata', 'NMIMS Mumbai'];
      suggestedCertifications = ['NSE Financial Markets Certification', 'Advanced MS Excel for Finance'];
      skillGapAnalysis = [
        { skill: 'Corporate Finance', current: 60, required: 90 },
        { skill: 'Balance Sheet Auditing', current: 75, required: 95 },
        { skill: 'Market Economics', current: 70, required: 85 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Accounting Foundations', duration: '4 Months', details: ['Master double-entry bookkeeping rules', 'Complete financial statements analysis courses'] },
        { phase: 'Phase 2', title: 'Commerce Aptitude Diagnostics', duration: '6 Months', details: ['Study corporate law basics', 'Take commerce aptitude test series'] }
      ];
    } else if (subCategory.includes('Management') || subCategory.includes('Leadership')) {
      strengths = ['Transformational Leadership', 'Team Synergy Building', 'Strategic Acumen', 'Persuasive Pitching'];
      weaknesses = ['Impatience with Granular Data Entry', 'Delegating Without Clear Performance Audits'];
      growthAreas = ['Quantitative Operations Analysis', 'Empathy-Driven Performance Review'];
      careerRecommendations = [
        { career: 'Brand Product Manager', matchPercentage: 94, description: 'Lead cross-functional teams to build, launch, and scale consumer products.' },
        { career: 'Corporate Strategy Consultant', matchPercentage: 91, description: 'Deconstruct complex market issues and deliver consulting presentations.' },
        { career: 'Entrepreneur / Business Founder', matchPercentage: 85, description: 'Coordinate seed funding rounds and pitch service architectures.' }
      ];
      suggestedDegrees = ['MBA in Strategy / Marketing', 'BBA in Entrepreneurship', 'PGDM in General Management'];
      suggestedColleges = ['IIM Bangalore', 'IIM Ahmedabad', 'ISB Hyderabad', 'XLRI Jamshedpur'];
      suggestedCertifications = ['Certified Scrum Master (CSM)', 'Google Project Management Professional'];
      skillGapAnalysis = [
        { skill: 'Strategic Pitching', current: 70, required: 95 },
        { skill: 'Financial Budgeting', current: 60, required: 85 },
        { skill: 'Agile Team Operations', current: 75, required: 90 }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Business Fundamentals', duration: '3 Months', details: ['Study marketing principles and business models', 'Read 20+ strategy case studies'] },
        { phase: 'Phase 2', title: 'Executive Leadership', duration: '6 Months', details: ['Lead an agile student group project', 'Practice mock corporate presentations'] }
      ];
    } else {
      strengths = ['Analytical Problem Solving', 'Scientific Reasoning', 'Deep Research Capabilities', 'Logical Integrity'];
      weaknesses = ['Over-analyzing details', 'Struggling with ambiguous team settings', 'Reluctance to delegate'];
      growthAreas = ['Public presentation skills', 'Pragmatic decision speed under tight deadlines', 'Interpersonal flexibility'];
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
