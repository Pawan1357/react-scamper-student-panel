import React from 'react';

import { Radio } from 'antd';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import { OptionItem } from '../ActivityView.styled';
import { OptionContentWrapper, OptionImage } from './RadioOption.styled';

interface RadioOptionProps {
  option: any;
  selectedOptionId?: string | null;
  isCorrect?: boolean;
  showAsIncorrect?: boolean;
  isViewMode?: boolean;
  isSubmitted?: boolean;
  onOptionSelect?: (optionId: number) => void;
}

export const RadioOption = ({
  option,
  selectedOptionId = null,
  isCorrect = false,
  showAsIncorrect = false,
  isViewMode = false,
  isSubmitted = false,
  onOptionSelect
}: RadioOptionProps) => {
  const isSelected = selectedOptionId ? option?.id?.toString() === selectedOptionId : false;
  // Show green if it's the correct answer (always show in submitted/view mode)
  // Show red if it's selected but incorrect (after submission) or if it's an incorrect option in past activity view
  const shouldShowAsCorrect = isCorrect && (isSubmitted || isViewMode);
  const shouldShowAsIncorrect = showAsIncorrect && (isSubmitted || isViewMode);

  const handleRowClick = (e: React.MouseEvent) => {
    if (!isSubmitted && !isViewMode && onOptionSelect) {
      // Prevent event from bubbling
      e.stopPropagation();
      onOptionSelect(option.id);
    }
  };

  const handleRadioClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent row click from firing when radio is clicked directly
    e.stopPropagation();
  };

  return (
    <OptionItem
      key={option?.id}
      $isSelected={isSelected}
      $isCorrect={shouldShowAsCorrect}
      $isIncorrect={shouldShowAsIncorrect}
      onClick={handleRowClick}
      style={{ cursor: !isSubmitted && !isViewMode ? 'pointer' : 'default' }}
    >
      <Radio value={option.id.toString()} onClick={handleRadioClick}>
        <div className="d-flex justify-content-between ">
          <OptionContentWrapper>
            {option?.option_image && (
              <OptionImage
                src={`${IMAGE_URL}scamper/${ImageTypeEnum.QUESTION}/${option?.option_image}`}
                alt={option?.option_text}
                width={40}
                height={40}
                preview={false}
                className="option-image"
              />
            )}
            <span className="option-label">{option?.option_text}</span>
          </OptionContentWrapper>
        </div>
      </Radio>
    </OptionItem>
  );
};
