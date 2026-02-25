import { Empty } from 'antd';

import { TITLES } from 'utils/constants';
import { QUESTION_TYPE } from 'utils/constants/enum';

import { IGetActivityByIdRes } from 'services/chapter/types';

import { ActivityDetails } from '../Activity/components/ActivityDetails';
import { DragDropArea } from '../Activity/components/DragDropArea';
import { OptionList } from '../Activity/components/OptionList';
import { PairMatching } from '../Activity/components/PairMatching';
import { ProgressIndicator } from '../Activity/components/ProgressIndicator';
import { QuestionCard } from '../Activity/components/QuestionCard';
import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import {
  ContentSection,
  QuestionCardWrapper,
  QuestionSectionCard
} from '../Activity/ActivityView.styled';
import { useViewPastActivity } from './hooks/useViewPastActivity';

const ViewPastActivityPage = () => {
  const {
    activityDetails,
    isLoading,
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
  } = useViewPastActivity();

  const renderQuestionContent = () => {
    if (!activityDetails?.data?.type) return null;
    if (!currentQuestion) return null;

    switch (activityDetails?.data?.type) {
      case QUESTION_TYPE.MCQ: {
        const mcqQuestion = currentQuestion;
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
              onOptionSelect={() => {}} // No-op in view mode
              isSubmitted={true}
              correctAnswerId={correctAnswerId}
              isViewMode={true}
              isPastActivity={true}
            />
          </>
        );
      }
      case QUESTION_TYPE.MATCH_PAIR: {
        const pairQuestion = currentQuestion;
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
              onPairsChange={() => {}} // No-op in view mode
              isSubmitted={true}
              isViewMode={true}
              userPairs={pairMatchingSelections}
              correctPairs={correctPairMatchingPairs}
            />
          </>
        );
      }
      case QUESTION_TYPE.DRAG_AND_DROP: {
        const dragDropQuestion = currentQuestion;
        return (
          <>
            <QuestionCard
              questionText={dragDropQuestion?.title}
              questionDescription={dragDropQuestion?.description}
              images={dragDropQuestion?.media}
            />
            <DragDropArea
              targets={dragDropQuestion?.drag_drop_bases}
              draggableItems={dragDropQuestion?.drag_drop_options}
              onSelectionsChange={() => {}} // No-op in view mode
              isSubmitted={true}
              questionId={dragDropQuestion.id}
              initialSelections={dragDropSelections}
              isViewMode={true}
              correctPositions={correctDragDropPositions}
              noOfRows={dragDropQuestion?.no_of_rows}
              noOfColumns={dragDropQuestion?.no_of_columns}
            />
          </>
        );
      }
      default:
        return null;
    }
  };

  if (isLoading) return <Loader />;

  // Show empty state if no questions
  if (!activityDetails?.data || totalQuestions === 0) {
    return (
      <>
        <Meta title={`${TITLES.COMMON} - ${TITLES.CLASSROOM.VIEW_PAST_ACTIVITY}`} />
        <HeaderToolbar title={TITLES.CLASSROOM.VIEW_PAST_ACTIVITY} backBtn />
        <ContentSection role="main">
          <ActivityDetails activityDetails={activityDetails?.data as IGetActivityByIdRes} />
          <QuestionSectionCard>
            <QuestionCardWrapper>
              <Empty description="No questions available for this activity" />
            </QuestionCardWrapper>
          </QuestionSectionCard>
        </ContentSection>
      </>
    );
  }

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.CLASSROOM.VIEW_PAST_ACTIVITY}`} />
      <HeaderToolbar title={TITLES.CLASSROOM.VIEW_PAST_ACTIVITY} backBtn />

      <ContentSection role="main">
        <ActivityDetails activityDetails={activityDetails?.data as IGetActivityByIdRes} />

        <QuestionSectionCard>
          {totalQuestions > 1 && (
            <ProgressIndicator
              stepper={stepper}
              totalQuestions={totalQuestions}
              onClick={navigateToQuestion}
              areAllQuestionsSubmitted={true}
              isViewMode={true}
            />
          )}
          <QuestionCardWrapper>
            {currentQuestion ? renderQuestionContent() : <Empty description="Question not found" />}
          </QuestionCardWrapper>
        </QuestionSectionCard>
      </ContentSection>
    </>
  );
};

export default ViewPastActivityPage;
