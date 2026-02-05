import { Carousel, Collapse, Empty, Tag } from 'antd';

import { formatDate } from 'utils/constants/day';
import { ImageTypeEnum } from 'utils/constants/enum';
import { questionType } from 'utils/functions';

import CommonMedia from 'modules/ManageChapter/components/Media/CommonMedia';
import { defaultCarouselSettings } from 'modules/ManageChapter/components/Media/carouselSettings';

import {
  ActivityDetailsBody,
  ActivityDetailsCard,
  ActivityDetailsHeader,
  ActivityInfoRow
} from '../ActivityView.styled';

export const ActivityDetails = ({ activityDetails }: any) => {
  const {
    created_at = '',
    description = '',
    questions = [],
    chapter_name = '',
    lesson_name = '',
    name = '',
    type = '',
    media = []
  } = activityDetails || {};
  return (
    <ActivityDetailsCard>
      <Collapse
        defaultActiveKey={['1']}
        expandIconPosition="end"
        items={[
          {
            key: '1',
            label: (
              <ActivityDetailsHeader>
                <h3>Skill Check Details</h3>
              </ActivityDetailsHeader>
            ),
            children: (
              <ActivityDetailsBody>
                <ActivityInfoRow>
                  <div className="info-item-wrapper">
                    <div className="info-item">
                      <span className="info-label">Chapter</span>
                      <span className="info-value">{chapter_name || '-'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Lesson Name</span>
                      <span className="info-value">{lesson_name || '-'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total Questions</span>
                      <span className="info-value">{questions?.length || 0}</span>
                    </div>
                  </div>
                  <div className="info-item-wrapper">
                    <div className="info-item">
                      <span className="info-label">Skill Check Name</span>
                      <span className="info-value">{name || '-'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Skill Check Type</span>
                      <Tag color="blue" className="type-tag border-md">
                        {questionType(type) || '-'}
                      </Tag>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Created At</span>
                      <span className="info-value">
                        {created_at ? formatDate(created_at, 'MM/DD/YY, HH:mm') : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="info-item-wrapper">
                    <div className="info-item">
                      <span className="info-label">Skill Check Description</span>
                      <p
                        className="tiptap-content-view"
                        dangerouslySetInnerHTML={{ __html: description || '-' }}
                      />
                    </div>
                  </div>
                </ActivityInfoRow>

                {media?.length > 0 ? (
                  <CommonMedia
                    mode="gallery"
                    Carousel={Carousel}
                    data={media}
                    urlName={ImageTypeEnum.ACTIVITY}
                    itemsPerSlide={4}
                    carouselSettings={defaultCarouselSettings}
                  />
                ) : (
                  <Empty description="No media available" />
                )}
              </ActivityDetailsBody>
            )
          }
        ]}
      />
    </ActivityDetailsCard>
  );
};
