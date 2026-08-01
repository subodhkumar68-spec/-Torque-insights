export const communicationQuestions = [
  // SECTION 1: VERBAL COMMUNICATION (8 Questions)
  {
    id: 'q-comm-verbal-1',
    type: 'single' as const,
    prompt: 'You are explaining a complex process to a team member, and they seem confused. What is the most effective verbal action to take first?',
    options: [
      { value: 'A', label: 'Speak louder and repeat the exact same sentences.' },
      { value: 'B', label: 'Ask: "Which part of this explanation is unclear so I can rephrase it?"' },
      { value: 'C', label: 'Proceed to finish the explanation and ask them to read the documentation later.' },
      { value: 'D', label: 'Tell them they should have listened more carefully from the beginning.' }
    ],
    correctAnswer: 'B',
    explanation: 'Asking targeted questions to locate the exact area of confusion shows high clarity, active listening response, and empathy.',
    difficulty: 'Easy',
    topic: 'Clarity & Listening Response',
    category: 'verbal',
    learningOutcome: 'Identify and resolve verbal communication breakdowns actively.'
  },
  {
    id: 'q-comm-verbal-2',
    type: 'single' as const,
    prompt: 'Choose the word that best completes the sentence: "The director\'s address was ___ ; she expressed her goals clearly in under five minutes."',
    options: [
      { value: 'A', label: 'verbose' },
      { value: 'B', label: 'succinct' },
      { value: 'C', label: 'ambiguous' },
      { value: 'D', label: 'garrulous' }
    ],
    correctAnswer: 'B',
    explanation: '"Succinct" means brief and clearly expressed. It is the opposite of verbose or garrulous.',
    difficulty: 'Easy',
    topic: 'Vocabulary',
    category: 'verbal',
    learningOutcome: 'Select precise vocabulary to describe communication attributes.'
  },
  {
    id: 'q-comm-verbal-3',
    type: 'single' as const,
    prompt: 'Which word choice sounds most professional when you need to reschedule a call due to an urgent conflict?',
    options: [
      { value: 'A', label: 'I can\'t make it today because something cool came up.' },
      { value: 'B', label: 'I am forced to cancel this call; please look for another slot.' },
      { value: 'C', label: 'Due to an unforeseen priority, I need to request rescheduling our discussion.' },
      { value: 'D', label: 'I have some other work, so I am dropping off the calendar.' }
    ],
    correctAnswer: 'C',
    explanation: 'Using standard corporate phrasing like "unforeseen priority" and requesting a schedule change maintains professionalism.',
    difficulty: 'Easy',
    topic: 'Word Choice & Sentence Construction',
    category: 'verbal',
    learningOutcome: 'Maintain professional verbal courtesy when handling calendar conflicts.'
  },
  {
    id: 'q-comm-verbal-4',
    type: 'single' as const,
    prompt: 'Pronunciation and accent neutralisation awareness in international client relations is primarily about:',
    options: [
      { value: 'A', label: 'Adopting a fake foreign accent to impress the client.' },
      { value: 'B', label: 'Speaking with moderate pacing, clear articulation, and standard syllable stress.' },
      { value: 'C', label: 'Speaking as fast as possible to demonstrate language fluency.' },
      { value: 'D', label: 'Using regional idioms that the client might not understand.' }
    ],
    correctAnswer: 'B',
    explanation: 'Effective verbal communication relies on clarity, articulation, and pacing so that diverse listeners can follow.',
    difficulty: 'Medium',
    topic: 'Pronunciation Awareness',
    category: 'verbal',
    learningOutcome: 'Understand the factors contributing to global verbal intelligibility.'
  },
  {
    id: 'q-comm-verbal-5',
    type: 'single' as const,
    prompt: 'To demonstrate confidence and fluency when delivering a project status verbal update, you should:',
    options: [
      { value: 'A', label: 'Fill pauses with "um", "ah", or "like" to keep speaking continuous.' },
      { value: 'B', label: 'Speak in a monotonous voice to look highly serious.' },
      { value: 'C', label: 'Use structured pauses to transition between key metrics.' },
      { value: 'D', label: 'Read directly from a script without looking up.' }
    ],
    correctAnswer: 'C',
    explanation: 'Deliberate pauses replace filler words, highlight transitions, and project verbal poise and control.',
    difficulty: 'Medium',
    topic: 'Fluency & Confidence',
    category: 'verbal',
    learningOutcome: 'Control speech delivery parameters to reflect executive presence.'
  },
  {
    id: 'q-comm-verbal-6',
    type: 'single' as const,
    prompt: 'Which of the following responses shows the highest quality of verbal active listening when a colleague describes a roadblock?',
    options: [
      { value: 'A', label: '"That sounds like a personal problem. You should figure it out."' },
      { value: 'B', label: '"So, if I understand correctly, the main delay is due to the API server latency? Let\'s see how we can optimize that."' },
      { value: 'C', label: '"I had a similar issue last week and I solved it in two minutes easily."' },
      { value: 'D', label: '"Don\'t worry about it, let\'s discuss the weekend plans instead."' }
    ],
    correctAnswer: 'B',
    explanation: 'Paraphrasing the speaker\'s roadblock demonstrates that you have listened, analyzed, and are ready to support.',
    difficulty: 'Medium',
    topic: 'Listening Response',
    category: 'verbal',
    learningOutcome: 'Apply verbal validation techniques to align on task challenges.'
  },
  {
    id: 'q-comm-verbal-7',
    type: 'single' as const,
    prompt: 'An senior client asks a question about a technical glitch. Which verbal approach is best if you do not know the answer immediately?',
    options: [
      { value: 'A', label: 'Make up a plausible answer on the spot to avoid looking incompetent.' },
      { value: 'B', label: 'Acknowledge the question and state: "I will confirm the details with our core engineering team and get back to you by 3 PM."' },
      { value: 'C', label: 'Say: "I have no idea about that. You should ask someone else on the team."' },
      { value: 'D', label: 'Ignore the question and quickly pivot to the next slide.' }
    ],
    correctAnswer: 'B',
    explanation: 'Professional verbal honesty, combined with a commitment to find the details and a specific timeline, preserves trust.',
    difficulty: 'Advanced',
    topic: 'Confidence & Word Choice',
    category: 'verbal',
    learningOutcome: 'Handle information gaps professionally under direct client scrutiny.'
  },
  {
    id: 'q-comm-verbal-8',
    type: 'single' as const,
    prompt: 'In conversation analysis, identifying a "communication barrier" like semantic noise refers to:',
    options: [
      { value: 'A', label: 'A loud drilling noise outside the office window.' },
      { value: 'B', label: 'A poor internet connection dropping call packets.' },
      { value: 'C', label: 'A misunderstanding due to complex jargon or ambiguous terminology.' },
      { value: 'D', label: 'Speaking in a low pitch that is difficult to hear.' }
    ],
    correctAnswer: 'C',
    explanation: 'Semantic noise occurs when different meanings are assigned to the same words, causing confusion due to jargon or vocabulary mismatch.',
    difficulty: 'Advanced',
    topic: 'Vocabulary & Sentence Construction',
    category: 'verbal',
    learningOutcome: 'Diagnose semantic roadblocks in professional dialogues.'
  },

  // SECTION 2: WRITTEN COMMUNICATION (8 Questions)
  {
    id: 'q-comm-written-1',
    type: 'single' as const,
    prompt: 'Identify the sentence with correct grammatical structure and subject-verb agreement.',
    options: [
      { value: 'A', label: 'The team of researchers have submitted their final report to the dean.' },
      { value: 'B', label: 'The team of researchers has submitted its final report to the dean.' },
      { value: 'C', label: 'The team of researchers have submitted its final report to the dean.' },
      { value: 'D', label: 'The team of researchers has submitted their final report to the dean.' }
    ],
    correctAnswer: 'B',
    explanation: 'The collective noun "team" is singular, so it requires the singular verb "has" and the singular possessive pronoun "its".',
    difficulty: 'Easy',
    topic: 'Grammar & Sentence Correction',
    category: 'written',
    learningOutcome: 'Verify grammatical agreement rules in academic and corporate documentation.'
  },
  {
    id: 'q-comm-written-2',
    type: 'single' as const,
    prompt: 'Which opening line is most appropriate for a formal business email requesting access to confidential server databases?',
    options: [
      { value: 'A', label: 'Hey, I need the database passwords ASAP. Thanks!' },
      { value: 'B', label: 'I am writing to formally request database credentials for the new compliance audit.' },
      { value: 'C', label: 'Can you give me the data links? I need them to do my job.' },
      { value: 'D', label: 'Hi there! Just wanted to ping you for the database keys.' }
    ],
    correctAnswer: 'B',
    explanation: 'A formal business email requires a clear, professional statement of purpose and context rather than casual slang.',
    difficulty: 'Easy',
    topic: 'Business Email Writing',
    category: 'written',
    learningOutcome: 'Apply appropriate salutations and openings in professional emails.'
  },
  {
    id: 'q-comm-written-3',
    type: 'single' as const,
    prompt: 'Choose the most professional option to replace: "We can\'t do this because you guys didn\'t give us the info on time."',
    options: [
      { value: 'A', label: 'This project is blocked because of your team\'s lazy updates.' },
      { value: 'B', label: 'We cannot proceed since you failed to provide the necessary details on schedule.' },
      { value: 'C', label: 'Due to the delay in receiving the requested specifications, we are adjusting our project timeline accordingly.' },
      { value: 'D', label: 'Since the info was late, we are stopping all operations.' }
    ],
    correctAnswer: 'C',
    explanation: 'Focusing on the objective facts (delay in receiving specifications) and the operational impact (adjusting timeline) avoids blame while maintaining clarity.',
    difficulty: 'Medium',
    topic: 'Professional Messaging & Sentence Correction',
    category: 'written',
    learningOutcome: 'Reframe negative or accusatory messages into neutral, constructive written updates.'
  },
  {
    id: 'q-comm-written-4',
    type: 'single' as const,
    prompt: 'Which word completes the sentence: "To write a robust executive summary, one must remain ___ , focusing on facts rather than personal feelings."',
    options: [
      { value: 'A', label: 'subjective' },
      { value: 'B', label: 'objective' },
      { value: 'C', label: 'dogmatic' },
      { value: 'D', label: 'speculative' }
    ],
    correctAnswer: 'B',
    explanation: 'Objective writing is based on facts and evidence, whereas subjective writing is influenced by personal feelings.',
    difficulty: 'Easy',
    topic: 'Business Vocabulary',
    category: 'written',
    learningOutcome: 'Differentiate between objective and subjective registers in reports.'
  },
  {
    id: 'q-comm-written-5',
    type: 'single' as const,
    prompt: 'When writing a formal report, which structural practice ensures maximum readability for stakeholders?',
    options: [
      { value: 'A', label: 'Using long paragraphs with complex compound sentences throughout.' },
      { value: 'B', label: 'Including bullet points, section headers, and bold key metrics to allow quick scanning.' },
      { value: 'C', label: 'Avoiding headers and page numbers to make the document look continuous.' },
      { value: 'D', label: 'Writing in a highly conversational blog-post style.' }
    ],
    correctAnswer: 'B',
    explanation: 'Corporate and academic readers prefer scannable layouts with headers, bullet lists, and visual emphasis for key metrics.',
    difficulty: 'Medium',
    topic: 'Report Writing & Documentation Skills',
    category: 'written',
    learningOutcome: 'Design user-friendly structures for complex business documentation.'
  },
  {
    id: 'q-comm-written-6',
    type: 'single' as const,
    prompt: 'What is a critical rule when drafting a brief team status update via platforms like Slack or MS Teams?',
    options: [
      { value: 'A', label: 'Send one word per message line to keep their alerts active.' },
      { value: 'B', label: 'Use a single, well-structured message containing context, status, and clear action items.' },
      { value: 'C', label: 'Always attach a 10-page document instead of typing in chat.' },
      { value: 'D', label: 'Use informal emoji symbols exclusively to save reading time.' }
    ],
    correctAnswer: 'B',
    explanation: 'Professional chat platforms benefit from unified, actionable messages that respect the recipient\'s notification stream.',
    difficulty: 'Medium',
    topic: 'Professional Messaging',
    category: 'written',
    learningOutcome: 'Structure asynchronous chat updates for efficiency.'
  },
  {
    id: 'q-comm-written-7',
    type: 'single' as const,
    prompt: 'Correct the following sentence: "Although she worked hard, but she could not complete the project on time."',
    options: [
      { value: 'A', label: 'Although she worked hard, she could not complete the project on time.' },
      { value: 'B', label: 'Although she worked hard, but she could not complete the project on time.' },
      { value: 'C', label: 'She worked hard, although she could not complete the project on time.' },
      { value: 'D', label: 'Although she worked hard, yet she could not complete the project on time.' }
    ],
    correctAnswer: 'A',
    explanation: '"Although" is a subordinating conjunction and should not be paired with a coordinating conjunction like "but" in the main clause.',
    difficulty: 'Advanced',
    topic: 'Sentence Correction & Formal Writing',
    category: 'written',
    learningOutcome: 'Eliminate redundant conjunctions in formal business texts.'
  },
  {
    id: 'q-comm-written-8',
    type: 'single' as const,
    prompt: 'When compiling standard documentation like a standard operating procedure (SOP), which voice is preferred?',
    options: [
      { value: 'A', label: 'First-person active voice: "I suggest you press the button."' },
      { value: 'B', label: 'Imperative active voice: "Press the start button to initialize the system."' },
      { value: 'C', label: 'Highly passive voice: "It is believed that the button should be pressed by the user."' },
      { value: 'D', label: 'Conversational second-person voice: "You might want to think about pressing the button."' }
    ],
    correctAnswer: 'B',
    explanation: 'SOPs and documentation require direct, clear, imperative active verbs to avoid ambiguity in instructions.',
    difficulty: 'Advanced',
    topic: 'Documentation Skills',
    category: 'written',
    learningOutcome: 'Apply instruction-writing guidelines for technical procedures.'
  },

  // SECTION 3: BUSINESS COMMUNICATION (8 Questions)
  {
    id: 'q-comm-business-1',
    type: 'single' as const,
    prompt: 'A client misunderstands an email and responds angrily. What should you do first?',
    options: [
      { value: 'A', label: 'Reply immediately explaining why their misunderstanding is silly.' },
      { value: 'B', label: 'Schedule a brief call or meet them to clarify the context and resolve the issue directly.' },
      { value: 'C', label: 'Forward their angry email to all senior executives to show their behavior.' },
      { value: 'D', label: 'Ignore the email and wait for them to calm down.' }
    ],
    correctAnswer: 'B',
    explanation: 'Calling or meeting allows real-time verbal tone adjustments and clarifying questions, which quickly defuses email misunderstandings.',
    difficulty: 'Medium',
    topic: 'Client Communication & Conflict Resolution',
    category: 'business',
    learningOutcome: 'De-escalate client friction by choosing the right communication channel.'
  },
  {
    id: 'q-comm-business-2',
    type: 'single' as const,
    prompt: 'When joining a remote corporate meeting, which of the following is considered essential meeting etiquette?',
    options: [
      { value: 'A', label: 'Leave your microphone unmuted at all times, even during background noise.' },
      { value: 'B', label: 'Join 5 minutes early, verify audio/video settings, and mute your microphone when not speaking.' },
      { value: 'C', label: 'Start speaking immediately over other speakers to show your presence.' },
      { value: 'D', label: 'Multitask loudly and ask team members to repeat everything they said.' }
    ],
    correctAnswer: 'B',
    explanation: 'Joining early, testing equipment, and muting when silent are core guidelines of remote meeting professionalism.',
    difficulty: 'Easy',
    topic: 'Meeting Etiquette',
    category: 'business',
    learningOutcome: 'Practice standard professional protocols during virtual meetings.'
  },
  {
    id: 'q-comm-business-3',
    type: 'single' as const,
    prompt: 'Which slide deck presentation technique is most effective to retain executive audience engagement?',
    options: [
      { value: 'A', label: 'Fill slides with tiny paragraphs and read them word-for-word.' },
      { value: 'B', label: 'Use minimal text, large key data figures, and tell a structured story verbally.' },
      { value: 'C', label: 'Include flashing animations on every slide transition.' },
      { value: 'D', label: 'Avoid slides completely and speak without any structure.' }
    ],
    correctAnswer: 'B',
    explanation: 'Executives look for high-level summaries, key data points, and verbal elaboration, not walls of text.',
    difficulty: 'Medium',
    topic: 'Presentation Skills',
    category: 'business',
    learningOutcome: 'Design and deliver executive-ready slide presentations.'
  },
  {
    id: 'q-comm-business-4',
    type: 'single' as const,
    prompt: 'What is the correct protocol when answering a phone call from an unknown client inquiry?',
    options: [
      { value: 'A', label: 'Say: "Who is this and what do you want?"' },
      { value: 'B', label: 'Say: "Hello, this is [Your Name] from [Company]. How may I assist you today?"' },
      { value: 'C', label: 'Wait silently until they speak first.' },
      { value: 'D', label: 'Say: "Call back later, I am busy right now."' }
    ],
    correctAnswer: 'B',
    explanation: 'Greeting the caller, identifying yourself and your organization, and offering assistance is standard telephone etiquette.',
    difficulty: 'Easy',
    topic: 'Telephone Etiquette',
    category: 'business',
    learningOutcome: 'Apply professional verbal greetings during client phone calls.'
  },
  {
    id: 'q-comm-business-5',
    type: 'single' as const,
    prompt: 'In a corporate behavior context, what is cross-functional communication?',
    options: [
      { value: 'A', label: 'Speaking only with people in your immediate team.' },
      { value: 'B', label: 'Exchanging information across different departments (e.g., Marketing, Engineering, HR) to align on project milestones.' },
      { value: 'C', label: 'Communicating with external vendors about pricing.' },
      { value: 'D', label: 'Arguing with colleagues during group sessions.' }
    ],
    correctAnswer: 'B',
    explanation: 'Cross-functional communication bridges departmental silos to coordinate unified corporate actions.',
    difficulty: 'Medium',
    topic: 'Cross-functional Communication',
    category: 'business',
    learningOutcome: 'Explain the role of cross-departmental alignment in enterprise tasks.'
  },
  {
    id: 'q-comm-business-6',
    type: 'single' as const,
    prompt: 'Which of the following describes effective networking behavior at a professional industry seminar?',
    options: [
      { value: 'A', label: 'Hand out your business card to everyone without having a conversation.' },
      { value: 'B', label: 'Ask relevant questions, listen to other attendees\' work, and establish common interests before swapping details.' },
      { value: 'C', label: 'Interrupt panel discussions to advertise your personal consulting services.' },
      { value: 'D', label: 'Sit in the corner and avoid talking to anybody.' }
    ],
    correctAnswer: 'B',
    explanation: 'Networking is about building genuine connections through active listening and mutual interests, not mass advertising.',
    difficulty: 'Medium',
    topic: 'Networking',
    category: 'business',
    learningOutcome: 'Practice relationship-first principles at professional networking events.'
  },
  {
    id: 'q-comm-business-7',
    type: 'single' as const,
    prompt: 'Choose the most professional email opening for a cold outreach message targeting a potential mentor.',
    options: [
      { value: 'A', label: 'Hey there! I saw your profile and wanted to see if you could help me get a job.' },
      { value: 'B', label: 'Dear [Name], I have been following your insights on supply chain optimization and would love to ask you two brief questions about your career journey.' },
      { value: 'C', label: 'Please look at my resume and tell me what is wrong with it.' },
      { value: 'D', label: 'Hi, I need a mentor, are you free?' }
    ],
    correctAnswer: 'B',
    explanation: 'Stating a specific point of admiration (supply chain insights) and requesting a highly bounded, polite interaction (two brief questions) is the most successful outreach model.',
    difficulty: 'Advanced',
    topic: 'Professional Email',
    category: 'business',
    learningOutcome: 'Formulate cold outreach drafts that respect recipient boundaries.'
  },
  {
    id: 'q-comm-business-8',
    type: 'single' as const,
    prompt: 'When aligning team members during a project crisis, "corporate behavior" guidelines suggest that a leader should:',
    options: [
      { value: 'A', label: 'Send an email allocating blame immediately to protect oneself.' },
      { value: 'B', label: 'Conduct a post-mortem audit to assign fault, then announce changes.' },
      { value: 'C', label: 'Acknowledge the crisis, establish a clear recovery plan, and invite input on immediate roadblocks.' },
      { value: 'D', label: 'Keep the crisis secret from team members to avoid panic.' }
    ],
    correctAnswer: 'C',
    explanation: 'Crisis leadership communication requires transparency, action-oriented planning, and collaboration rather than assigning blame.',
    difficulty: 'Advanced',
    topic: 'Corporate Behaviour',
    category: 'business',
    learningOutcome: 'Manage communication flows during operational team crises.'
  },

  // SECTION 4: INTERPERSONAL COMMUNICATION (6 Questions)
  {
    id: 'q-comm-interpersonal-1',
    type: 'single' as const,
    prompt: 'A colleague tells you they are struggling with their task load. Which response demonstrates highest empathy?',
    options: [
      { value: 'A', label: '"I completed my tasks on time. You should manage your schedule better."' },
      { value: 'B', label: '"That sounds tough. Let\'s review your list together and see if we can delegate or deprioritize some items to ease the load."' },
      { value: 'C', label: '"Go talk to the manager and file a complaint."' },
      { value: 'D', label: '"Everyone is busy here, just keep working."' }
    ],
    correctAnswer: 'B',
    explanation: 'Empathetic communication validates the person\'s feelings and offers practical, collaborative support.',
    difficulty: 'Easy',
    topic: 'Empathy & Relationship Building',
    category: 'interpersonal',
    learningOutcome: 'Deploy empathetic listening responses in team settings.'
  },
  {
    id: 'q-comm-interpersonal-2',
    type: 'single' as const,
    prompt: 'During a team meeting, two members argue about design directions. Which conflict resolution approach is most professional?',
    options: [
      { value: 'A', label: 'Tell both members to stop arguing and pick the option you like.' },
      { value: 'B', label: 'Acknowledge both perspectives, list the pros/cons of each, and guide the team toward a consensus based on project goals.' },
      { value: 'C', label: 'Let them argue indefinitely to see who wins.' },
      { value: 'D', label: 'Postpone the meeting indefinitely and avoid the design decision.' }
    ],
    correctAnswer: 'B',
    explanation: 'Conflict resolution involves validating both sides and using objective metrics (project goals) to find a logical consensus.',
    difficulty: 'Medium',
    topic: 'Conflict Resolution',
    category: 'interpersonal',
    learningOutcome: 'Mediate and resolve peer conflicts using objective criteria.'
  },
  {
    id: 'q-comm-interpersonal-3',
    type: 'single' as const,
    prompt: 'How does assertiveness differ from aggressiveness in interpersonal communication?',
    options: [
      { value: 'A', label: 'Assertiveness is about winning the argument, while aggressiveness is about shouting.' },
      { value: 'B', label: 'Assertiveness is stating your views clearly while respecting others; aggressiveness is imposing your views with hostility.' },
      { value: 'C', label: 'Aggressiveness is more effective in corporate leadership.' },
      { value: 'D', label: 'There is no difference between them.' }
    ],
    correctAnswer: 'B',
    explanation: 'Assertive communicators express their boundaries and opinions clearly and respectfully, without violating the rights or dignity of others.',
    difficulty: 'Medium',
    topic: 'Assertiveness',
    category: 'interpersonal',
    learningOutcome: 'Differentiate and apply assertive communication registers.'
  },
  {
    id: 'q-comm-interpersonal-4',
    type: 'single' as const,
    prompt: 'You disagree with your manager\'s decision regarding a timeline. How would you communicate professionally?',
    options: [
      { value: 'A', label: 'Tell them directly that their timeline is unrealistic and will fail.' },
      { value: 'B', label: 'State: "I want to share some potential bottlenecks based on our past project logs to ensure we can meet our targets safely."' },
      { value: 'C', label: 'Say nothing and intentionally miss the deadline to prove your point.' },
      { value: 'D', label: 'Complain to their manager about their timeline settings.' }
    ],
    correctAnswer: 'B',
    explanation: 'Framing a disagreement around objective metrics (past project logs) and positive outcomes (meeting targets safely) shows high professional assertiveness and emotional intelligence.',
    difficulty: 'Medium',
    topic: 'Assertiveness & Relationship Building',
    category: 'interpersonal',
    learningOutcome: 'Express dissent to senior leaders constructively.'
  },
  {
    id: 'q-comm-interpersonal-5',
    type: 'single' as const,
    prompt: 'Emotional Intelligence (EQ) in communication is best demonstrated by:',
    options: [
      { value: 'A', label: 'Suppressing all emotions and speaking like an AI model.' },
      { value: 'B', label: 'Recognizing your own emotional state, reading the room\'s emotional cues, and adjusting your communication tone accordingly.' },
      { value: 'C', label: 'Expressing anger immediately whenever you feel frustrated.' },
      { value: 'D', label: 'Agreeing with everyone to avoid any emotional friction.' }
    ],
    correctAnswer: 'B',
    explanation: 'EQ involves self-awareness, social awareness, and relationship management to deliver effective, context-aware messages.',
    difficulty: 'Advanced',
    topic: 'Emotional Intelligence',
    category: 'interpersonal',
    learningOutcome: 'Apply emotional intelligence frameworks to professional dialogues.'
  },
  {
    id: 'q-comm-interpersonal-6',
    type: 'single' as const,
    prompt: 'When listening to a direct report describe a critical error they made, a manager showing active listening should first:',
    options: [
      { value: 'A', label: 'Interrupt immediately and explain the penalty rules.' },
      { value: 'B', label: 'Let them explain the situation fully, summarize what went wrong to confirm understanding, and pivot to remediation.' },
      { value: 'C', label: 'Tell them to write a long explanation letter.' },
      { value: 'D', label: 'Minimize the issue: "It doesn\'t matter, we make mistakes all the time."' }
    ],
    correctAnswer: 'B',
    explanation: 'Active listening requires suspended judgment, comprehension verification (summarizing), and collaborative solution-focus.',
    difficulty: 'Advanced',
    topic: 'Listening & Conflict Resolution',
    category: 'interpersonal',
    learningOutcome: 'Manage mistake reporting conversations constructively.'
  },

  // SECTION 5: PRESENTATION & PUBLIC SPEAKING (5 Questions)
  {
    id: 'q-comm-presentation-1',
    type: 'single' as const,
    prompt: 'Which of the following presentation openings is most likely to attract and retain the audience\'s attention immediately?',
    options: [
      { value: 'A', label: '"Hi, my name is Jack. Today I am going to talk about quarterly finance logs which are quite boring but important."' },
      { value: 'B', label: '"Did you know that 73% of startups fail due to poor communication alignment? Today, we will explore three ways to solve this."' },
      { value: 'C', label: '"I am here today to read this slide deck which my manager sent me yesterday."' },
      { value: 'D', label: '"Let\'s start directly with slide 5, which shows our balance sheet spreadsheet."' }
    ],
    correctAnswer: 'B',
    explanation: 'Starting with a compelling statistic, a question, or a story engages the audience\'s interest immediately.',
    difficulty: 'Medium',
    topic: 'Presentation Structure & Audience Engagement',
    category: 'presentation',
    learningOutcome: 'Create compelling presentation hooks.'
  },
  {
    id: 'q-comm-presentation-2',
    type: 'single' as const,
    prompt: 'When standing on a physical stage to deliver a keynote speech, your body language should ideally project:',
    options: [
      { value: 'A', label: 'Hands crossed over chest, eyes looking at the ceiling.' },
      { value: 'B', label: 'An open posture, natural hand gestures, and steady eye contact with different sections of the audience.' },
      { value: 'C', label: 'Pacing rapidly from left to right without stopping.' },
      { value: 'D', label: 'Standing rigidly behind the podium without moving a muscle.' }
    ],
    correctAnswer: 'B',
    explanation: 'Open postures, controlled movement, and distributed eye contact project confidence and stage command.',
    difficulty: 'Easy',
    topic: 'Body Language',
    category: 'presentation',
    learningOutcome: 'Deploy positive non-verbal cues on stage.'
  },
  {
    id: 'q-comm-presentation-3',
    type: 'single' as const,
    prompt: 'Voice modulation during a public presentation involves varying your:',
    options: [
      { value: 'A', label: 'Volume, pitch, and speech pace to emphasize key points and maintain listener interest.' },
      { value: 'B', label: 'Language dialect dynamically to look sophisticated.' },
      { value: 'C', label: 'Accent constantly to keep the audience guessing.' },
      { value: 'D', label: 'Microphone distance to create echo effects.' }
    ],
    correctAnswer: 'A',
    explanation: 'Modulating pitch, volume, and pace prevents monotony and emphasizes critical concepts.',
    difficulty: 'Medium',
    topic: 'Voice Modulation',
    category: 'presentation',
    learningOutcome: 'Use voice modulation techniques to sustain listener attention.'
  },
  {
    id: 'q-comm-presentation-4',
    type: 'single' as const,
    prompt: 'If you experience stage anxiety before a large presentation, which strategy is most effective to build confidence?',
    options: [
      { value: 'A', label: 'Drink multiple cups of coffee right before going on stage.' },
      { value: 'B', label: 'Practice deep diaphragmatic breathing and visualize a successful delivery.' },
      { value: 'C', label: 'Memorize the entire speech word-for-word so you don\'t have to think.' },
      { value: 'D', label: 'Avoid looking at the audience entirely.' }
    ],
    correctAnswer: 'B',
    explanation: 'Deep breathing regulates the nervous system, and positive visualization helps counter stage fright.',
    difficulty: 'Medium',
    topic: 'Stage Confidence',
    category: 'presentation',
    learningOutcome: 'Apply cognitive and physiological techniques to manage stage anxiety.'
  },
  {
    id: 'q-comm-presentation-5',
    type: 'single' as const,
    prompt: 'A listener interrupts your presentation with a highly critical, off-topic question. The most professional response is:',
    options: [
      { value: 'A', label: 'Tell them they are wrong and ask them to leave the hall.' },
      { value: 'B', label: 'Acknowledge the point: "That is an interesting perspective. To stay on schedule, let\'s discuss this in detail during the Q&A session at the end."' },
      { value: 'C', label: 'Stop the presentation immediately and debate the point.' },
      { value: 'D', label: 'Ignore them completely and keep reading the slide.' }
    ],
    correctAnswer: 'B',
    explanation: 'De-escalating the interruption by acknowledging the speaker and parking the topic for the Q&A session maintains session control.',
    difficulty: 'Advanced',
    topic: 'Audience Engagement & Stage Confidence',
    category: 'presentation',
    learningOutcome: 'Handle hostile or off-topic audience interruptions professionally.'
  },

  // SECTION 6: INTERVIEW & GROUP DISCUSSION (5 Questions)
  {
    id: 'q-comm-interview-1',
    type: 'single' as const,
    prompt: 'A recruiter asks you: "Tell me about yourself." Which response strategy is most effective?',
    options: [
      { value: 'A', label: 'Recite your entire CV chronologically, including school grades.' },
      { value: 'B', label: 'Provide a structured summary: Your current role/profile, 1-2 key professional achievements, and why you are excited about this specific opportunity.' },
      { value: 'C', label: 'Describe your personal hobbies, family background, and childhood stories.' },
      { value: 'D', label: 'Say: "Everything is written in my CV. What do you want to know?"' }
    ],
    correctAnswer: 'B',
    explanation: 'A structured "Present-Past-Future" response highlights professional value and alignment with the target role immediately.',
    difficulty: 'Medium',
    topic: 'Interview Readiness & HR Communication',
    category: 'interview',
    learningOutcome: 'Deliver concise, value-oriented personal elevator pitches in interviews.'
  },
  {
    id: 'q-comm-interview-2',
    type: 'single' as const,
    prompt: 'During a group discussion (GD), two members continuously interrupt each other. What is your best response to showcase leadership communication?',
    options: [
      { value: 'A', label: 'Intervene: "Let\'s give both speakers a turn. Jack, please finish your point first, and then Sarah can share her views."' },
      { value: 'B', label: 'Shout louder than both of them to state your personal design idea.' },
      { value: 'C', label: 'Sit silently and wait for the coordinator to intervene.' },
      { value: 'D', label: 'Encourage one of them to debate aggressively.' }
    ],
    correctAnswer: 'A',
    explanation: 'Facilitating order and ensuring equal opportunities for team members to speak projects strong leadership, maturity, and moderation.',
    difficulty: 'Medium',
    topic: 'GD Participation & Leadership Communication',
    category: 'interview',
    learningOutcome: 'Facilitate inclusive team dialogues under high-tension group dynamics.'
  },
  {
    id: 'q-comm-interview-3',
    type: 'single' as const,
    prompt: 'When asked about a past failure during an interview, a candidate should:',
    options: [
      { value: 'A', label: 'State that they have never failed and possess a perfect track record.' },
      { value: 'B', label: 'Blame their former colleagues or manager for the failure.' },
      { value: 'C', label: 'Explain the situation briefly, detail the actions they took to resolve it, and describe the key learnings they gained from the experience.' },
      { value: 'D', label: 'Refuse to answer the question as it is negative.' }
    ],
    correctAnswer: 'C',
    explanation: 'The STAR method (Situation, Task, Action, Result) applied to a failure demonstrates self-reflection, problem-solving, and growth mindset.',
    difficulty: 'Medium',
    topic: 'Interview Readiness & Problem Solving Communication',
    category: 'interview',
    learningOutcome: 'Reframe negative experiences into constructive professional development proofs.'
  },
  {
    id: 'q-comm-interview-4',
    type: 'single' as const,
    prompt: 'In a group discussion, what is the best way to introduce a counter-perspective respectfully?',
    options: [
      { value: 'A', label: 'Say: "Your point is completely wrong. Here is the correct fact..."' },
      { value: 'B', label: 'Say: "I understand your point regarding cost reduction. However, if we consider implementation latency, we might need a different approach..."' },
      { value: 'C', label: 'Laugh or shake your head mockingly before speaking.' },
      { value: 'D', label: 'Interrupt immediately as soon as they start making their point.' }
    ],
    correctAnswer: 'B',
    explanation: 'Acknowledging the other perspective ("I understand your point...") before introducing counter-evidence ("However, if we consider...") maintains collaboration.',
    difficulty: 'Easy',
    topic: 'GD Participation & Problem Solving Communication',
    category: 'interview',
    learningOutcome: 'Apply respectful counter-argumentation techniques in meetings.'
  },
  {
    id: 'q-comm-interview-5',
    type: 'single' as const,
    prompt: 'During an interview, the recruiter asks a highly complex situational question about how you would handle an ethical dilemma. You should first:',
    options: [
      { value: 'A', label: 'Answer immediately with the first thought that comes to mind.' },
      { value: 'B', label: 'Ask for a moment to structure your thoughts: "That is a critical scenario. May I take a few seconds to structure my response?"' },
      { value: 'C', label: 'Say that ethical dilemmas do not occur in your field.' },
      { value: 'D', label: 'Ask the recruiter what they would do in your place.' }
    ],
    correctAnswer: 'B',
    explanation: 'Requesting brief thinking time shows structured reasoning, self-control, and avoids delivering disorganized answers.',
    difficulty: 'Advanced',
    topic: 'Leadership Communication & HR Communication',
    category: 'interview',
    learningOutcome: 'Employ structured thinking pause techniques during key corporate interviews.'
  }
];
