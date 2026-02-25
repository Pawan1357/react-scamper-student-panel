import { useCallback, useMemo, useRef, useState } from 'react';

import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Switch, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useSearchParams } from 'react-router-dom';

import { ICommonPagination } from 'utils/Types';
import { IMAGE_URL, INPUTS } from 'utils/constants';
import { TITLES } from 'utils/constants';
import { ImageTypeEnum, PAGE_LIMIT } from 'utils/constants/enum';
import { ROUTES } from 'utils/constants/routes';
import { buildSearchParams, debounce, getInitials } from 'utils/functions';

import { chapterHooks } from 'services/chapter';
import { Classroom, IStudentChapterListItem } from 'services/chapter/types';

import { RenderSearchInput } from 'components/common/FormField';
import HeaderToolbar from 'components/common/HeaderToolbar';
import Meta from 'components/common/Meta';
import { StatusTag } from 'components/common/StatusTag';
import { CHAPTER_TAG_COLOR } from 'components/common/StatusTag/types';
import { CommonTable } from 'components/common/Table';
import EmptyState from 'components/common/Table/EmptyState';

import { DashboardWrapper, IconWrapper, TabWrapper } from './style';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize args from URL params
  const initialArgs: ICommonPagination = {
    page: Number(searchParams.get('page')) || PAGE_LIMIT.PAGE,
    limit: Number(searchParams.get('limit')) || PAGE_LIMIT.LIMIT,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || '',
    type: searchParams.get('tab') === 'pastChapters' ? 'past' : 'current'
  };

  // Initialize active tab from URL or default
  const initialTab = searchParams.get('tab') || 'myChapters';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  // Use ref to store current tab so debounced function always has latest value
  const activeTabRef = useRef<string>(initialTab);

  // Initialize search from URL params
  const initialSearch = initialArgs.search || '';
  const [myChaptersSearch, setMyChaptersSearch] = useState<string>(
    initialTab === 'myChapters' ? initialSearch : ''
  );
  const [pastChaptersSearch, setPastChaptersSearch] = useState<string>(
    initialTab === 'pastChapters' ? initialSearch : ''
  );

  // Get search value for active tab
  const currentSearch = activeTab === 'myChapters' ? myChaptersSearch : pastChaptersSearch;

  const [args, setArgs] = useState<ICommonPagination>(initialArgs);

  // Function to update both args and URL params
  const updateParamsAndArgs = useCallback(
    (patch: Partial<ICommonPagination>) => {
      setArgs((prev) => {
        // Always include type based on current tab
        const type = activeTabRef.current === 'pastChapters' ? 'past' : 'current';
        const merged = { ...prev, ...patch, type };
        const newSearchParams = buildSearchParams(merged);
        // Use ref to get current tab value (always up-to-date)
        newSearchParams.set('tab', activeTabRef.current);
        setSearchParams(newSearchParams, { replace: true });
        return merged;
      });
    },
    [setSearchParams]
  );

  // Debounced search handler - uses ref to always get current tab
  const debouncedSearch = useRef(
    debounce((searchValue: string) => {
      updateParamsAndArgs({ search: searchValue.trim(), page: 1 });
    })
  ).current;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Update the search state for the active tab
      if (activeTab === 'myChapters') {
        setMyChaptersSearch(value);
      } else {
        setPastChaptersSearch(value);
      }

      // Debounce the API call
      debouncedSearch(value);
    },
    [activeTab, debouncedSearch]
  );

  // Initial args function for tab reset
  const getInitialArgsForTab = useCallback((tab?: string): ICommonPagination => {
    const currentTab = tab || activeTabRef.current;
    return {
      page: PAGE_LIMIT.PAGE,
      limit: PAGE_LIMIT.LIMIT,
      search: '',
      sort_by: '',
      sort_order: '',
      type: currentTab === 'pastChapters' ? 'past' : 'current'
    };
  }, []);

  // Handle tab change - reset search for new tab and clear query params
  const handleTabChange = useCallback(
    (key: string) => {
      setActiveTab(key);
      // Update ref immediately so debounced functions use correct tab
      activeTabRef.current = key;

      // Clear search for the new tab
      if (key === 'myChapters') {
        setMyChaptersSearch('');
      } else {
        setPastChaptersSearch('');
      }

      // Reset query params when switching tabs - only keep tab param
      const resetParams = new URLSearchParams();
      resetParams.set('tab', key);
      setSearchParams(resetParams, { replace: true });

      // Reset args with initial values including type based on tab - this will trigger API call with initial args
      setArgs(getInitialArgsForTab(key));
    },
    [getInitialArgsForTab, setSearchParams]
  );

  const { data, isLoading } = chapterHooks.StudentChapterList(args, activeTab);

  const myChaptersColumns: ColumnsType<IStudentChapterListItem> = useMemo(
    () => [
      {
        title: <div style={{ textAlign: 'center' }}>Chapter</div>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (name: string, record) =>
          name ? (
            <Link className="table-link" to={ROUTES.chapter.viewChapter(String(record.id))}>
              {name}
            </Link>
          ) : (
            '-'
          )
      },
      {
        title: 'Lessons',
        dataIndex: 'lesson_count',
        align: 'center',
        render: (val) => <StatusTag color={CHAPTER_TAG_COLOR.LESSON} status={val > 0 ? val : 0} />
      },
      {
        title: 'Skill Checks',
        dataIndex: 'activity_count',
        align: 'center',
        render: (val) => <StatusTag color={CHAPTER_TAG_COLOR.ACTIVITY} status={val > 0 ? val : 0} />
      },
      {
        title: 'Class',
        dataIndex: 'classroom',
        key: 'classroom',
        align: 'center',
        render: (v: Classroom) => v?.name || '-'
      },
      {
        title: 'Classroom Economy',
        dataIndex: 'economy',
        key: 'economy',
        align: 'center',
        render: (v: boolean) => (
          <Switch
            checked={!!v}
            checkedChildren="Yes"
            unCheckedChildren="No"
            disabled
            size="small"
            style={{ backgroundColor: v ? '#389E0D' : undefined }}
          />
        )
      },
      {
        title: <div style={{ textAlign: 'center' }}>Teacher</div>,
        dataIndex: 'teacher',
        key: 'teacher',
        render: (_: any, record: IStudentChapterListItem) => {
          const teacher = record?.teacher;
          const fullName = `${teacher?.first_name || ''} ${teacher?.last_name || ''}`.trim() || '-';
          const initials = getInitials(teacher?.first_name, teacher?.last_name);
          const profilePhotoUrl = teacher?.profile_photo
            ? `${IMAGE_URL}scamper/${ImageTypeEnum.TEACHER}/${teacher.profile_photo}`
            : undefined;

          return (
            <Space>
              {profilePhotoUrl ? (
                <Avatar className="teacher-table-avatar" size={32} src={profilePhotoUrl} />
              ) : (
                <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
                  {initials}
                </Avatar>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontWeight: 500 }}>{fullName}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{teacher?.email || '-'}</span>
              </div>
            </Space>
          );
        }
      }
    ],
    []
  );

  const pastChaptersColumns: ColumnsType<IStudentChapterListItem> = useMemo(
    () => [
      {
        title: <div style={{ textAlign: 'center' }}>Chapter</div>,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (name: string, record) =>
          name ? (
            <Link className="table-link" to={ROUTES.chapter.viewChapter(String(record.id))}>
              {name}
            </Link>
          ) : (
            '-'
          )
      },
      {
        title: 'Lessons',
        dataIndex: 'lesson_count',
        align: 'center',
        render: (val) => <StatusTag color={CHAPTER_TAG_COLOR.LESSON} status={val > 0 ? val : 0} />
      },
      {
        title: 'Skill Checks',
        dataIndex: 'activity_count',
        align: 'center',
        render: (val) => <StatusTag color={CHAPTER_TAG_COLOR.ACTIVITY} status={val > 0 ? val : 0} />
      },
      {
        title: 'Class',
        dataIndex: 'classroom',
        key: 'classroom',
        align: 'center',
        render: (v: Classroom) => v?.name || '-'
      },
      {
        title: 'Classroom Economy',
        dataIndex: 'economy',
        key: 'economy',
        align: 'center',
        render: (v: boolean) => (
          <Switch
            checked={!!v}
            checkedChildren="Yes"
            unCheckedChildren="No"
            disabled
            size="small"
            style={{ backgroundColor: v ? '#389E0D' : undefined }}
          />
        )
      },
      {
        title: <div style={{ textAlign: 'center' }}>Teacher</div>,
        dataIndex: 'teacher',
        key: 'teacher',
        render: (_: any, record: IStudentChapterListItem) => {
          const teacher = record?.teacher;
          const fullName = `${teacher?.first_name || ''} ${teacher?.last_name || ''}`.trim() || '-';
          const initials = getInitials(teacher?.first_name, teacher?.last_name);
          const profilePhotoUrl = teacher?.profile_photo
            ? `${IMAGE_URL}scamper/${ImageTypeEnum.TEACHER}/${teacher.profile_photo}`
            : undefined;

          return (
            <Space>
              {profilePhotoUrl ? (
                <Avatar className="teacher-table-avatar" size={32} src={profilePhotoUrl} />
              ) : (
                <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
                  {initials}
                </Avatar>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontWeight: 500 }}>{fullName}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{teacher?.email || '-'}</span>
              </div>
            </Space>
          );
        }
      },
      {
        title: 'Final Rubrics',
        dataIndex: 'finalRubrics',
        key: 'finalRubrics',
        align: 'center',
        render: (v: number | null | undefined) => (typeof v === 'number' ? v : '-')
      },
      {
        title: 'Point Scored',
        dataIndex: 'pointsScored',
        key: 'pointsScored',
        align: 'center',
        render: (v: number | null | undefined) => (typeof v === 'number' ? v : '-')
      }
    ],
    []
  );

  const handleTableChange = (pagination: any) => {
    updateParamsAndArgs({
      page: pagination.current || PAGE_LIMIT.PAGE,
      limit: pagination.pageSize || PAGE_LIMIT.LIMIT
    });
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'myChapters',
      label: 'My Chapters',
      children: (
        <div className="shadow-paper">
          <CommonTable
            bordered
            columns={myChaptersColumns}
            dataSource={data?.chapter_list || []}
            pagination={{
              current: args.page || PAGE_LIMIT.PAGE,
              pageSize: args.limit || PAGE_LIMIT.LIMIT,
              total: data?.total_records || 0
            }}
            emptyText={
              <EmptyState
                isEmpty={data?.chapter_list?.length === 0}
                search={args.search}
                defaultDescription="No chapters available"
                searchDescription="No chapters found"
              />
            }
            onChange={handleTableChange}
            loading={isLoading}
          />
        </div>
      )
    },
    {
      key: 'pastChapters',
      label: 'Past Chapters',
      children: (
        <div className="shadow-paper">
          <CommonTable
            bordered
            columns={pastChaptersColumns}
            dataSource={data?.chapter_list || []}
            pagination={{
              current: args.page || PAGE_LIMIT.PAGE,
              pageSize: args.limit || PAGE_LIMIT.LIMIT,
              total: data?.total_records || 0
            }}
            onChange={handleTableChange}
            emptyText={
              <EmptyState
                isEmpty={data?.chapter_list?.length === 0}
                search={args.search}
                defaultDescription="No past chapters available"
                searchDescription="No past chapters found"
              />
            }
            loading={isLoading}
          />
        </div>
      )
    }
  ];

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.DASHBOARD}`} />
      <DashboardWrapper>
        <HeaderToolbar title={TITLES.DASHBOARD} />
        <RenderSearchInput
          inputProps={{
            value: currentSearch,
            size: 'large',
            onChange: handleSearchChange,
            placeholder: INPUTS.PLACEHOLDER.SEARCH,
            prefix: (
              <IconWrapper>
                <SearchOutlined />
              </IconWrapper>
            )
          }}
        />

        <TabWrapper>
          <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} />
        </TabWrapper>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
