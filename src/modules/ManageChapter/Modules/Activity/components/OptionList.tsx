import { Radio, Space } from 'antd';

import { OptionList as OptionListStyled } from '../ActivityView.styled';
import { RadioOption } from './RadioOption';

interface OptionListProps {
  options: any[];
  selectedOptionId: string | null;
  onOptionSelect: (optionId: number) => void;
  isSubmitted?: boolean;
  correctAnswerId?: number;
  isViewMode?: boolean;
  isPastActivity?: boolean;
}

export const OptionList = ({
  options,
  selectedOptionId,
  onOptionSelect,
  isSubmitted = false,
  correctAnswerId,
  isViewMode = false,
  isPastActivity = false
}: OptionListProps) => {
  return (
    <OptionListStyled>
      <Radio.Group
        className="w-100"
        value={selectedOptionId}
        onChange={(e) => onOptionSelect?.(Number(e.target.value))}
        disabled={isSubmitted || isViewMode}
      >
        <Space className="w-100" direction="vertical" size="middle">
          {options?.map((option: any) => {
            const isSelected = option?.id?.toString() === selectedOptionId;
            const isCorrect = option?.id === correctAnswerId;

            // Following the same pattern as teacher panel's view page:
            // - Show correct answer in green (always show in view/submitted mode)
            // - Show user's selected incorrect answer in red (in view/submitted mode)
            // - For past activities: show all incorrect options (not the correct answer) with red borders
            const isViewOrSubmitted = isSubmitted || isViewMode || isPastActivity;
            const shouldShowAsCorrect = isCorrect && isViewOrSubmitted;
            // Show as incorrect if:
            // 1. It's selected and not correct (user's wrong selection), OR
            // 2. It's not correct and we're in past activity view (show all incorrect options with red border)
            const shouldShowAsIncorrect =
              (isSelected && !isCorrect && isViewOrSubmitted) || (!isCorrect && isPastActivity);

            return (
              <div key={option?.id} className="mcq-option-item">
                <RadioOption
                  option={option}
                  selectedOptionId={selectedOptionId}
                  isCorrect={shouldShowAsCorrect}
                  showAsIncorrect={shouldShowAsIncorrect}
                  isViewMode={isViewMode || isPastActivity}
                  isSubmitted={isSubmitted || isPastActivity}
                  onOptionSelect={onOptionSelect}
                />
                {/* <PointsTag points={option?.total_points} /> */}
              </div>
            );
          })}
        </Space>
      </Radio.Group>
    </OptionListStyled>
  );
};
