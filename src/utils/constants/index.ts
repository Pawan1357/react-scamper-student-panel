import { REGEX } from 'utils/regex';

// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const APP_SECRET = import.meta.env.VITE_REACT_APP_SECRET;
export const IMAGE_URL = import.meta.env.VITE_REACT_APP_IMAGE_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

// Clever OAuth Configuration
export const CLEVER_CONFIG = {
  clientId: import.meta.env.VITE_REACT_APP_CLEVER_CLIENT_ID || 'placeholder_clever_client_id',
  getRedirectUri: () => {
    const envRedirectUri = import.meta.env.VITE_REACT_APP_CLEVER_REDIRECT_URI;
    if (envRedirectUri) return envRedirectUri;
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/auth/clever/callback`;
    }
    return 'placeholder_redirect_uri';
  },
  redirectUri:
    typeof window !== 'undefined'
      ? import.meta.env.VITE_REACT_APP_CLEVER_REDIRECT_URI ||
        `${window.location.origin}/auth/clever/callback`
      : import.meta.env.VITE_REACT_APP_CLEVER_REDIRECT_URI || 'placeholder_redirect_uri',
  authBaseUrl:
    import.meta.env.VITE_REACT_APP_CLEVER_AUTH_BASE_URL || 'https://clever.com/oauth/authorize',
  responseType: 'code',
  scope: 'read:user_id read:sis',
  districtId: import.meta.env.VITE_REACT_APP_CLEVER_DISTRICT_ID || ''
};

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`
};

export const VALIDATION_MESSAGES = {
  EMAIL: {
    REQUIRED: `Please enter your email.`,
    INVALID: {
      MESSAGE: `Please enter valid email.`,
      REGEX: REGEX.EMAIL_STANDARD
    }
  },
  PASSWORD: {
    REQUIRED: 'Please enter your password.',
    INVALID: {
      REGEX: REGEX.PASSWORD_STRONG,
      MESSAGE: `Your new password does not meet the required criteria.`
    }
  },

  OLD_PASSWORD: {
    REQUIRED: `Please enter old password.`
  },

  NEW_PASSWORD: {
    REQUIRED: `Please enter new password.`,
    RE_ENTER: `Please re-enter new password.`,
    CONFIRM_PASSWORD: 'Please enter confirm password.',
    MISMATCH: `Should be exactly same as the new password you just entered above.`,
    DIFFERENT_FROM_CURRENT: `New password must be different from old password.`
  },

  FIRST_NAME: {
    REQUIRED: 'Please enter first name.'
  },

  LAST_NAME: {
    REQUIRED: 'Please enter last name.'
  },

  PHONE_NUMBER: {
    REQUIRED: 'Please enter phone number.',
    INVALID: {
      REGEX: REGEX.PHONE_NUMBER,
      MESSAGE: `Please enter a valid phone number.`
    }
  },
  SCHOOL_NAME: {
    REQUIRED: 'Please enter school name.'
  },
  SCHOOL_SUB_DOMAIN: {
    REQUIRED: "Please enter school's sub domain."
  },
  SCHOOL_ADDRESS: {
    REQUIRED: 'Please enter school address.'
  },
  SCHOOL_DISTRICT: {
    REQUIRED: 'Please enter school district.'
  },
  TEACHERS: {
    REQUIRED: 'Please enter number of teachers.',
    MIN: 'Number of teachers must be greater than 0.'
  },
  STUDENTS: {
    REQUIRED: 'Please enter number of students.',
    MIN: 'Number of students must be greater than 0.'
  },

  MAX_LENGTH: {
    FIRST_NAME: 'Length must be less than or equal to 50 characters.',
    LAST_NAME: 'Length must be less than or equal to 50 characters.'
  }
};

export const INPUTS = {
  LABEL: {
    EMAIL: 'Email',
    PASSWORD: 'Password',
    NEW_PASSWORD: 'New Password',
    RE_ENTER: 'Re-Enter New Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    OLD_PASSWORD: 'Old Password',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    PHONE: 'Phone',
    USER_ROLE: 'User Role',
    SCHOOL_NAME: 'School Name',
    SCHOOL_SUB_DOMAIN: "School's Sub Domain",
    SCHOOL_ADDRESS: 'School Address',
    SCHOOL_DISTRICT: 'School District',
    TEACHERS: 'Teachers',
    STUDENTS: 'Students',
    GOOGLE_CLASSROOM_EMAIL: 'Google Classroom Email'
  },
  PLACEHOLDER: {
    EMAIL: 'Enter your registered email',
    PASSWORD: 'Enter your password',
    NEW_PASSWORD: 'Enter your new password',
    RE_ENTER: 'Re-Enter your new password',
    OLD_PASSWORD: 'Enter your old password',
    CONFIRM_PASSWORD: 'Enter your confirm password ',
    FIRST_NAME: 'Enter your first name',
    LAST_NAME: 'Enter your last name',
    PHONE: 'Enter your phone number',
    SEARCH: 'Search',
    SCHOOL_NAME: 'Enter school name',
    SCHOOL_SUB_DOMAIN: "Enter school's sub domain",
    SCHOOL_ADDRESS: 'Enter school address',
    SCHOOL_DISTRICT: 'Enter school district',
    TEACHERS: 'Enter number of teachers',
    STUDENTS: 'Enter number of students',
    GOOGLE_CLASSROOM_EMAIL: 'Enter your Google Classroom email'
  }
};

//Query options for fetching api data
export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // till 5 min data will be validated,
  gcTime: 5 * 60 * 1000, // till 5 min data will be cached,
  refetchInterval: 5 * 60 * 1000,
  retry: false // after 5 minutes call api
};

export const countryCodeOptions = [
  { label: '+1', value: '+1' }, // US/CA
  { label: '+61', value: '+61' } // AU
];

// School Statistics Options
export const teacherCountOptions = Array.from({ length: 100 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1
}));

export const studentCountOptions = Array.from({ length: 100 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1
}));

export const TITLES = {
  COMMON: 'Scamper Education',
  DASHBOARD: 'Dashboard',
  PROFILE: 'My Profile',
  TEACHER_LEARNING: {
    LIST: 'Learning',
    VIEW_TEACHER_LEARNING_DETAILS: 'Learning',
    VIEW_TEACHER_LEARNING_LESSON: 'Teacher Learning Lesson'
  },
  EDIT_PROFILE: 'Edit Profile',
  CHANGE_PASSWORD: 'Change Password',
  AUTH: {
    LOGIN: 'Log In',
    FORGOT_PASSWORD: 'Forgot Password',
    RESET_PASSWORD: 'Reset Password',
    SETUP_PASSWORD: 'Setup Password'
  },
  CLASSROOM: {
    VIEW_CHAPTER: 'View Chapter Details',
    VIEW_PAST_CHAPTER: 'View Past Chapter Details',
    VIEW_LESSON: 'View Lesson',
    VIEW_PAST_LESSON: 'View Past Lesson',
    VIEW_ACTIVITY: 'View Skill Check',
    VIEW_PAST_ACTIVITY: 'View Past Activity'
  },
  CMS: {
    TnC: 'Terms and Conditions',
    PRIVACY_POLICY: 'Privacy Policy'
  }
};

export const MAX_TEXT_LENGTH = {
  FIRST_NAME: 50,
  LAST_NAME: 50
};
