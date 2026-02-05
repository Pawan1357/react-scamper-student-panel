import { useCallback, useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { showToaster } from 'utils/functions';

import { chapterHooks } from 'services/chapter';

export const useViewPastActivity = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const { activityId } = useParams<{ activityId: string }>();

  const {
    data: activityDetails,
    isLoading,
    isError,
    error
  } = chapterHooks.useGetActivityById(activityId as string);

  useEffect(() => {
    if (isError) {
      showToaster('error', error?.message || 'Failed to fetch past activity details.');
    }
  }, [isError, error]);

  const questions = useMemo(
    () => activityDetails?.data?.questions,
    [activityDetails?.data?.questions]
  );

  const currentQuestion = useMemo(
    () => questions?.[activeQuestionIndex] || null,
    [questions, activeQuestionIndex]
  );

  // Get user's selected answer for current question (from API response)
  // Following the same pattern as teacher panel's view page
  const selectedOptionId = useMemo(() => {
    if (!currentQuestion) return null;
    // Extract from answer.selected_option_id (for MCQ)
    const userAnswer = (currentQuestion as any)?.answer?.selected_option_id;
    return userAnswer ? userAnswer.toString() : null;
  }, [currentQuestion]);

  // Get correct answer ID for current question
  // Following the same pattern as teacher panel's view page
  const correctAnswerId = useMemo(() => {
    if (!currentQuestion) return undefined;
    // Extract from correct_answer.option_id (same as teacher panel)
    const correctAnswerOptionId = (currentQuestion as any)?.correct_answer?.option_id;
    if (correctAnswerOptionId) {
      return correctAnswerOptionId;
    }
    // Fallback: Check if question has correct option marked in options array
    const correctOption = currentQuestion.options?.find((opt: any) => opt.is_correct);
    return correctOption?.id;
  }, [currentQuestion]);

  // Get user's pair matching selections (from API response)
  const pairMatchingSelections = useMemo(() => {
    if (!currentQuestion) return [];
    // Extract from answer.pairs or answer.selected_pairs
    const userPairs =
      (currentQuestion as any)?.answer?.pairs ||
      (currentQuestion as any)?.answer?.selected_pairs ||
      [];
    return userPairs;
  }, [currentQuestion]);

  // Get correct pair matching pairs (from API response)
  const correctPairMatchingPairs = useMemo(() => {
    if (!currentQuestion) return [];
    // Extract from correct_answer.pairs
    const correctPairs = (currentQuestion as any)?.correct_answer?.pairs || [];
    return correctPairs;
  }, [currentQuestion]);

  // Get user's drag and drop selections (from API response)
  const dragDropSelections = useMemo(() => {
    if (!currentQuestion) return {};
    // Extract from answer.selections or answer.drag_drop_selections
    const userSelections =
      (currentQuestion as any)?.answer?.selections ||
      (currentQuestion as any)?.answer?.drag_drop_selections ||
      {};
    return userSelections;
  }, [currentQuestion]);

  // Get correct drag and drop positions (from API response)
  const correctDragDropPositions = useMemo(() => {
    if (!currentQuestion) return {};
    // Extract from correct_answer.selections or correct_answer.positions
    const correctPositions =
      (currentQuestion as any)?.correct_answer?.selections ||
      (currentQuestion as any)?.correct_answer?.positions ||
      {};
    return correctPositions;
  }, [currentQuestion]);

  // Create stepper-like structure from questions
  const stepper = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    return questions.map((question, index) => ({
      question_id: question.id,
      step_number: index + 1,
      sequence: question.sequence || index + 1,
      is_answered: true, // All questions are answered in past activities
      is_current: index === activeQuestionIndex
    }));
  }, [questions, activeQuestionIndex]);

  const totalQuestions = questions?.length || 0;

  const navigateToQuestion = useCallback(
    (questionId: number) => {
      if (!questions) return;
      const questionIndex = questions.findIndex((q) => q.id === questionId);
      if (questionIndex !== -1) {
        setActiveQuestionIndex(questionIndex);
      }
    },
    [questions]
  );

  return {
    activityDetails,
    isLoading,
    activeQuestionIndex,
    currentQuestion,
    stepper,
    totalQuestions,
    selectedOptionId,
    correctAnswerId,
    pairMatchingSelections,
    correctPairMatchingPairs,
    dragDropSelections,
    correctDragDropPositions,
    navigateToQuestion
  };
};
