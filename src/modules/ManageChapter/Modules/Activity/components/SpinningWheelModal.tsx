import React, { useEffect, useMemo, useState } from 'react';

import { PlayCircleOutlined } from '@ant-design/icons';
import { Image, Typography } from 'antd';
import { Wheel } from 'react-custom-roulette';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';
import { showToaster } from 'utils/functions';

import { chapterHooks } from 'services/chapter';
import { SpinConfig } from 'services/chapter/types';
import { authStore } from 'services/store/auth';

import { SpinningWheelWrapper, WheelCenterButton } from 'components/common/Lesson/Lesson.styled';
import { Loader } from 'components/common/Loader';
import ConfirmModal from 'components/common/Modal/components/ConfirmModal';
import styled from 'styled-components';

const ModalImageContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;

  .ant-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-image-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
    }
  }
`;

const WheelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  gap: 24px;
`;

const SpinButton = styled.button`
  padding: 14px 48px;
  background: #1d3c63;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;

  &:hover:not(:disabled) {
    background: #4e6bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(78, 107, 255, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SpinningWheelModalWrapper = styled.div`
  .spinning-wheel-modal {
    .ant-modal {
      width: 900px !important;
      max-width: 90vw;
    }

    .modal-icon-wrap {
      display: none;
    }

    .modal-body-wrap {
      padding: 0;
    }

    .modal-desc {
      margin: 0;
    }
  }

  .success-modal {
    .ant-modal {
      width: 500px !important;
      max-width: 90vw;
    }

    .modal-icon-wrap {
      display: none;
    }
  }
`;

interface SpinningWheelModalProps {
  open: boolean;
  spinConfigs: SpinConfig[] | null;
  lessonId?: number;
  onClose: () => void;
}

const SpinWheel: React.FC<{
  parts: SpinConfig[];
  onSpin: () => void;
  onStopSpinning: (prizeNumber: number) => void;
  hasSpun: boolean;
  triggerSpin: boolean;
  onSpinStart: () => void;
}> = ({ parts, onSpin, onStopSpinning, hasSpun, triggerSpin, onSpinStart }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    if (triggerSpin && !mustSpin && !hasSpun) {
      const newPrizeNumber = Math.floor(Math.random() * parts.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      onSpin();
      onSpinStart();
    }
  }, [triggerSpin, mustSpin, hasSpun, parts.length, onSpin, onSpinStart]);

  const handleSpinClick = () => {
    if (mustSpin || hasSpun) return;
    const newPrizeNumber = Math.floor(Math.random() * parts.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    onSpin();
    onSpinStart();
  };

  const wheelData = useMemo(() => {
    return parts?.map((item) => ({
      option: item?.title
    }));
  }, [parts]);

  const backgroundColors = [
    '#9c27b0',
    '#e91e63',
    '#ff9800',
    '#ffb74d',
    '#ffeb3b',
    '#8bc34a',
    '#4caf50',
    '#03a9f4'
  ];

  return (
    <SpinningWheelWrapper>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        backgroundColors={backgroundColors}
        textColors={['#fff']}
        outerBorderColor="#ccc"
        outerBorderWidth={3}
        radiusLineColor="#ddd"
        radiusLineWidth={2}
        fontSize={14}
        onStopSpinning={() => {
          setMustSpin(false);
          onStopSpinning(prizeNumber);
        }}
      />
      <WheelCenterButton onClick={handleSpinClick} disabled={mustSpin || hasSpun}>
        <PlayCircleOutlined style={{ fontSize: '32px' }} />
      </WheelCenterButton>
    </SpinningWheelWrapper>
  );
};

export const SpinningWheelModal: React.FC<SpinningWheelModalProps> = ({
  open,
  spinConfigs,
  lessonId,
  onClose
}) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [winningResult, setWinningResult] = useState<SpinConfig | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [triggerSpin, setTriggerSpin] = useState(false);

  const userData = authStore((state) => state.userData);
  const studentId = userData?.id;

  const spinWheelMutation = chapterHooks.useSpinWheel();

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setHasSpun(false);
      setIsSpinning(false);
      setWinningResult(null);
      setIsResultModalOpen(false);
      setTriggerSpin(false);
    }
  }, [open]);

  const handleSpinButtonClick = () => {
    if (hasSpun || isSpinning) return;
    setTriggerSpin(true);
    setIsSpinning(true);
  };

  const handleSpinStart = () => {
    setHasSpun(true);
  };

  const handleStopSpinning = (prizeNumber: number) => {
    setIsSpinning(false);
    setTriggerSpin(false);
    const winningPart = spinConfigs?.[prizeNumber];
    if (winningPart) {
      setWinningResult(winningPart);

      // Call API when wheel stops - show loader during API call
      if (lessonId && studentId && winningPart.id) {
        spinWheelMutation.mutate(
          {
            lesson_id: lessonId,
            student_id: studentId,
            spin_config_id: winningPart.id
          },
          {
            onSuccess: () => {
              // API call successful - now open result modal
              setIsResultModalOpen(true);
            },
            onError: (error: any) => {
              showToaster(
                'error',
                error?.message || 'Failed to submit spin wheel result. Please try again.'
              );
              // Still open result modal even if API fails
              setIsResultModalOpen(true);
            }
          }
        );
      } else {
        // If required data is missing, just show result modal
        setIsResultModalOpen(true);
      }
    }
  };

  const handleResultModalClose = () => {
    setIsResultModalOpen(false);
    setWinningResult(null);
    // Close spinning wheel modal and navigate back
    onClose();
  };

  const getImageUrl = (mediaUrl: string) => {
    return `${IMAGE_URL}scamper/${ImageTypeEnum.LESSON}/${mediaUrl}`;
  };

  if (!spinConfigs || spinConfigs.length === 0) {
    return null;
  }

  return (
    <SpinningWheelModalWrapper>
      <ConfirmModal
        modalProps={{
          width: 500,
          open: open && !isResultModalOpen,
          onCancel: () => {
            // If result modal is not open and API is not loading, navigate back
            if (!isResultModalOpen && !spinWheelMutation.isPending) {
              onClose();
            }
          },
          onOk: () => {},
          title: '',
          description: (
            <WheelContainer>
              {spinWheelMutation.isPending ? (
                <Loader />
              ) : (
                <>
                  <SpinWheel
                    parts={spinConfigs}
                    onSpin={() => {}}
                    onStopSpinning={handleStopSpinning}
                    hasSpun={hasSpun}
                    triggerSpin={triggerSpin}
                    onSpinStart={handleSpinStart}
                  />
                  <SpinButton
                    onClick={handleSpinButtonClick}
                    disabled={hasSpun || isSpinning || spinWheelMutation.isPending}
                  >
                    {isSpinning || hasSpun ? 'Spinning...' : 'Spin'}
                  </SpinButton>
                </>
              )}
            </WheelContainer>
          ),
          icon: <></>,
          okText: '',
          cancelText: '',
          cancelButtonProps: { style: { display: 'none' } },
          okButtonProps: { style: { display: 'none' } },
          className: 'spinning-wheel-modal',
          closable: !spinWheelMutation.isPending,
          maskClosable: !spinWheelMutation.isPending
        }}
        buttonProps={{}}
      />

      <ConfirmModal
        modalProps={{
          open: isResultModalOpen,
          onCancel: handleResultModalClose,
          onOk: handleResultModalClose,
          title: '',
          description: (
            <div className="modal-body-wrap">
              {winningResult?.media_url && <div className="title">General Knowledge Image</div>}
              {winningResult?.media_url && (
                <ModalImageContainer>
                  <Image src={getImageUrl(winningResult?.media_url)} alt="Spinning wheel result" />
                </ModalImageContainer>
              )}
              {winningResult?.title && (
                <Typography.Title className="modal-title" level={4}>
                  {winningResult.title}
                </Typography.Title>
              )}
              {winningResult?.points !== undefined && (
                <Typography.Text
                  className="modal-question"
                  style={{ display: 'block', marginTop: '12px', textAlign: 'start' }}
                >
                  Points Earned: <strong>{winningResult.points}</strong>
                </Typography.Text>
              )}
              {winningResult?.description && (
                <Typography.Text
                  className="modal-desc"
                  style={{ display: 'block', marginTop: '16px' }}
                >
                  <p
                    className="tiptap-content-view"
                    dangerouslySetInnerHTML={{ __html: winningResult?.description || '' }}
                  />
                </Typography.Text>
              )}
            </div>
          ),
          icon: <></>,
          okText: 'Go Back',
          cancelText: '',
          cancelButtonProps: { style: { display: 'none' } },
          className: 'success-modal',
          closable: true,
          maskClosable: true,
          width: 500
        }}
        buttonProps={{}}
      />
    </SpinningWheelModalWrapper>
  );
};
