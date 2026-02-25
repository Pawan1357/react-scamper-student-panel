import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ROUTES } from 'utils/constants/routes';
import { showToaster } from 'utils/functions';

import { chapterHooks, chapterQueryKey } from 'services/chapter';

export const useActivityView = () => {
  const queryClient = useQueryClient();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const hasInitializedResume = useRef(false);
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [completionProgress, setCompletionProgress] = useState<
    | {
        final_score?: number;
        total_possible_score?: number;
        correct_answers?: number;
        total_questions?: number;
      }
    | undefined
  >(undefined);
  const [modalData, setModalData] = useState<{
    isCorrect: boolean;
    pointsEarned?: number;
    correctAnswerId?: number;
    correctAnswer?: {
      option_id: number;
      option_text: string;
      option_image: string | null;
    };
    matchPairResults?: Array<{
      left_option_id: number;
      right_option_id: number;
      is_correct: boolean;
      points_earned: number;
    }>;
    dragDropResults?: Array<{
      drag_drop_option_id: number;
      position: string;
      is_correct: boolean;
      points_earned: number;
    }>;
    walletInfo?: {
      fictitious_wallet_points_used: number;
      remaining_fictitious_wallet_balance: number;
      initial_fictitious_wallet_balance: number;
    };
  } | null>(null);
  const [pairResults, setPairResults] = useState<{
    [questionId: number]: {
      [pairKey: string]: {
        is_correct: boolean;
        points_earned: number;
      };
    };
  }>({});
  const [pairMatchingSelections, setPairMatchingSelections] = useState<{
    [questionId: number]: any[];
  }>({});
  const [dragDropSelections, setDragDropSelections] = useState<{
    [questionId: number]: { [position: string]: any[] };
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [questionId: number]: number;
  }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{
    [questionId: number]: {
      selectedOptionId: number;
      correctAnswerId?: number;
    };
  }>({});

  const { activityId } = useParams<{ activityId: string }>();

  const {
    data: activityDetails,
    isLoading,
    isError,
    error
  } = chapterHooks.useGetActivityById(activityId as string);

  const submitMcqAnswerMutation = chapterHooks.useSubmitMcqAnswer(activityId as string);
  const submitMatchPairAnswerMutation = chapterHooks.useSubmitMatchPairAnswer(activityId as string);
  const submitDragDropAnswerMutation = chapterHooks.useSubmitDragDropAnswer(activityId as string);

  useEffect(() => {
    if (isError) {
      showToaster('error', error?.message);
    }
  }, [isError, error]);

  const questions = useMemo(
    () => activityDetails?.data?.questions,
    [activityDetails?.data?.questions]
  );

  // Check if activity is past (independent of completion status)
  const activityStatus = activityDetails?.data?.status;
  const isPastActivity = activityStatus === 'past';

  // Check if activity is completed
  // Only consider it completed if status is explicitly 'completed'
  // If student_progress is null/undefined or status is 'pending'/'in_progress', allow normal interaction
  const isActivityCompleted = useMemo(() => {
    const status = activityDetails?.data?.student_progress?.status;
    return status === 'completed';
  }, [activityDetails?.data?.student_progress?.status]);

  // Initialize answers from API when activity is completed
  useEffect(() => {
    if (isActivityCompleted && questions && questions.length > 0) {
      const initialSubmittedAnswers: {
        [questionId: number]: {
          selectedOptionId: number;
          correctAnswerId?: number;
        };
      } = {};
      const initialSubmittedQuestions = new Set<number>();

      questions.forEach((question: any, index: number) => {
        if (question.has_answer && question.answers && question.answers.length > 0) {
          const answer = question.answers[0];
          const selectedOptionId = answer.selected_option_id;
          const correctAnswerId = question.correct_answers?.[0]?.option_id;

          initialSubmittedAnswers[question.id] = {
            selectedOptionId,
            correctAnswerId
          };
          initialSubmittedQuestions.add(index);

          // Restore drag and drop selections for completed activities
          if (
            question.type === 'drag_and_drop' &&
            question.answers &&
            Array.isArray(question.answers)
          ) {
            const restoredSelections: { [position: string]: any[] } = {};

            question.answers.forEach((ans: any) => {
              if (ans.selected_position && ans.selected_drag_drop_option_id) {
                // Find the full option from drag_drop_options to get all fields (total_points, correct_positions, etc.)
                const fullOption = question.drag_drop_options?.find(
                  (opt: any) => opt.id === ans.selected_drag_drop_option_id
                );

                // Merge API option data with full option data
                const option = fullOption
                  ? { ...fullOption, ...ans.selected_drag_drop_option }
                  : ans.selected_drag_drop_option;

                if (option) {
                  if (!restoredSelections[ans.selected_position]) {
                    restoredSelections[ans.selected_position] = [];
                  }
                  restoredSelections[ans.selected_position].push(option);
                }
              }
            });

            if (Object.keys(restoredSelections).length > 0) {
              setDragDropSelections((prev) => ({
                ...prev,
                [question.id]: restoredSelections
              }));
            }
          }
        }
      });

      setSubmittedAnswers(initialSubmittedAnswers);
      setSubmittedQuestions(initialSubmittedQuestions);
    }
  }, [isActivityCompleted, questions]);

  // Reset initialization flag when activity changes
  useEffect(() => {
    hasInitializedResume.current = false;
  }, [activityId]);

  // Resume from first unanswered question when NOT in view mode
  useEffect(() => {
    // Only run if activity is NOT completed, questions are loaded, and we haven't initialized yet
    if (
      !isActivityCompleted &&
      questions &&
      questions.length > 0 &&
      !hasInitializedResume.current
    ) {
      // Find the first unanswered question (has_answer is false or undefined)
      const firstUnansweredIndex = questions.findIndex((question: any) => !question.has_answer);

      // If we found an unanswered question, set it as active
      if (firstUnansweredIndex !== -1) {
        setActiveQuestionIndex(firstUnansweredIndex);
      }

      // Restore submitted answers and selected options for answered questions
      const restoredSubmittedAnswers: {
        [questionId: number]: {
          selectedOptionId: number;
          correctAnswerId?: number;
        };
      } = {};
      const restoredSubmittedQuestions = new Set<number>();
      const restoredSelectedOptions: { [questionId: number]: number } = {};

      questions.forEach((question: any, index: number) => {
        if (question.has_answer) {
          // Question has been answered - restore the answer
          if (question.answers && question.answers.length > 0) {
            const answer = question.answers[0];
            const selectedOptionId = answer.selected_option_id;
            const correctAnswerId = question.correct_answers?.[0]?.option_id;

            restoredSubmittedAnswers[question.id] = {
              selectedOptionId,
              correctAnswerId
            };
            restoredSubmittedQuestions.add(index);

            // Also restore selected option for display
            if (selectedOptionId) {
              restoredSelectedOptions[question.id] = selectedOptionId;
            }

            // Restore pair matching selections if it's a match pair question
            if (question.type === 'match_pair' && answer.pairs && answer.pairs.length > 0) {
              // Format pairs for PairMatching component
              const restoredPairs = answer.pairs
                .map((pair: any) => ({
                  left: question.options?.find(
                    (opt: any) => opt.id === (pair.left_id || pair.left?.id)
                  ),
                  right: question.options?.find(
                    (opt: any) => opt.id === (pair.right_id || pair.right?.id)
                  ),
                  correctRight: null // Will be determined by component
                }))
                .filter((p: any) => p.left && p.right);

              if (restoredPairs.length > 0) {
                setPairMatchingSelections((prev) => ({
                  ...prev,
                  [question.id]: restoredPairs
                }));
              }
            }

            // Restore drag and drop selections if it's a drag_and_drop question
            if (
              question.type === 'drag_and_drop' &&
              question.answers &&
              Array.isArray(question.answers)
            ) {
              // Format selections: { position: [items] }
              // API response structure: question.answers is an array of answer objects
              // Each answer has: selected_drag_drop_option_id, selected_drag_drop_option, selected_position
              const restoredSelections: { [position: string]: any[] } = {};

              question.answers.forEach((ans: any) => {
                if (ans.selected_position && ans.selected_drag_drop_option_id) {
                  // Find the full option from drag_drop_options to get all fields (total_points, correct_positions, etc.)
                  const fullOption = question.drag_drop_options?.find(
                    (opt: any) => opt.id === ans.selected_drag_drop_option_id
                  );

                  // Merge API option data with full option data
                  const option = fullOption
                    ? { ...fullOption, ...ans.selected_drag_drop_option }
                    : ans.selected_drag_drop_option;

                  if (option) {
                    if (!restoredSelections[ans.selected_position]) {
                      restoredSelections[ans.selected_position] = [];
                    }
                    restoredSelections[ans.selected_position].push(option);
                  }
                }
              });

              if (Object.keys(restoredSelections).length > 0) {
                setDragDropSelections((prev) => ({
                  ...prev,
                  [question.id]: restoredSelections
                }));
              }
            }
          }
        }
      });

      // Update state with restored data
      if (Object.keys(restoredSubmittedAnswers).length > 0) {
        setSubmittedAnswers(restoredSubmittedAnswers);
        setSubmittedQuestions(restoredSubmittedQuestions);
      }
      if (Object.keys(restoredSelectedOptions).length > 0) {
        setSelectedOptions(restoredSelectedOptions);
      }

      // Mark as initialized
      hasInitializedResume.current = true;
    }
  }, [isActivityCompleted, questions, activityId]);

  const currentQuestion = useMemo(
    () => questions?.[activeQuestionIndex] || null,
    [questions, activeQuestionIndex]
  );

  // Get selected option for current question
  const selectedOptionId = useMemo(() => {
    if (!currentQuestion) return null;

    // For past activities, only show answer if user has given answer (has_answer = true)
    if (isPastActivity) {
      if (
        currentQuestion.has_answer &&
        currentQuestion?.answers &&
        currentQuestion?.answers?.length > 0
      ) {
        const answer = currentQuestion?.answers[0];
        return answer.selected_option_id?.toString() || null;
      }
      return null; // Don't show answer if user hasn't answered
    }

    // If activity is completed, get from question.answers
    if (
      isActivityCompleted &&
      currentQuestion.has_answer &&
      currentQuestion?.answers &&
      currentQuestion?.answers?.length > 0
    ) {
      const answer = currentQuestion?.answers[0];
      return answer.selected_option_id?.toString() || null;
    }

    // If question has been answered (has_answer = true) but activity is not completed
    // Get from question.answers (restored from API)
    if (
      !isActivityCompleted &&
      currentQuestion.has_answer &&
      currentQuestion?.answers &&
      currentQuestion?.answers?.length > 0
    ) {
      const answer = currentQuestion?.answers[0];
      return answer.selected_option_id?.toString() || null;
    }

    // Otherwise, get from submitted answers or selected options
    const submitted = submittedAnswers[currentQuestion.id];
    if (submitted) {
      return submitted.selectedOptionId?.toString() || null;
    }
    return selectedOptions[currentQuestion.id]?.toString() || null;
  }, [currentQuestion, selectedOptions, submittedAnswers, isActivityCompleted, isPastActivity]);

  // Get correct answer ID for current question (for view mode or after submission)
  // Only show correct answer if question is submitted or activity is completed
  // For past activities, only show if user has given answer
  const correctAnswerId = useMemo(() => {
    if (!currentQuestion) return undefined;

    // For past activities, only show correct answer if user has given answer
    if (isPastActivity) {
      if (
        currentQuestion.has_answer &&
        currentQuestion?.correct_answers &&
        currentQuestion?.correct_answers?.length > 0
      ) {
        return currentQuestion.correct_answers[0]?.option_id;
      }
      return undefined; // Don't show correct answer if user hasn't answered
    }

    const hasStudentProgress = !!activityDetails?.data?.student_progress;
    const isQuestionSubmitted = submittedQuestions.has(activeQuestionIndex);

    // Don't show correct answer for new activities (no student_progress) unless question is submitted
    if (!hasStudentProgress && !isQuestionSubmitted && !isActivityCompleted) {
      return undefined;
    }

    // If activity is completed, get from question.correct_answers
    if (
      isActivityCompleted &&
      currentQuestion?.correct_answers &&
      currentQuestion?.correct_answers?.length > 0
    ) {
      return currentQuestion.correct_answers[0]?.option_id;
    }

    // Check modal data first (after submission)
    if (modalData?.correctAnswerId) {
      return modalData.correctAnswerId;
    }
    // Check submitted answers
    const submitted = submittedAnswers[currentQuestion.id];
    if (submitted?.correctAnswerId) {
      return submitted.correctAnswerId;
    }
    // Only show correct answer if question is submitted
    if (isQuestionSubmitted) {
      const correctOption = currentQuestion.options?.find((opt: any) => opt.is_correct);
      return correctOption?.id;
    }
    return undefined;
  }, [
    currentQuestion,
    modalData,
    submittedAnswers,
    isActivityCompleted,
    submittedQuestions,
    activeQuestionIndex,
    activityDetails?.data?.student_progress,
    isPastActivity
  ]);

  // Create stepper-like structure from questions
  const stepper = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    return questions.map((question, index) => ({
      question_id: question.id,
      step_number: index + 1,
      sequence: question.sequence || index + 1,
      is_answered: isActivityCompleted
        ? question.has_answer || false
        : submittedQuestions.has(index),
      is_current: index === activeQuestionIndex
    }));
  }, [questions, submittedQuestions, activeQuestionIndex, isActivityCompleted]);

  const totalQuestions = questions?.length || 0;
  const isLastQuestion = activeQuestionIndex >= totalQuestions - 1;

  // Check if all questions are answered - use has_answer from API, not just local submittedQuestions
  const areAllQuestionsAnswered = useMemo(() => {
    if (!questions || questions.length === 0) return false;
    if (isActivityCompleted) return true;
    // Check if all questions have has_answer = true
    return questions.every((question: any) => question.has_answer === true);
  }, [questions, isActivityCompleted]);

  const areAllQuestionsSubmitted =
    isActivityCompleted ||
    areAllQuestionsAnswered ||
    (submittedQuestions.size === totalQuestions && totalQuestions > 0);

  const onQuestionChange = useCallback(
    (index: number) => {
      // Allow navigation if:
      // 1. Activity is past (view mode)
      // 2. Activity is completed (view mode)
      // 3. All questions are submitted
      // 4. Navigating to already submitted question
      // 5. Activity is new/not started (no student_progress) - allow free navigation
      const hasStudentProgress = !!activityDetails?.data?.student_progress;
      if (
        isPastActivity ||
        isActivityCompleted ||
        areAllQuestionsSubmitted ||
        submittedQuestions.has(index) ||
        !hasStudentProgress
      ) {
        setActiveQuestionIndex(index);
      }
    },
    [
      areAllQuestionsSubmitted,
      submittedQuestions,
      isActivityCompleted,
      activityDetails?.data?.student_progress,
      isPastActivity
    ]
  );

  const navigateToQuestion = useCallback(
    (questionId: number) => {
      if (!questions) return;
      const questionIndex = questions.findIndex((q) => q.id === questionId);
      if (questionIndex !== -1) {
        onQuestionChange(questionIndex);
      }
    },
    [questions, onQuestionChange]
  );

  const handleNextQuestion = useCallback(() => {
    setIsModalOpen(false);
    setModalData(null);

    if (isLastQuestion) {
      // Activity completed - could navigate back or show completion message
      return;
    }

    // Move to next question
    const nextIndex = activeQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setActiveQuestionIndex(nextIndex);
    }
  }, [activeQuestionIndex, isLastQuestion, totalQuestions]);

  // Go back to View Lesson: full page load so lesson view always fetches fresh data
  const goBackToLesson = useCallback(() => {
    const lessonId = activityDetails?.data?.lesson_id;
    if (lessonId != null) {
      window.location.href = ROUTES.chapter.viewLesson(String(lessonId));
    } else {
      window.history.back();
    }
  }, [activityDetails?.data?.lesson_id]);

  // Handle next question navigation for completed activities
  const handleNextQuestionNavigation = useCallback(() => {
    if (isLastQuestion) {
      goBackToLesson();
      return;
    }

    // Move to next question
    const nextIndex = activeQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setActiveQuestionIndex(nextIndex);
    }
  }, [activeQuestionIndex, isLastQuestion, totalQuestions, goBackToLesson]);

  // Handle finish button click - redirect back
  const handleFinish = useCallback(() => {
    goBackToLesson();
  }, [goBackToLesson]);

  const onOptionSelect = useCallback(
    (optionId: number) => {
      if (!currentQuestion) return;
      // Disable selection if activity is past, completed, or question is submitted
      if (isPastActivity || isActivityCompleted || submittedQuestions.has(activeQuestionIndex)) {
        return;
      }
      setSelectedOptions((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId
      }));
    },
    [currentQuestion, activeQuestionIndex, submittedQuestions, isActivityCompleted, isPastActivity]
  );

  const onSubmitQuestion = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!currentQuestion || !activityId) {
        showToaster('warning', 'No question available');
        return;
      }

      // Prevent submission if activity is past or already completed
      if (isPastActivity || isActivityCompleted) {
        return;
      }

      if (
        submitMcqAnswerMutation.isPending ||
        submitMatchPairAnswerMutation.isPending ||
        submitDragDropAnswerMutation.isPending
      ) {
        return; // Prevent multiple submissions
      }

      // For MCQ, check if option is selected
      if (activityDetails?.data?.type === 'mcq') {
        const selected = selectedOptions[currentQuestion.id];
        if (!selected) {
          showToaster('warning', 'Please select an option before submitting');
          return;
        }
      }

      // For pair matching, check if all pairs are matched
      if (activityDetails?.data?.type === 'match_pair') {
        const selections = pairMatchingSelections[currentQuestion.id];
        const totalPairs = currentQuestion.options?.length || 0;
        if (!selections || selections.length < totalPairs) {
          showToaster('warning', 'Please match all pairs before submitting');
          return;
        }
      }

      // For drag and drop, check if at least one option is dropped
      if (activityDetails?.data?.type === 'drag_and_drop') {
        const selections = dragDropSelections[currentQuestion.id];
        const totalDropped = selections
          ? Object.values(selections).reduce(
              (sum, items) => sum + (Array.isArray(items) ? items.length : 0),
              0
            )
          : 0;
        if (!selections || totalDropped === 0) {
          showToaster('warning', 'Please drop at least one option before submitting');
          return;
        }
      }

      // Get correct answer ID
      const correctOption = currentQuestion.options?.find((opt: any) => opt.is_correct);
      const correctAnswerId = correctOption?.id;
      const selectedOptionId =
        activityDetails?.data?.type === 'mcq' ? selectedOptions[currentQuestion.id] : undefined;

      // For MCQ questions, call the API to submit the answer
      if (activityDetails?.data?.type === 'mcq' && selectedOptionId && activityId) {
        submitMcqAnswerMutation.mutate(
          {
            question_id: currentQuestion.id,
            selected_option_id: selectedOptionId
          },
          {
            onSuccess: (response) => {
              // Handle successful API response
              // Response structure: { is_correct, points_earned, correct_answer, selected_answer, student_progress }
              // Note: interceptor returns response.data directly, so response is the data object
              const responseData = response?.data || response;
              const isCorrect = responseData?.is_correct ?? false;
              const pointsEarned = responseData?.points_earned ?? 0;
              const responseCorrectAnswerId =
                responseData?.correct_answer?.option_id || correctAnswerId;

              // Extract student_progress from API response if available
              if (responseData?.student_progress) {
                setCompletionProgress({
                  final_score: responseData.student_progress.final_score,
                  total_possible_score: responseData.student_progress.total_possible_score,
                  correct_answers: responseData.student_progress.correct_answers,
                  total_questions: responseData.student_progress.total_questions
                });
              }

              // Get correct answer from API response or find it from question options
              let correctAnswer = responseData?.correct_answer;
              if (!correctAnswer && currentQuestion?.options) {
                const correctOption = currentQuestion.options.find(
                  (opt: any) => opt.id === responseCorrectAnswerId || opt.is_correct
                );
                if (correctOption) {
                  correctAnswer = {
                    option_id: correctOption.id,
                    option_text: correctOption.option_text,
                    option_image: correctOption.option_image || null
                  };
                }
              }

              // Store submitted answer
              setSubmittedAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: {
                  selectedOptionId,
                  correctAnswerId: responseCorrectAnswerId
                }
              }));

              // Don't open modal if activity is already completed
              if (!isActivityCompleted) {
                setModalData({
                  isCorrect,
                  pointsEarned,
                  correctAnswerId: responseCorrectAnswerId,
                  correctAnswer
                });
                setIsModalOpen(true);
              }
              setSubmittedQuestions((prev) => new Set([...prev, activeQuestionIndex]));
            },
            onError: (error: any) => {
              showToaster('error', error?.message || 'Failed to submit answer. Please try again.');
            }
          }
        );
        return;
      }

      // For drag and drop questions, call the API to submit the answer
      if (activityDetails?.data?.type === 'drag_and_drop' && activityId) {
        const selections = dragDropSelections[currentQuestion.id];
        if (!selections || Object.keys(selections).length === 0) {
          showToaster('warning', 'Please drop at least one option before submitting');
          return;
        }

        // Format selections for API: { drag_drop_option_id, position }
        const formattedAnswers: Array<{ drag_drop_option_id: number; position: string }> = [];
        Object.entries(selections).forEach(([position, items]) => {
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              if (item?.id) {
                formattedAnswers.push({
                  drag_drop_option_id: item.id,
                  position: position
                });
              }
            });
          }
        });

        submitDragDropAnswerMutation.mutate(
          {
            question_id: currentQuestion.id,
            answers: formattedAnswers
          },
          {
            onSuccess: (response) => {
              // Handle successful API response
              const responseData = response?.data || response;
              const totalPointsEarned = responseData?.total_points_earned ?? 0;
              const answers = responseData?.answers || [];

              // Extract student_progress from API response if available
              if (responseData?.student_progress) {
                setCompletionProgress({
                  final_score: responseData.student_progress.final_score,
                  total_possible_score: responseData.student_progress.total_possible_score,
                  correct_answers: responseData.student_progress.correct_answers,
                  total_questions: responseData.student_progress.total_questions
                });
              }

              // Don't open modal if activity is already completed
              if (!isActivityCompleted) {
                setModalData({
                  isCorrect: totalPointsEarned > 0, // Consider correct if any points earned
                  pointsEarned: totalPointsEarned,
                  dragDropResults: answers,
                  walletInfo:
                    responseData?.fictitious_wallet_points_used !== undefined
                      ? {
                          fictitious_wallet_points_used:
                            responseData?.fictitious_wallet_points_used || 0,
                          remaining_fictitious_wallet_balance:
                            responseData?.remaining_fictitious_wallet_balance || 0,
                          initial_fictitious_wallet_balance:
                            responseData?.initial_fictitious_wallet_balance || 0
                        }
                      : undefined
                });
                setIsModalOpen(true);
              }
              setSubmittedQuestions((prev) => new Set([...prev, activeQuestionIndex]));
            },
            onError: (error: any) => {
              showToaster('error', error?.message || 'Failed to submit answer. Please try again.');
            }
          }
        );
        return;
      }

      // For match pair questions, call the API to submit the answer
      if (activityDetails?.data?.type === 'match_pair' && activityId) {
        const selections = pairMatchingSelections[currentQuestion.id];
        if (!selections || selections.length === 0) {
          showToaster('warning', 'Please match all pairs before submitting');
          return;
        }

        // Format pairs for API: { left_option_id, right_option_id }
        // pairs structure: { left: { id, ... }, right: { id, ... } }
        const formattedPairs = selections
          .filter((pair: any) => pair.left && pair.right) // Only include pairs with both left and right
          .map((pair: any) => ({
            left_option_id: pair.left?.id,
            right_option_id: pair.right?.id
          }));

        submitMatchPairAnswerMutation.mutate(
          {
            question_id: currentQuestion.id,
            pairs: formattedPairs
          },
          {
            onSuccess: (response) => {
              // Handle successful API response
              const responseData = response?.data || response;
              const totalPointsEarned = responseData?.total_points_earned ?? 0;
              const answers = responseData?.answers || [];

              // Store pair results for displaying green/red
              const pairResultsMap: {
                [pairKey: string]: { is_correct: boolean; points_earned: number };
              } = {};
              answers.forEach((answer: any) => {
                const pairKey = `${answer.left_option_id}-${answer.right_option_id}`;
                pairResultsMap[pairKey] = {
                  is_correct: answer.is_correct,
                  points_earned: answer.points_earned
                };
              });
              setPairResults((prev) => ({
                ...prev,
                [currentQuestion.id]: pairResultsMap
              }));

              // Extract student_progress from API response if available
              if (responseData?.student_progress) {
                setCompletionProgress({
                  final_score: responseData.student_progress.final_score,
                  total_possible_score: responseData.student_progress.total_possible_score,
                  correct_answers: responseData.student_progress.correct_answers,
                  total_questions: responseData.student_progress.total_questions
                });
              }

              // Don't open modal if activity is already completed
              if (!isActivityCompleted) {
                setModalData({
                  isCorrect: totalPointsEarned > 0, // Consider correct if any points earned
                  pointsEarned: totalPointsEarned,
                  matchPairResults: answers
                });
                setIsModalOpen(true);
              }
              setSubmittedQuestions((prev) => new Set([...prev, activeQuestionIndex]));
            },
            onError: (error: any) => {
              showToaster('error', error?.message || 'Failed to submit answer. Please try again.');
            }
          }
        );
        return;
      } else {
        // For non-MCQ/match_pair questions, use the existing simulation logic
        const isCorrect =
          activityDetails?.data?.type === 'mcq'
            ? selectedOptionId === correctAnswerId
            : Math.random() > 0.5; // Placeholder for pair matching
        const pointsEarned = isCorrect ? 10 : 0; // Placeholder

        // Store submitted answer
        if (activityDetails?.data?.type === 'mcq' && selectedOptionId) {
          setSubmittedAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: {
              selectedOptionId,
              correctAnswerId
            }
          }));
        }

        // Don't open modal if activity is already completed
        if (!isActivityCompleted) {
          setModalData({
            isCorrect,
            pointsEarned,
            correctAnswerId
          });
          setIsModalOpen(true);
        }
        setSubmittedQuestions((prev) => new Set([...prev, activeQuestionIndex]));
      }
    },
    [
      currentQuestion,
      activeQuestionIndex,
      selectedOptions,
      pairMatchingSelections,
      dragDropSelections,
      activityDetails?.data?.type,
      activityId,
      submitMcqAnswerMutation,
      submitMatchPairAnswerMutation,
      submitDragDropAnswerMutation,
      isActivityCompleted,
      isPastActivity
    ]
  );

  const handleModalClose = useCallback(() => {
    if (isLastQuestion) {
      setIsModalOpen(false);
      setModalData(null);
      // If user is just finishing the last submitted answer, show completion modal.
      // For already-completed activities, modal isn't shown at all (guarded in page), so safe.
      setIsCompletionModalOpen(true);
      return;
    }
    handleNextQuestion();
  }, [isLastQuestion, handleNextQuestion]);

  const handleCompletionModalClose = useCallback(() => {
    setIsCompletionModalOpen(false);
    queryClient.invalidateQueries({ queryKey: chapterQueryKey.all });
    goBackToLesson();
  }, [goBackToLesson, queryClient]);

  const updatePairMatchingSelections = useCallback((questionId: number, pairs: any[]) => {
    setPairMatchingSelections((prev) => ({
      ...prev,
      [questionId]: pairs
    }));
  }, []);

  const updateDragDropSelections = useCallback(
    (questionId: number, selections: { [position: string]: any[] }) => {
      setDragDropSelections((prev) => ({
        ...prev,
        [questionId]: selections
      }));
    },
    []
  );

  // Check if current question is submitted.
  // For new activities (no student_progress), still treat locally-submitted questions as submitted
  // so we can show green/red feedback behind the modal immediately after submit.
  const isCurrentQuestionSubmitted = useMemo(() => {
    if (isActivityCompleted && currentQuestion) {
      return currentQuestion.has_answer || false;
    }
    // For non-completed activities, check both has_answer (from API) and submittedQuestions (local state)
    if (currentQuestion && currentQuestion.has_answer) {
      return true;
    }
    return submittedQuestions.has(activeQuestionIndex);
  }, [submittedQuestions, activeQuestionIndex, isActivityCompleted, currentQuestion]);

  // Check if in view mode
  // If status is 'past', always enable view mode (independent of completion status)
  // Otherwise, enable view mode if activity is completed or all questions are submitted
  const hasStudentProgress = !!activityDetails?.data?.student_progress;

  const isViewMode =
    isPastActivity ||
    (hasStudentProgress &&
      (isActivityCompleted ||
        (areAllQuestionsSubmitted && !questions?.some((q: any) => !q.has_answer))));

  // Allow navigation for new activities (no student_progress)
  const allowNavigation = !activityDetails?.data?.student_progress;

  return {
    activityDetails,
    isLoading,
    questions,
    activeQuestionIndex,
    onQuestionChange,
    currentQuestion,
    stepper,
    totalQuestions,
    submittedQuestions,
    isModalOpen,
    isCompletionModalOpen,
    completionProgress,
    modalData,
    isLastQuestion,
    areAllQuestionsSubmitted,
    handleModalClose,
    handleCompletionModalClose,
    onSubmitQuestion,
    navigateToQuestion,
    handleNextQuestionNavigation,
    handleFinish,
    goBackToLesson,
    updatePairMatchingSelections,
    pairMatchingSelections: pairMatchingSelections[currentQuestion?.id || 0] || [],
    pairResults: pairResults[currentQuestion?.id || 0] || {},
    updateDragDropSelections,
    dragDropSelections: dragDropSelections[currentQuestion?.id || 0] || {},
    selectedOptionId,
    onOptionSelect,
    correctAnswerId,
    isCurrentQuestionSubmitted,
    isViewMode,
    isSubmitting:
      submitMcqAnswerMutation.isPending ||
      submitMatchPairAnswerMutation.isPending ||
      submitDragDropAnswerMutation.isPending,
    isActivityCompleted,
    allowNavigation,
    isPastActivity
  };
};
