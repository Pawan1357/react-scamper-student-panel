import React from 'react';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import ConfirmModal from 'components/common/Modal/components/ConfirmModal';
import { CheckCircleIcon, ExclamationIcon } from 'components/svg';

import {
  AnswerResultModalContent,
  CorrectAnswerBox,
  CorrectAnswerContent,
  CorrectAnswerImage,
  CorrectAnswerText,
  MatchPairItem,
  MatchPairPoints,
  MatchPairResultsContainer,
  MatchPairText,
  PointsEarnedText,
  RightAnswerLabel
} from './AnswerResultModal.styled';

interface AnswerResultModalProps {
  open: boolean;
  isCorrect: boolean;
  correctAnswer?: {
    option_id: number;
    option_text: string;
    option_image: string | null;
  };
  pointsEarned?: number;
  isLastQuestion: boolean;
  onNext: () => void;
  onClose: () => void;
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
  questionOptions?: any[];
  dragDropOptions?: any[];
  dragDropBases?: any[];
}

export const AnswerResultModal: React.FC<AnswerResultModalProps> = ({
  open,
  isCorrect,
  correctAnswer,
  pointsEarned,
  isLastQuestion,
  onNext,
  onClose,
  matchPairResults,
  dragDropResults,
  questionOptions = [],
  dragDropOptions = [],
  dragDropBases = []
}) => {
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLastQuestion) {
      onClose();
    } else {
      onNext();
    }
  };

  const renderDescription = () => {
    // Handle drag and drop results
    if (dragDropResults && dragDropResults.length > 0) {
      const correctCount = dragDropResults.filter((r) => r.is_correct).length;
      const totalCount = dragDropResults.length;

      return (
        <>
          <p>
            {isLastQuestion
              ? `You placed ${correctCount} out of ${totalCount} options correctly. Activity completed!`
              : `You placed ${correctCount} out of ${totalCount} options correctly. You may move to the next question.`}
          </p>
          {pointsEarned !== undefined && (
            <AnswerResultModalContent>
              <PointsEarnedText>Total Points: {pointsEarned}</PointsEarnedText>
            </AnswerResultModalContent>
          )}
          <MatchPairResultsContainer>
            {dragDropResults.map((result, index) => {
              // Find option and base from question data
              const option = dragDropOptions.find(
                (opt: any) => opt.id === result.drag_drop_option_id
              );
              const base = dragDropBases.find((base: any) => base.position === result.position);

              const optionText = option?.option_text || `Option ${result.drag_drop_option_id}`;
              const baseText = base?.base_text || result.position;

              return (
                <MatchPairItem key={index} $isCorrect={result.is_correct}>
                  <MatchPairText>
                    <strong>{optionText}</strong> → <strong>{baseText}</strong>
                  </MatchPairText>
                  <MatchPairPoints $isCorrect={result.is_correct}>
                    {result.is_correct ? '✓' : '✗'} {result.points_earned} pts
                  </MatchPairPoints>
                </MatchPairItem>
              );
            })}
          </MatchPairResultsContainer>
        </>
      );
    }

    // Handle match pair results
    if (matchPairResults && matchPairResults.length > 0) {
      const correctCount = matchPairResults.filter((r) => r.is_correct).length;
      const totalCount = matchPairResults.length;

      return (
        <>
          <p>
            {isLastQuestion
              ? `You matched ${correctCount} out of ${totalCount} pairs correctly. Activity completed!`
              : `You matched ${correctCount} out of ${totalCount} pairs correctly. You may move to the next question.`}
          </p>
          {pointsEarned !== undefined && (
            <AnswerResultModalContent>
              <PointsEarnedText>Total Points: {pointsEarned}</PointsEarnedText>
            </AnswerResultModalContent>
          )}
          <MatchPairResultsContainer>
            {matchPairResults.map((result, index) => {
              // Find left and right option texts from questionOptions
              // For match pair, left items are in options array with left_text, right items also in options with option_text
              const leftOption = questionOptions.find(
                (opt: any) => opt.id === result.left_option_id
              );
              const rightOption = questionOptions.find(
                (opt: any) => opt.id === result.right_option_id
              );

              // Left items use left_text, right items use option_text
              const leftText =
                leftOption?.left_text || leftOption?.option_text || `Left ${result.left_option_id}`;
              const rightText =
                rightOption?.option_text ||
                rightOption?.right_text ||
                `Right ${result.right_option_id}`;

              return (
                <MatchPairItem key={index} $isCorrect={result.is_correct}>
                  <MatchPairText>
                    <strong>{leftText}</strong> → <strong>{rightText}</strong>
                  </MatchPairText>
                  <MatchPairPoints $isCorrect={result.is_correct}>
                    {result.is_correct ? '✓' : '✗'} {result.points_earned} pts
                  </MatchPairPoints>
                </MatchPairItem>
              );
            })}
          </MatchPairResultsContainer>
        </>
      );
    }

    // Handle MCQ results
    if (isCorrect) {
      return (
        <>
          <p>
            {isLastQuestion
              ? 'You have given correct answer. Activity completed!'
              : 'You have given correct answer. You may move to the next question.'}
          </p>
          {pointsEarned !== undefined && (
            <AnswerResultModalContent>
              <PointsEarnedText>Points: {pointsEarned}</PointsEarnedText>
            </AnswerResultModalContent>
          )}
        </>
      );
    }

    if (!correctAnswer) {
      return undefined;
    }

    return (
      <>
        <p>
          {isLastQuestion
            ? 'You have given incorrect answer. Activity completed!'
            : 'You have given incorrect answer. You may move to the next question.'}
        </p>
        <AnswerResultModalContent>
          <RightAnswerLabel>Right Answer:</RightAnswerLabel>
          <CorrectAnswerBox>
            <CorrectAnswerContent>
              {correctAnswer?.option_image && (
                <CorrectAnswerImage
                  src={`${IMAGE_URL}scamper/${ImageTypeEnum.QUESTION}/${correctAnswer.option_image}`}
                  alt={correctAnswer?.option_text || 'Correct answer'}
                />
              )}
              <CorrectAnswerText>{correctAnswer?.option_text}</CorrectAnswerText>
            </CorrectAnswerContent>
          </CorrectAnswerBox>
        </AnswerResultModalContent>
      </>
    );
  };

  return (
    <ConfirmModal
      modalProps={{
        open,
        onCancel: onClose,
        onOk: handleButtonClick,
        title: dragDropResults
          ? dragDropResults.filter((r) => r.is_correct).length === dragDropResults.length
            ? 'All Options Correct!'
            : 'Drag & Drop Results'
          : matchPairResults
            ? matchPairResults.filter((r) => r.is_correct).length === matchPairResults.length
              ? 'All Pairs Correct!'
              : 'Match Pair Results'
            : isCorrect
              ? 'Correct Answer'
              : 'Incorrect Answer',
        description: renderDescription(),
        icon: dragDropResults ? (
          dragDropResults.filter((r) => r.is_correct).length === dragDropResults.length ? (
            <CheckCircleIcon />
          ) : (
            <ExclamationIcon />
          )
        ) : matchPairResults ? (
          matchPairResults.filter((r) => r.is_correct).length === matchPairResults.length ? (
            <CheckCircleIcon />
          ) : (
            <ExclamationIcon />
          )
        ) : isCorrect ? (
          <CheckCircleIcon />
        ) : (
          <ExclamationIcon />
        ),
        okText: isLastQuestion ? 'Finish' : 'Next Question',
        cancelButtonProps: { style: { display: 'none' } },
        className: 'answer-result-modal'
      }}
      buttonProps={{}}
    />
  );
};
