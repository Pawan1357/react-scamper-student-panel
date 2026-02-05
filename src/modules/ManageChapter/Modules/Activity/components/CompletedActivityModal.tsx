import React, { useState } from 'react';

import { SpinConfig } from 'services/chapter/types';

import ConfirmModal from 'components/common/Modal/components/ConfirmModal';
import { CheckCircleIcon } from 'components/svg';

import { CompletedActivityBody } from './CompletedActivityModal.styled';
import { SpinningWheelModal } from './SpinningWheelModal';

type StudentProgress = {
  final_score?: number;
  total_possible_score?: number;
  correct_answers?: number;
  total_questions?: number;
};

interface CompletedActivityModalProps {
  open: boolean;
  progress?: StudentProgress;
  spinConfigs?: SpinConfig[] | null;
  activityType?: string;
  lessonId?: number;
  onClose: () => void;
}

export const CompletedActivityModal = ({
  open,
  progress,
  spinConfigs,
  activityType,
  lessonId,
  onClose
}: CompletedActivityModalProps) => {
  const [isSpinningWheelModalOpen, setIsSpinningWheelModalOpen] = useState(false);
  const correct = progress?.correct_answers ?? 0;
  const totalQ = progress?.total_questions ?? 0;
  const points = progress?.final_score ?? 0;
  const totalPoints = progress?.total_possible_score ?? 0;

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Open spinning wheel modal if spin configs are available
    if (spinConfigs && spinConfigs.length > 0) {
      // Just open the spinning wheel modal, don't call onClose (which navigates)
      setIsSpinningWheelModalOpen(true);
    } else {
      // No spin configs, so just close and navigate
      onClose();
    }
  };

  const handleSpinningWheelModalClose = () => {
    setIsSpinningWheelModalOpen(false);
    // Now navigate back after spinning wheel is closed
    onClose();
  };

  // Handle modal close - only navigate if spinning wheel is not open
  const handleModalClose = () => {
    // If spinning wheel is open, don't navigate (it will handle navigation when it closes)
    if (!isSpinningWheelModalOpen) {
      onClose();
    }
  };

  const renderDescription = () => {
    // For match pair, show only total points
    if (activityType === 'match_pair') {
      return (
        <CompletedActivityBody>
          <div className="total-points">
            Total Point : <strong>{points}</strong>
            {totalPoints ? (
              <>
                {' '}
                / <strong>{totalPoints}</strong>
              </>
            ) : null}
          </div>
        </CompletedActivityBody>
      );
    }

    // For drag and drop, don't show total score
    if (activityType === 'drag_and_drop') {
      return (
        <CompletedActivityBody>
          <div className="final-score">
            Final Score: <strong>{points}</strong> / <strong>{totalPoints}</strong> Points
          </div>
        </CompletedActivityBody>
      );
    }

    // For other activity types, show both final score and total points
    return (
      <CompletedActivityBody>
        <div className="final-score">
          Final Score: <strong>{correct}</strong> / <strong>{totalQ}</strong> Points
        </div>
        <div className="total-points">
          Total Point : <strong>{points}</strong>
          {totalPoints ? (
            <>
              {' '}
              / <strong>{totalPoints}</strong>
            </>
          ) : null}
        </div>
      </CompletedActivityBody>
    );
  };

  return (
    <>
      <ConfirmModal
        modalProps={{
          open: open && !isSpinningWheelModalOpen,
          onCancel: handleModalClose,
          onOk: handleButtonClick,
          title: 'Completed Activity',
          description: renderDescription(),
          icon: <CheckCircleIcon />,
          okText: spinConfigs && spinConfigs.length > 0 ? 'Spin' : 'Go Back',
          cancelButtonProps: { style: { display: 'none' } },
          className: 'completed-activity-modal'
        }}
        buttonProps={{}}
      />
      <SpinningWheelModal
        open={isSpinningWheelModalOpen}
        spinConfigs={spinConfigs || null}
        lessonId={lessonId}
        onClose={handleSpinningWheelModalClose}
      />
    </>
  );
};
