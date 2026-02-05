import React from 'react';

import { CheckOutlined } from '@ant-design/icons';

import { ProgressIndicatorContainer, ProgressLine, ProgressMarker } from '../ActivityView.styled';

interface ProgressIndicatorProps {
  totalQuestions: number;
  activeIndex: number;
  submittedQuestions: Set<number>;
  onClick?: (index: number) => void;
}

interface StepperProgressIndicatorProps {
  stepper: any[];
  totalQuestions: number;
  onClick?: (questionId: number) => void;
  areAllQuestionsSubmitted?: boolean;
  isViewMode?: boolean;
  allowNavigation?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps | StepperProgressIndicatorProps> = (
  props
) => {
  // Check if using stepper (new API-based approach)
  if ('stepper' in props && props.stepper) {
    const { stepper, onClick, areAllQuestionsSubmitted, isViewMode, allowNavigation } =
      props as StepperProgressIndicatorProps;
    const isClickable = (areAllQuestionsSubmitted || isViewMode || allowNavigation) && onClick;

    return (
      <ProgressIndicatorContainer>
        {stepper.map((step, index) => {
          const isCompleted = step.is_answered;
          const isActive = step.is_current;
          const isPast = step.sequence < step.step_number && step.is_answered;

          const handleClick = () => {
            if (isClickable) {
              onClick(step.question_id);
            }
          };

          return (
            <React.Fragment key={step.question_id}>
              <ProgressMarker
                $isCompleted={isCompleted}
                $isActive={isActive}
                $isPast={isPast}
                $isClickable={!!isClickable}
                onClick={isClickable ? handleClick : undefined}
              >
                {isCompleted && <CheckOutlined />}
              </ProgressMarker>
              {index < stepper.length - 1 && (
                <ProgressLine $isCompleted={isPast || isCompleted} $isActive={isActive} />
              )}
            </React.Fragment>
          );
        })}
      </ProgressIndicatorContainer>
    );
  }

  // Fallback to old approach (for backward compatibility)
  const { totalQuestions, activeIndex, submittedQuestions, onClick } =
    props as ProgressIndicatorProps;
  const isClickable = onClick && submittedQuestions?.size === totalQuestions;

  return (
    <ProgressIndicatorContainer>
      {Array.from({ length: totalQuestions }, (_, index) => {
        const isCompleted = submittedQuestions?.has(index) || false;
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;

        const handleClick = () => {
          if (isClickable && onClick) {
            onClick(index);
          }
        };

        return (
          <React.Fragment key={index}>
            <ProgressMarker
              $isCompleted={isCompleted}
              $isActive={isActive}
              $isPast={isPast}
              $isClickable={isClickable}
              onClick={isClickable ? handleClick : undefined}
            >
              {isCompleted && <CheckOutlined />}
            </ProgressMarker>
            {index < totalQuestions - 1 && (
              <ProgressLine $isCompleted={isPast || isCompleted} $isActive={isActive} />
            )}
          </React.Fragment>
        );
      })}
    </ProgressIndicatorContainer>
  );
};
