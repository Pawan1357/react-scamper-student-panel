export const ROUTES = {
  default: `/`,
  pageNotFound: `/404`,
  signIn: `/signIn`,
  signUp: `/signUp`,
  changePassword: `/change-password`,
  forgotPassword: `/forgot-password`,
  myAccount: `/myAccount`,
  dashboard: `/dashboard`,
  resetPassword: (token: string) => `/reset-password/${token}`,
  setupPassword: (token: string) => `/setup-password/${token}`,
  cleverCallback: `/auth/clever/callback`,
  classroom: {
    list: '/manage-classroom'
  },
  faq: {
    faqs: `/faqs`,
    viewFaq: (faqId: string) => `/faqs/view-faq/${faqId}`
  },
  contact: {
    list: `/contact-us`,
    add: `/contact-us/add`,
    viewContactUs: (contactUsId: string) => `/contact-us/view/${contactUsId}`
  },
  teacherLearning: {
    list: `/teacher-learning`,
    viewTeacherLearning: ({ teacherLearningId }: { teacherLearningId: string }) =>
      `/teacher-learning/view/${teacherLearningId}`,
    viewTLActivity: ({
      teacherLearningId,
      activityId
    }: {
      teacherLearningId: string;
      activityId: string;
    }) => `/teacher-learning/view/${teacherLearningId}/activity/${activityId}`
  },
  privacyPolicy: `/privacy-policy`,
  termsAndConditions: `/terms-and-conditions`,
  chapter: {
    list: `/chapters`,
    viewChapter: (chapterId: string) => `/chapters/view/${chapterId}`,
    viewLesson: (lessonId: string) => `/chapters/lesson/${lessonId}`,
    viewActivity: (activityId: string) => `/chapters/activity/${activityId}`
  }
};
