import { AccessStatusStyles, AccessStatusTag } from './AccessStatus.styled';

interface IAccessStatusProps {
  status: string;
  bgColor: string;
  isYearsTag?: boolean;
}

export const AccessStatus: React.FC<IAccessStatusProps> = ({
  status,
  bgColor,
  isYearsTag = false
}) => {
  return (
    <>
      <AccessStatusStyles />
      <AccessStatusTag className={isYearsTag ? 'years-tag' : ''} bgColor={bgColor}>
        {status}
      </AccessStatusTag>
    </>
  );
};
