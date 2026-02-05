import React from 'react';

import { Carousel } from 'antd';

import { ImageTypeEnum } from 'utils/constants/enum';

import CommonMedia from 'modules/ManageChapter/components/Media/CommonMedia';
import { defaultCarouselSettings } from 'modules/ManageChapter/components/Media/carouselSettings';

import { QuestionTitle } from '../ActivityView.styled';
import type { QuestionCardProps } from '../types';

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionText,
  instruction,
  images = []
}) => {
  return (
    <>
      <div className="question-card-content">
        {(questionText || instruction) && (
          <QuestionTitle>{questionText || instruction}</QuestionTitle>
        )}
        {/* {questionDescription && (
          <QuestionDescriptionWrapper>
            <p>Question Description</p>
            <QuestionDescription>
              <div
                className="tiptap-content-view"
                dangerouslySetInnerHTML={{ __html: questionDescription }}
              />
            </QuestionDescription>
          </QuestionDescriptionWrapper>
        )} */}
      </div>
      {images && images.length > 0 && (
        <CommonMedia
          mode="gallery"
          Carousel={Carousel}
          urlName={ImageTypeEnum.QUESTION}
          data={images || []}
          itemsPerSlide={4}
          carouselSettings={defaultCarouselSettings}
        />
      )}
    </>
  );
};
