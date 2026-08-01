-- Torque Insights complete database schema setup
-- Target Database: PostgreSQL (Supabase)

-- ==========================================
-- 1. Create PUBLIC Profiles Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'student',
    plan TEXT DEFAULT 'Free',
    subscription TEXT DEFAULT 'Free Trial',
    credits TEXT DEFAULT '5',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security (RLS) on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Profiles
CREATE POLICY "Allow public read access to profiles" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Allow individual user update access to their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id) 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow individual user insert access to their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);


-- ==========================================
-- 2. Create updated_at column helper trigger
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_handle_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();


-- ==========================================
-- 3. Create automatic signup trigger helper
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, role, plan, subscription, credits, status)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', 'Anonymous User'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
        'Free',
        'Free Trial',
        '5',
        'Active'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trigger_new_user_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user_signup();


-- ==========================================
-- 4. Create guest_profiles Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.guest_profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    education TEXT,
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on guest_profiles
ALTER TABLE public.guest_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for guest_profiles
CREATE POLICY "Allow anyone to insert guest profiles" 
    ON public.guest_profiles FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated admins to read guest profiles" 
    ON public.guest_profiles FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_guest_profiles_email ON public.guest_profiles(email);


-- ==========================================
-- 5. Create Assessment Sessions Table
-- ==========================================
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


-- ==========================================
-- 6. Create CareerDNA Diagnostics Reports Table
-- ==========================================
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    guest_id TEXT REFERENCES public.guest_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    sub_category TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    scores JSONB NOT NULL,
    strengths TEXT[] DEFAULT '{}'::text[] NOT NULL,
    weaknesses TEXT[] DEFAULT '{}'::text[] NOT NULL,
    growth_areas TEXT[] DEFAULT '{}'::text[] NOT NULL,
    career_recommendations JSONB DEFAULT '[]'::jsonb NOT NULL,
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
