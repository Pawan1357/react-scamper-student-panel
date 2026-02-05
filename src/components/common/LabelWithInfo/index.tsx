import { LabelInfo, LabelText, LabelWrapper, RequiredLabelAsterisk } from './style';

export const LabelWithInfo: React.FC<{ info: string; label: string; required?: boolean }> = ({
  info,
  label,
  required = false
}) => (
  <LabelWrapper>
    <LabelInfo>{info}</LabelInfo>
    {required && <RequiredLabelAsterisk>*</RequiredLabelAsterisk>} <LabelText>{label}</LabelText>
  </LabelWrapper>
);
