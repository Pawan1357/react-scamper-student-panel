import { FileImageOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Space } from 'antd';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import { LabeledTitle } from 'components/common/LabeledTitle';

import { OverviewBody, OverviewCard } from './OverviewSection.styled';
import { ImageWithTitleWrapper } from './style';
import type { OverviewSectionProps } from './types';

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  overview,
  imageType = ImageTypeEnum.CHAPTER,
  nameLabel = 'Chapter name',
  altText
}) => {
  const thumbnail = overview?.thumbnail;
  const name = overview?.name || 'Name not available';
  const link = overview?.link;
  const description = overview?.description || '';

  return (
    <OverviewCard bordered={false}>
      <OverviewBody>
        <ImageWithTitleWrapper>
          {thumbnail ? (
            <Image
              width={140}
              height={140}
              style={{ objectFit: 'contain', borderRadius: 8 }}
              src={`${IMAGE_URL}scamper/${imageType}/${thumbnail}`}
              alt={altText || `${name} cover`}
              preview={false}
            />
          ) : (
            <Avatar size={140} shape="square" icon={<FileImageOutlined />} />
          )}

          <div className="flex-gap-4 flex-column">
            <LabeledTitle label={nameLabel} title={name} />
            {link && <LabeledTitle label="Link" link={link} />}
          </div>
        </ImageWithTitleWrapper>
        <Col>
          <Space className="w-100" direction="vertical" size={20}>
            <p
              className="tiptap-content-view"
              dangerouslySetInnerHTML={{ __html: description || '' }}
            />
          </Space>
        </Col>
      </OverviewBody>
    </OverviewCard>
  );
};
