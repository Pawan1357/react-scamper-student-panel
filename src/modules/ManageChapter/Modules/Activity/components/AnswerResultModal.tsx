import React from 'react';

import { Image } from 'antd';

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
  walletInfo?: {
    fictitious_wallet_points_used: number;
    remaining_fictitious_wallet_balance: number;
    initial_fictitious_wallet_balance: number;
  };
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
  walletInfo,
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
          <Image
            width={100}
            height={94}
            style={{ objectFit: 'contain' }}
            src="/asset/images/PiggyBank.png"
            preview={false}
          />
          <p style={{ marginTop: '10px' }}>
            {isLastQuestion
              ? `You placed ${correctCount} out of ${totalCount} options correctly. Skill Check completed!`
              : `You placed ${correctCount} out of ${totalCount} options correctly. You may move to the next question.`}
          </p>
          {pointsEarned !== undefined && (
            <AnswerResultModalContent>
              <PointsEarnedText>Total Points: {pointsEarned}</PointsEarnedText>
            </AnswerResultModalContent>
          )}
          {walletInfo && (
            <AnswerResultModalContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#01132a',
                    marginBottom: '4px'
                  }}
                >
                  Fictitious Wallet Points:
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Points Used:{' '}
                  <strong style={{ color: '#01132a' }}>
                    {walletInfo.fictitious_wallet_points_used}
                  </strong>
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Remaining Balance:{' '}
                  <strong style={{ color: '#01132a' }}>
                    {walletInfo.remaining_fictitious_wallet_balance}
                  </strong>
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Initial Balance:{' '}
                  <strong style={{ color: '#01132a' }}>
                    {walletInfo.initial_fictitious_wallet_balance}
                  </strong>
                </div>
              </div>
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
          <Image
            width={100}
            height={94}
            style={{ objectFit: 'contain' }}
            src="/asset/images/PiggyBank.png"
            preview={false}
          />
          <p style={{ marginTop: '10px' }}>
            {isLastQuestion
              ? `You matched ${correctCount} out of ${totalCount} pairs correctly. Skill Check completed!`
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
          <Image
            width={100}
            height={94}
            style={{ objectFit: 'contain' }}
            src="/asset/images/PiggyBank.png"
            preview={false}
          />
          <p style={{ marginTop: '10px' }}>
            {isLastQuestion
              ? 'You have given correct answer. Skill Check completed!'
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
        <Image
          width={100}
          height={94}
          style={{ objectFit: 'contain' }}
          src="/asset/images/PiggyBank.png"
          preview={false}
        />
        <p style={{ marginTop: '10px' }}>
          {isLastQuestion
            ? 'You have given incorrect answer. Skill Check completed!'
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

  // Determine if this is a pair match or drag-and-drop modal (not MCQ)
  const isPairMatchOrDragDrop = !!(dragDropResults || matchPairResults);
  const modalClassName = isPairMatchOrDragDrop
    ? 'answer-result-modal answer-result-modal-scrollable'
    : 'answer-result-modal';

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
        className: modalClassName
      }}
      buttonProps={{}}
    />
  );
};
