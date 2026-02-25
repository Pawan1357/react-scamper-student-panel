import { Button, Empty, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { formatDate } from 'utils/constants/day';
import { ROUTES } from 'utils/constants/routes';
import { questionType } from 'utils/functions';

import { HourGlassIcon, LockedIcon } from 'components/svg';

import { StatusTag } from '../StatusTag';
import { STATUS_TAG_COLOR } from '../StatusTag/types';
import { CurriculamItem, CurriculamList } from './styles';
import type { CurriculumItemCardProps } from './types';

const { Text, Title } = Typography;

const CurriculumItemCard = ({
  listData,
  btnText,
  isDetailIcon,
  isActivity,
  showStatusBadge = false
}: CurriculumItemCardProps) => {
  const navigate = useNavigate();
  const getActivityRoute = (activityId: string) => {
    return ROUTES.chapter.viewActivity(activityId);
  };

  // const getLessonRoute = (lessonId: string) => {
  //   return ROUTES.chapter.viewLesson(lessonId);
  // };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return STATUS_TAG_COLOR.SUCCESS_PRIMARY; // Green
      case 'pending':
        return STATUS_TAG_COLOR.DANGER; // Red
      case 'in_progress':
        return STATUS_TAG_COLOR.PENDING; // Orange
      default:
        return STATUS_TAG_COLOR.GRAY;
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'Complete';
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      default:
        return status || 'Complete';
    }
  };

  return (
    <CurriculamList>
      {listData?.length ? (
        listData?.map((data: any) => (
          <CurriculamItem key={data?.id} role="article" aria-labelledby={`${data?.id}-title`}>
            <div className="curriculam-inner">
              <div className="curriculam-details-wrapper">
                {isActivity ? (
                  <div className="title-with-badge">
                    <Title id={`${data?.id}-title`} level={4} style={{ margin: 0 }}>
                      {data?.name}
                    </Title>
                    {showStatusBadge && data?.status && (
                      <StatusTag
                        status={getStatusText(data.status)}
                        color={getStatusColor(data.status)}
                      />
                    )}
                  </div>
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
                        {data?.activity_count} Skill Checks
                      </Text>
                    )}
                    {isActivity && (
                      <>
                        <Text className="curriculam-detail-item">
                          Skill Check Type
                          <span className="value-text"> {questionType(data?.type)}</span>
                        </Text>

                        <Text className="curriculam-detail-item">
                          Total Score:{' '}
                          <span className="value-text"> {data?.total_score || 0} Points</span>
                        </Text>

                        <Text className="curriculam-detail-item">
                          Skill Check Created Date:{' '}
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
                disabled={!isActivity && data?.is_locked}
                icon={!isActivity && data?.is_locked ? <LockedIcon /> : null}
                onClick={() => {
                  if (isActivity) {
                    // `showStatusBadge` is purely UI; routing to past vs current depends only on `isPastContext`
                    window.location.href = getActivityRoute(String(data?.id));
                    // navigate(ROUTES.chapter.viewActivity(String(data?.id)));
                  } else {
                    // window.location.href = getLessonRoute(String(data?.id));
                    navigate(ROUTES.chapter.viewLesson(String(data?.id)));
                  }
                }}
                aria-label={`View ${data?.name || 'lesson'} skill checks`}
              >
                {!isActivity && data?.is_locked ? 'Locked' : btnText}
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
