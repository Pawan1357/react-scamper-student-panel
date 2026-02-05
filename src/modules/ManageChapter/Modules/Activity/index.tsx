import { Button } from 'antd';

import { TITLES } from 'utils/constants';
import { QUESTION_TYPE } from 'utils/constants/enum';

import { IGetActivityByIdRes } from 'services/chapter/types';

import { ActivityDetails } from './components/ActivityDetails';
import { AnswerResultModal } from './components/AnswerResultModal';
import { CompletedActivityModal } from './components/CompletedActivityModal';
import { DragDropArea } from './components/DragDropArea';
import { OptionList } from './components/OptionList';
import { PairMatching } from './components/PairMatching';
import { ProgressIndicator } from './components/ProgressIndicator';
import { QuestionCard } from './components/QuestionCard';
import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import {
  ActivityScorePill,
  ActivityScoreRow,
  ContentSection,
  QuestionCardWrapper,
  QuestionSectionCard,
  SubmitButtonWrapper
} from './ActivityView.styled';
import { useActivityView } from './hooks/useActivityView';

const ActivityViewPage = () => {
  const {
    activityDetails,
    isLoading,
    activeQuestionIndex,
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
    handleNextQuestionNavigation,
    handleFinish,
    updatePairMatchingSelections,
    pairMatchingSelections,
    pairResults,
    updateDragDropSelections,
    dragDropSelections,
    selectedOptionId,
    onOptionSelect,
    correctAnswerId,
    isCurrentQuestionSubmitted,
    isViewMode,
    isSubmitting,
    isActivityCompleted
  } = useActivityView();

  const renderQuestionContent = () => {
    if (!activityDetails?.data?.type) return null;

    switch (activityDetails?.data?.type) {
      case QUESTION_TYPE.MCQ: {
        const mcqQuestion = currentQuestion;
        const hasStudentProgress = !!activityDetails?.data?.student_progress;
        // Show submitted state after local submission OR in completed view mode
        const isSubmitted = isCurrentQuestionSubmitted || isViewMode;
        // Only show correct answer highlighting after submit, or in completed view mode
        const shouldShowCorrectAnswer = isActivityCompleted || isCurrentQuestionSubmitted;
        return (
          <>
            <QuestionCard
              questionText={mcqQuestion?.title}
              questionDescription={mcqQuestion?.description}
              images={mcqQuestion?.media}
            />
            <OptionList
              options={mcqQuestion?.options || []}
              selectedOptionId={selectedOptionId}
              onOptionSelect={onOptionSelect}
              isSubmitted={isSubmitted}
              correctAnswerId={shouldShowCorrectAnswer ? correctAnswerId : undefined}
              isViewMode={hasStudentProgress ? isViewMode : false}
            />
            {!isSubmitted && !isActivityCompleted && (
              <SubmitButtonWrapper>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubmitQuestion(e);
                  }}
                  disabled={!selectedOptionId || isSubmitting}
                  loading={isSubmitting}
                >
                  Submit Answer
                </Button>
              </SubmitButtonWrapper>
            )}
            {isActivityCompleted && (
              <SubmitButtonWrapper>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isLastQuestion) {
                      handleFinish();
                    } else {
                      handleNextQuestionNavigation();
                    }
                  }}
                >
                  {isLastQuestion ? 'Finish' : 'Next Question'}
                </Button>
              </SubmitButtonWrapper>
            )}
          </>
        );
      }
      case QUESTION_TYPE.MATCH_PAIR: {
        const pairQuestion = currentQuestion;
        if (!pairQuestion) return null;
        const isSubmitted = isCurrentQuestionSubmitted || isViewMode;
        const totalPairs = pairQuestion?.options?.length || 0;
        const currentSelections = pairMatchingSelections || [];
        const allPairsMatched = currentSelections.length >= totalPairs && totalPairs > 0;
        return (
          <>
            <QuestionCard
              questionText={pairQuestion?.title}
              questionDescription={pairQuestion?.description}
              images={pairQuestion?.media}
            />
            <PairMatching
              leftItems={pairQuestion?.options || []}
              rightItems={pairQuestion?.options || []}
              onPairsChange={(pairs) => updatePairMatchingSelections(pairQuestion.id, pairs)}
              isSubmitted={isSubmitted}
              isViewMode={isViewMode}
              pairResults={pairResults}
              userAnswers={pairQuestion?.answers || []}
              correctPairs={pairQuestion?.correct_pairs || []}
            />
            {!isSubmitted && !isActivityCompleted && (
              <SubmitButtonWrapper>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubmitQuestion(e);
                  }}
                  disabled={!allPairsMatched || isSubmitting}
                  loading={isSubmitting}
                >
                  Submit Answer
                </Button>
              </SubmitButtonWrapper>
            )}
            {isActivityCompleted && (
              <SubmitButtonWrapper>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isLastQuestion) {
                      handleFinish();
                    } else {
                      handleNextQuestionNavigation();
                    }
                  }}
                >
                  {isLastQuestion ? 'Finish' : 'Next Question'}
                </Button>
              </SubmitButtonWrapper>
            )}
          </>
        );
      }
      case QUESTION_TYPE.DRAG_AND_DROP: {
        const dragDropQuestion = currentQuestion;
        if (!dragDropQuestion) return null;
        const isSubmitted = isCurrentQuestionSubmitted || isViewMode;
        // dragDropSelections is already filtered by question ID from the hook
        let currentSelections = dragDropSelections || {};

        // If in view mode and selections are empty, try to restore from question.answers directly
        if (
          isViewMode &&
          Object.keys(currentSelections).length === 0 &&
          dragDropQuestion.answers &&
          Array.isArray(dragDropQuestion.answers)
        ) {
          const restoredSelections: { [position: string]: any[] } = {};

          dragDropQuestion.answers.forEach((ans: any) => {
            if (ans.selected_position && ans.selected_drag_drop_option_id) {
              const fullOption = dragDropQuestion.drag_drop_options?.find(
                (opt: any) => opt.id === ans.selected_drag_drop_option_id
              );
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
            currentSelections = restoredSelections;
          }
        }

        // Check if at least one option is dropped
        const totalDropped = Object.values(currentSelections).reduce(
          (sum, items) => sum + (Array.isArray(items) ? items.length : 0),
          0
        );
        const hasDroppedOptions = totalDropped > 0;
        return (
          <>
            <QuestionCard
              questionText={dragDropQuestion?.title}
              questionDescription={dragDropQuestion?.description}
              images={dragDropQuestion?.media}
            />
            <DragDropArea
              key={dragDropQuestion.id}
              targets={dragDropQuestion?.drag_drop_bases}
              draggableItems={dragDropQuestion?.drag_drop_options}
              onSelectionsChange={(selections) =>
                updateDragDropSelections(dragDropQuestion.id, selections)
              }
              isSubmitted={isSubmitted}
              questionId={dragDropQuestion.id}
              initialSelections={currentSelections}
              isViewMode={isViewMode}
              noOfRows={dragDropQuestion?.no_of_rows}
              noOfColumns={dragDropQuestion?.no_of_columns}
            />
            {!isSubmitted && !isActivityCompleted && (
              <SubmitButtonWrapper>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubmitQuestion(e);
                  }}
                  disabled={!hasDroppedOptions || isSubmitting}
                  loading={isSubmitting}
                >
                  Submit Answer
                </Button>
              </SubmitButtonWrapper>
            )}
            {isActivityCompleted && (
              <SubmitButtonWrapper>
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isLastQuestion) {
                      handleFinish();
                    } else {
                      handleNextQuestionNavigation();
                    }
                  }}
                >
                  {isLastQuestion ? 'Finish' : 'Next Question'}
                </Button>
              </SubmitButtonWrapper>
            )}
          </>
        );
      }
      default:
        return null;
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.CLASSROOM.VIEW_ACTIVITY}`} />
      <HeaderToolbar title={TITLES.CLASSROOM.VIEW_ACTIVITY} backBtn />

      <ContentSection role="main">
        <ActivityDetails activityDetails={activityDetails?.data as IGetActivityByIdRes} />

        <QuestionSectionCard>
          {totalQuestions > 1 &&
            (stepper && stepper.length > 0 ? (
              <ProgressIndicator
                stepper={stepper}
                totalQuestions={totalQuestions}
                areAllQuestionsSubmitted={areAllQuestionsSubmitted}
                isViewMode={isViewMode}
                allowNavigation={false}
              />
            ) : (
              <ProgressIndicator
                totalQuestions={totalQuestions}
                activeIndex={activeQuestionIndex}
                submittedQuestions={submittedQuestions}
              />
            ))}

          {isActivityCompleted && activityDetails?.data?.student_progress && (
            <ActivityScoreRow>
              <ActivityScorePill>
                Points Earned:
                <span className="value">
                  {activityDetails?.data?.student_progress?.final_score ?? 0}/
                  {activityDetails?.data?.student_progress?.total_possible_score ?? 0}
                </span>
              </ActivityScorePill>
            </ActivityScoreRow>
          )}

          <QuestionCardWrapper>{renderQuestionContent()}</QuestionCardWrapper>
        </QuestionSectionCard>

        {modalData && !isActivityCompleted && (
          <AnswerResultModal
            open={isModalOpen}
            isCorrect={modalData.isCorrect}
            pointsEarned={modalData.pointsEarned}
            correctAnswer={modalData.correctAnswer}
            isLastQuestion={isLastQuestion}
            onNext={handleModalClose}
            onClose={handleModalClose}
            matchPairResults={modalData.matchPairResults}
            dragDropResults={modalData.dragDropResults}
            questionOptions={currentQuestion?.options || []}
            dragDropOptions={currentQuestion?.drag_drop_options || []}
            dragDropBases={currentQuestion?.drag_drop_bases || []}
          />
        )}

        {!isActivityCompleted && (
          <CompletedActivityModal
            open={isCompletionModalOpen}
            progress={completionProgress || activityDetails?.data?.student_progress || undefined}
            spinConfigs={activityDetails?.data?.spin_config || null}
            activityType={activityDetails?.data?.type}
            lessonId={activityDetails?.data?.lesson_id}
            onClose={handleCompletionModalClose}
          />
        )}
      </ContentSection>
    </>
  );
};

export { ActivityViewPage as Activity };
export default ActivityViewPage;
