export interface ProfileSection {
  id: string;
  title: string;
  isEnabled: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface UserProfile {
  name: string;
  headline: string;
  about: string;
  avatarUrl?: string;
  experience: Experience[];
  education: any[];
  volunteering: any[];
  skills: string[];
  sectionsVisibility: {
    experience: boolean;
    education: boolean;
    volunteering: boolean;
    projects: boolean;
  };
}