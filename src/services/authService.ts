import { dbService, User } from './dbService';

const SESSION_KEY = 'careerdna_current_user';

export const authService = {
  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  login: (email: string, role?: string): { success: boolean; user?: User; error?: string } => {
    const users = dbService.getUsers();
    
    // Find user by email. If role is provided, ensure it matches
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && (!role || u.role === role));
    
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    
    return { success: false, error: 'User not found. Please sign up or check your credentials.' };
  },

  signUp: (name: string, email: string, role: User['role'], schoolName?: string, collegeName?: string, companyName?: string): { success: boolean; user?: User; error?: string } => {
    const users = dbService.getUsers();
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered. Please log in.' };
    }

    const newUser: User = {
      id: `usr-${role}-${Date.now()}`,
      name,
      email,
      role,
      schoolName,
      collegeName,
      companyName,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
    };

    // If it's a student, assign the default counselor (Dr. Sunita Mehta)
    if (role === 'student') {
      newUser.assignedCounselorId = 'usr-counselor-1';
    }

    // If it's a parent, try to find their student child or create one
    if (role === 'parent') {
      newUser.childId = 'usr-student-1'; // Link to default student Rohan Sharma for demo
    }

    const updatedUsers = [...users, newUser];
    dbService.saveUsers(updatedUsers);
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  logout: (): void => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateProfile: (user: User): User => {
    const users = dbService.getUsers();
    const updatedUsers = users.map(u => u.id === user.id ? user : u);
    dbService.saveUsers(updatedUsers);
    
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.id === user.id) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
    return user;
  }
};
