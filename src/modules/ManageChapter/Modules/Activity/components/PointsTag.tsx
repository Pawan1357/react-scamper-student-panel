import { PointsTagContainer } from '../ActivityView.styled';

export const PointsTag = ({ points }: { points: number }) => {
  return (
    <div>
      <PointsTagContainer $points={points}>{points} P</PointsTagContainer>
    </div>
  );
};
