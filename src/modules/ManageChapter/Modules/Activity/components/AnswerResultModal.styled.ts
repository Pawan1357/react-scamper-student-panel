import { Typography } from 'antd';

import styled from 'styled-components';

export const AnswerResultModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  width: 100%;
`;

export const RightAnswerLabel = styled(Typography.Text)`
  font-size: 14px;
  font-weight: 600;
  color: #01132a;
  margin: 8px 0;
`;

export const CorrectAnswerBox = styled.div`
  background: #f0f2f5;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #01132a;
  width: 70%;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
`;

export const CorrectAnswerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const CorrectAnswerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const CorrectAnswerText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #01132a;
  flex: 1;
`;

export const PointsEarnedText = styled(Typography.Text)`
  font-size: 14px;
  font-weight: 600;
  color: #52c41a;
  margin-top: 8px;
  display: block;
`;

export const MatchPairResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  width: 100%;
`;

export const MatchPairItem = styled.div<{ $isCorrect: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${(props) => (props.$isCorrect ? '#f2fff3' : '#fff1f0')};
  border: 1px solid ${(props) => (props.$isCorrect ? '#68A729' : '#FF4D4F')};
`;

export const MatchPairText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #01132a;
  flex: 1;
`;

export const MatchPairPoints = styled.span<{ $isCorrect: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$isCorrect ? '#52c41a' : '#ff4d4f')};
`;
