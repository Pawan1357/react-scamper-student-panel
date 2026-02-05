import { Button, Empty, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { formatDate } from 'utils/constants/day';
import { ROUTES } from 'utils/constants/routes';
import { questionType } from 'utils/functions';

import { HourGlassIcon } from 'components/svg';

import { CurriculamItem, CurriculamList } from './styles';
import type { CurriculumItemCardProps } from './types';

const { Text, Title } = Typography;

const CurriculumItemCard = ({
  listData,
  btnText,
  isDetailIcon,
  isActivity
}: CurriculumItemCardProps) => {
  const navigate = useNavigate();

  const getActivityRoute = (activityId: string) => {
    return ROUTES.chapter.viewActivity(activityId);
  };

  return (
    <CurriculamList>
      {listData?.length ? (
        listData?.map((data: any) => (
          <CurriculamItem key={data?.id} role="article" aria-labelledby={`${data?.id}-title`}>
            <div className="curriculam-inner">
              <div className="curriculam-details-wrapper">
                {isActivity ? (
                  <Title id={`${data?.id}-title`} level={4}>
                    {data?.name}
                  </Title>
                ) : (
                  <Title id={`${data?.id}-title`} level={4}>
                    Lesson {data?.sequence}: <span style={{ fontWeight: 400 }}>{data?.name}</span>
                  </Title>
                )}
                <div className="curriculam-details">
                  <div className="curriculam-detail">
                    {isDetailIcon && (
                      <span className="anticon ant-menu-item-icon">
                        <HourGlassIcon />
                      </span>
                    )}
                    {!isActivity && (
                      <Text className="curriculam-detail-item">
                        {data?.activities_count} Activities
                      </Text>
                    )}
                    {isActivity && (
                      <>
                        <Text className="curriculam-detail-item">
                          Activities Type:{' '}
                          <span className="value-text"> {questionType(data?.type)}</span>
                        </Text>

                        <Text className="curriculam-detail-item">
                          Total Score:{' '}
                          <span className="value-text"> {data?.total_score || 0} Points</span>
                        </Text>

                        <Text className="curriculam-detail-item">
                          Activity Created Date:{' '}
                          <span className="value-text">
                            {formatDate(data?.created_at, 'MM/DD/YYYY')}
                          </span>
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                size="large"
                className="border-md"
                onClick={() =>
                  isActivity
                    ? navigate(getActivityRoute(String(data?.id)))
                    : navigate(`${ROUTES.chapter.viewLesson(String(data?.id))}`)
                }
                aria-label={`View ${data?.name || 'lesson'} activities`}
              >
                {btnText}
              </Button>
            </div>
          </CurriculamItem>
        ))
      ) : (
        <Empty description="No data Found" />
      )}
    </CurriculamList>
  );
};

export default CurriculumItemCard;
