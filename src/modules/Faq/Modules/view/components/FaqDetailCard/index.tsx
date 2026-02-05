import { Carousel, Col, Empty, Row, Tag } from 'antd';

import { formatDate } from 'utils/constants/day';
import { ImageTypeEnum } from 'utils/constants/enum';

import { IGetFaqRes } from 'services/faq/types';

import { LabeledTitle } from 'components/common/LabeledTitle';
import CommonMedia from 'components/common/Media/CommonMedia';
import { defaultCarouselSettings } from 'components/common/Media/carouselSettings';

import {
  FaqDetailBody,
  FaqDetailCardWrapper,
  FaqMetadata,
  FaqTitle,
  MediaSection
} from './FaqDetailCard.styled';

interface IFaqDetailCardProps {
  faqData?: IGetFaqRes | null;
}

const getFaqForColor = (value: string) => {
  if (value === 'teacher') return 'blue';
  if (value === 'student') return 'green';
  return 'default';
};

const getFaqForLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const FaqDetailCard: React.FC<IFaqDetailCardProps> = ({ faqData }) => {
  if (!faqData) {
    return null;
  }

  return (
    <FaqDetailCardWrapper>
      <FaqDetailBody>
        <FaqTitle level={2}>{faqData.title}</FaqTitle>

        <FaqMetadata>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <LabeledTitle label="Category" title={faqData?.faq_category?.name || '-'} />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div>
                <div
                  style={{ marginBottom: 5, fontSize: '14px', fontWeight: 500, color: '#6a6a6a' }}
                >
                  For
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {faqData?.faqs_for?.map((item) => (
                    <Tag key={item} color={getFaqForColor(item)}>
                      {getFaqForLabel(item)}
                    </Tag>
                  )) || '-'}
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <LabeledTitle label="Created Date" title={formatDate(faqData?.created_at) || '-'} />
            </Col>
          </Row>
        </FaqMetadata>

        {faqData.media && faqData.media.length > 0 ? (
          <MediaSection>
            <CommonMedia
              mode="gallery"
              Carousel={Carousel}
              data={faqData.media}
              urlName={ImageTypeEnum.FAQ}
              itemsPerSlide={4}
              carouselSettings={defaultCarouselSettings}
            />
          </MediaSection>
        ) : (
          <Empty description="No media available" />
        )}

        {faqData?.description ? (
          <div>
            <p
              style={{ fontSize: '16px', fontWeight: '400', lineHeight: '24px' }}
              dangerouslySetInnerHTML={{ __html: faqData.description }}
            />
          </div>
        ) : null}
      </FaqDetailBody>
    </FaqDetailCardWrapper>
  );
};
