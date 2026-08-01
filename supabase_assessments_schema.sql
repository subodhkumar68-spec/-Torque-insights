-- SUPABASE ASSESSMENT ENGINE SCHEMA MIGRATION
-- Target Database: PostgreSQL (Supabase)

-- 1. Assessment Sessions Table
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    guest_id TEXT REFERENCES public.guest_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    duration_ms INTEGER NOT NULL,
    answers JSONB DEFAULT '{}'::jsonb NOT NULL,
    submitted BOOLEAN DEFAULT false NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    report_id TEXT,
    CONSTRAINT check_user_or_guest CHECK (
        (user_id IS NOT NULL AND guest_id IS NULL) OR
        (user_id IS NULL AND guest_id IS NOT NULL)
    )
);

-- Enable RLS on assessment_sessions
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for assessment_sessions
CREATE POLICY "Allow individual users to select their own sessions" 
    ON public.assessment_sessions FOR SELECT 
    USING (auth.uid() = user_id OR guest_id IS NOT NULL);

CREATE POLICY "Allow individual users to insert their own sessions" 
    ON public.assessment_sessions FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR guest_id IS NOT NULL);

CREATE POLICY "Allow individual users to update their own sessions" 
    ON public.assessment_sessions FOR UPDATE 
    USING (auth.uid() = user_id OR guest_id IS NOT NULL)
    WITH CHECK (auth.uid() = user_id OR guest_id IS NOT NULL);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_guest_id ON public.assessment_sessions(guest_id);
CREATE INDEX IF NOT EXISTS idx_sessions_submitted ON public.assessment_sessions(submitted);


-- 2. CareerDNA Reports & Diagnostics Results Table
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    guest_id TEXT REFERENCES public.guest_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    scores JSONB NOT NULL, -- Holds RIASEC, MBTI, and all custom competency dimension scores
    strengths TEXT[] DEFAULT '{}'::text[] NOT NULL,
    weaknesses TEXT[] DEFAULT '{}'::text[] NOT NULL,
    growth_areas TEXT[] DEFAULT '{}'::text[] NOT NULL,
    career_recommendations JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array of objects: {career, matchPercentage, description}
    suggested_degrees TEXT[] DEFAULT '{}'::text[] NOT NULL,
    suggested_certifications TEXT[] DEFAULT '{}'::text[] NOT NULL,
    suggested_colleges TEXT[] DEFAULT '{}'::text[] NOT NULL,
    skill_gap_analysis JSONB DEFAULT '[]'::jsonb NOT NULL,
    learning_roadmap JSONB DEFAULT '[]'::jsonb NOT NULL,
    assessment_id TEXT NOT NULL,
    assessment_name TEXT NOT NULL,
    candidate_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT,
    school TEXT,
    class TEXT,
    city TEXT,
    answers JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT check_report_user_or_guest CHECK (
        (user_id IS NOT NULL AND guest_id IS NULL) OR
        (user_id IS NULL AND guest_id IS NOT NULL)
    )
);

-- Enable RLS on reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for reports
CREATE POLICY "Allow individual users to view their own reports" 
    ON public.reports FOR SELECT 
    USING (auth.uid() = user_id OR guest_id IS NOT NULL);

CREATE POLICY "Allow individual users to insert their own reports" 
    ON public.reports FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR guest_id IS NOT NULL);

CREATE POLICY "Allow authenticated admins to view all reports" 
    ON public.reports FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_guest_id ON public.reports(guest_id);
CREATE INDEX IF NOT EXISTS idx_reports_assessment_id ON public.reports(assessment_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at);
