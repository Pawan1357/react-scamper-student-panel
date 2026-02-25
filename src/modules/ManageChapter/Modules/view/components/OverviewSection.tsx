import { FileImageOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Space } from 'antd';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';

import { LabeledTitle } from 'components/common/LabeledTitle';

import { OverviewBody, OverviewCard } from '../ViewChapter.styled';
import { ImageWithTitleWrapper } from '../style';
import type { OverviewSectionProps } from '../types';

export const OverviewSection: React.FC<OverviewSectionProps> = ({ overview }) => {
  return (
    <OverviewCard bordered={false}>
      <OverviewBody>
        <ImageWithTitleWrapper>
          {overview?.thumbnail ? (
            <Image
              width={140}
              height={140}
              style={{ objectFit: 'contain', borderRadius: 8 }}
              src={`${IMAGE_URL}scamper/${ImageTypeEnum.CHAPTER}/${overview?.thumbnail}`}
              alt={`${overview?.name} cover`}
              preview={false}
            />
          ) : (
            <Avatar size={140} shape="square" icon={<FileImageOutlined />} />
          )}

          <div className="flex-gap-4 flex-column">
            <LabeledTitle label="Chapter" title={overview?.name || 'Name not available'} />
            <LabeledTitle label="Link" link={overview?.link || ''} />
          </div>
        </ImageWithTitleWrapper>
        <Col>
          <Space className="w-100" direction="vertical" size={20}>
            <p
              className="tiptap-content-view"
              style={{ fontSize: '16px', fontWeight: '400', lineHeight: '24px' }}
              dangerouslySetInnerHTML={{ __html: overview?.description || '' }}
            />
          </Space>
        </Col>
      </OverviewBody>
    </OverviewCard>
  );
};
