import { UseMutationOptions } from '@tanstack/react-query';

import { IApiError, IApiSuccess, ICommonPagination } from 'utils/Types';
import { defaultQueryOptions } from 'utils/constants';

import apiInstance from 'services/interceptor';
import { useApiMutation, useApiQuery } from 'services/masterHook';

import * as Types from './types';

const ApiEndPoints = {
  getChaptersList: `chapter/findAll`,
  getLessonsList: `lesson/findAll`,
  getActivitiesList: (lessonId: number) => `activity/findAll?lesson_id=${lessonId}`,
  getStudentChapterList: `student-chapter/list`,

  getChapterById: () => `/student-chapter/view`,
  getLessonById: (lessonId: string) => `student-chapter/lesson/view/${lessonId}`,
  getActivityById: (activityId: string) =>
    `/student-chapter/activity/${activityId}/submitted-answers`,
  submitMcqAnswer: (activityId: string) =>
    `/student-chapter/activity/${activityId}/submit-answer/mcq`,
  submitMatchPairAnswer: (activityId: string) =>
    `/student-chapter/activity/${activityId}/submit-answer/match-pair`,
  submitDragDropAnswer: (activityId: string) =>
    `/student-chapter/activity/${activityId}/submit-answer/drag-drop`,
  spinWheel: `/student-points/spin-wheel`
};

export const chapterQueryKey = {
  all: ['chapter'] as const,
  getChaptersList: (args: ICommonPagination) => [...chapterQueryKey.all, `getChaptersList`, args],
  getLessonsList: (chapterId: string) => [...chapterQueryKey.all, `getLessonsList`, chapterId],
  getActivitiesList: (lessonId: number) => [...chapterQueryKey.all, `getActivitiesList`, lessonId],
  getStudentChapterList: (args: ICommonPagination, tab?: string) => [
    ...chapterQueryKey.all,
    `getStudentChapterList`,
    args,
    tab
  ],

  getChapterById: (chapterId: string) => [...chapterQueryKey.all, `getChapterById`, chapterId],
  getLessonById: (lessonId: string) => [...chapterQueryKey.all, `getLessonById`, lessonId],
  getActivityById: (id: string) => [...chapterQueryKey.all, `getActivityById`, id],
  submitMcqAnswer: (activityId: string) => [...chapterQueryKey.all, `submitMcqAnswer`, activityId],
  submitMatchPairAnswer: (activityId: string) => [
    ...chapterQueryKey.all,
    `submitMatchPairAnswer`,
    activityId
  ],
  submitDragDropAnswer: (activityId: string) => [
    ...chapterQueryKey.all,
    `submitDragDropAnswer`,
    activityId
  ],
  spinWheel: () => [...chapterQueryKey.all, `spinWheel`]
};

// API
export const chapterApi = {
  async getChaptersList(data: ICommonPagination): Promise<Types.IGetChaptersListRes> {
    return apiInstance
      .post(ApiEndPoints.getChaptersList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getLessonsList(data: { chapter_id: number | null }): Promise<Types.IGetLessonsListRes[]> {
    return apiInstance
      .post(ApiEndPoints.getLessonsList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // get activities list type remaining to change
  async getActivitiesList(lessonId: number): Promise<Types.IListActivitiesRes[]> {
    return apiInstance
      .get(ApiEndPoints.getActivitiesList(lessonId))
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  // Get by ID
  async getChapterById(chapterId: string): Promise<IApiSuccess<Types.IGetChapterByIdRes>> {
    return apiInstance
      .post(ApiEndPoints.getChapterById(), { chapter_id: Number(chapterId) })
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getLessonById(lessonId: string): Promise<IApiSuccess<Types.IGetLessonByIdRes>> {
    return apiInstance
      .get(ApiEndPoints.getLessonById(lessonId))
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getActivityById(id: string): Promise<IApiSuccess<Types.IGetActivityByIdRes>> {
    return apiInstance
      .get(ApiEndPoints.getActivityById(id))
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getStudentChapterList(data: ICommonPagination): Promise<Types.IStudentChapterListRes> {
    return apiInstance
      .post(ApiEndPoints.getStudentChapterList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async submitMcqAnswer(
    activityId: string,
    data: { question_id: number; selected_option_id: number }
  ): Promise<IApiSuccess<Types.SubmitMcqAnswerRes>> {
    return apiInstance
      .post(ApiEndPoints.submitMcqAnswer(activityId), data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async submitMatchPairAnswer(
    activityId: string,
    data: { question_id: number; pairs: Array<{ left_option_id: number; right_option_id: number }> }
  ): Promise<IApiSuccess<Types.SubmitMatchPairAnswerRes>> {
    return apiInstance
      .post(ApiEndPoints.submitMatchPairAnswer(activityId), data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async submitDragDropAnswer(
    activityId: string,
    data: { question_id: number; answers: Array<{ drag_drop_option_id: number; position: string }> }
  ): Promise<IApiSuccess<Types.SubmitDragDropAnswerRes>> {
    return apiInstance
      .post(ApiEndPoints.submitDragDropAnswer(activityId), data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async spinWheel(data: {
    lesson_id: number;
    student_id: number;
    spin_config_id: number;
  }): Promise<IApiSuccess<Types.SpinWheelRes>> {
    return apiInstance
      .post(ApiEndPoints.spinWheel, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

// hooks
export const chapterHooks = {
  ChapterList: (args: ICommonPagination) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getChaptersList(args),
      queryFn: () => chapterApi.getChaptersList(args),
      queryOptions: { ...defaultQueryOptions }
    });
  },

  LessonList: (chapterId: string) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getLessonsList(chapterId),
      queryFn: () =>
        chapterApi.getLessonsList({ chapter_id: chapterId ? Number(chapterId) : null }),
      queryOptions: { ...defaultQueryOptions }
    });
  },

  ActivityList: (lessonId: number) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getActivitiesList(lessonId),
      queryFn: () => chapterApi.getActivitiesList(Number(lessonId)),
      queryOptions: { ...defaultQueryOptions }
    });
  },

  useGetChapterById: (chapterId: string) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getChapterById(chapterId),
      queryFn: () => chapterApi.getChapterById(chapterId),
      queryOptions: { ...defaultQueryOptions, enabled: Boolean(chapterId) }
    });
  },

  useGetLessonById: (lessonId: string) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getLessonById(lessonId),
      queryFn: () => chapterApi.getLessonById(lessonId),
      queryOptions: { ...defaultQueryOptions, enabled: Boolean(lessonId) }
    });
  },

  useGetActivityById: (id: string) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getActivityById(id),
      queryFn: () => chapterApi.getActivityById(id),
      queryOptions: { ...defaultQueryOptions, enabled: Boolean(id) }
    });
  },

  StudentChapterList: (args: ICommonPagination, tab?: string) => {
    return useApiQuery({
      queryKey: chapterQueryKey.getStudentChapterList(args, tab),
      queryFn: () => chapterApi.getStudentChapterList(args),
      queryOptions: { ...defaultQueryOptions }
    });
  },

  useSubmitMcqAnswer: (
    activityId: string,
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.SubmitMcqAnswerRes>,
      IApiError,
      { question_id: number; selected_option_id: number }
    >
  ) => {
    return useApiMutation({
      mutationKey: chapterQueryKey.submitMcqAnswer(activityId),
      mutationFn: (data: { question_id: number; selected_option_id: number }) =>
        chapterApi.submitMcqAnswer(activityId, data),
      mutationOptions
    });
  },

  useSubmitMatchPairAnswer: (
    activityId: string,
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.SubmitMatchPairAnswerRes>,
      IApiError,
      { question_id: number; pairs: Array<{ left_option_id: number; right_option_id: number }> }
    >
  ) => {
    return useApiMutation({
      mutationKey: chapterQueryKey.submitMatchPairAnswer(activityId),
      mutationFn: (data: {
        question_id: number;
        pairs: Array<{ left_option_id: number; right_option_id: number }>;
      }) => chapterApi.submitMatchPairAnswer(activityId, data),
      mutationOptions
    });
  },

  useSubmitDragDropAnswer: (
    activityId: string,
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.SubmitDragDropAnswerRes>,
      IApiError,
      { question_id: number; answers: Array<{ drag_drop_option_id: number; position: string }> }
    >
  ) => {
    return useApiMutation({
      mutationKey: chapterQueryKey.submitDragDropAnswer(activityId),
      mutationFn: (data: {
        question_id: number;
        answers: Array<{ drag_drop_option_id: number; position: string }>;
      }) => chapterApi.submitDragDropAnswer(activityId, data),
      mutationOptions
    });
  },

  useSpinWheel: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.SpinWheelRes>,
      IApiError,
      { lesson_id: number; student_id: number; spin_config_id: number }
    >
  ) => {
    return useApiMutation({
      mutationKey: chapterQueryKey.spinWheel(),
      mutationFn: (data: { lesson_id: number; student_id: number; spin_config_id: number }) =>
        chapterApi.spinWheel(data),
      mutationOptions
    });
  }
};
