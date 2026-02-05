import React, { useCallback, useMemo, useRef, useState } from 'react';

import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import { ICommonPagination } from 'utils/Types';
import { IMAGE_URL, INPUTS, TITLES } from 'utils/constants';
import { formatDate } from 'utils/constants/day';
import { ImageTypeEnum, PAGE_LIMIT } from 'utils/constants/enum';
import { ROUTES } from 'utils/constants/routes';
import { buildSearchParams, debounce, getAntDSortOrder, getSortOrder } from 'utils/functions';

import { faqHooks } from 'services/faq';

import { RenderSearchInput } from 'components/common/FormField';
import HeaderToolbar from 'components/common/HeaderToolbar';
import Meta from 'components/common/Meta';
import RenderActionCell from 'components/common/RenderActionCell';
import { CommonTable } from 'components/common/Table';
import EmptyState from 'components/common/Table/EmptyState';

import { FaqWrapper, IconWrapper } from './FaqTable.styles';

interface IFaqListItem {
  id: string;
  title: string;
  category?: string;
  faq_category?: { name: string };
  thumbnail?: string;
  updated_at?: string;
  created_at?: string;
  updated_user?: {
    first_name?: string;
    last_name?: string;
  };
}

function useFaqTableState(initialSearchParams: URLSearchParams) {
  const initialArgs: ICommonPagination = {
    page: Number(initialSearchParams.get('page')) || PAGE_LIMIT.PAGE,
    limit: Number(initialSearchParams.get('limit')) || PAGE_LIMIT.LIMIT,
    search: initialSearchParams.get('search') || '',
    sort_by: initialSearchParams.get('sort_by') || '',
    sort_order: initialSearchParams.get('sort_order') || '',
    type: 'student'
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [args, setArgs] = useState<ICommonPagination>(initialArgs);
  const [searchVal, setSearchVal] = useState<string>(initialArgs.search || '');

  const updateParamsAndArgs = useCallback(
    (patch: Partial<ICommonPagination>) => {
      setArgs((prev) => {
        const merged = { ...prev, ...patch };
        setSearchParams(buildSearchParams(merged), { replace: true });
        return merged;
      });
    },
    [setSearchParams]
  );

  // debounce search
  const debouncedSearch = useRef(
    debounce((v: string) => updateParamsAndArgs({ search: v?.trim(), page: 1 }))
  ).current;

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setSearchVal(v);
      debouncedSearch(v);
    },
    [debouncedSearch]
  );

  return {
    args,
    setArgs: updateParamsAndArgs,
    searchVal,
    onSearchChange,
    rawSearchParams: searchParams
  };
}

const FaqTable: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];

  // encapsulate table/search state
  const { args, setArgs: updateArgs, searchVal, onSearchChange } = useFaqTableState(searchParams);

  const { data, isLoading } = faqHooks.FaqList(args);

  const isEmpty = !data?.faqs_list?.length;

  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  //   if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore && !isLoading) {
  //     setCategoryArgs((prev: any) => ({
  //       ...prev,
  //       page: prev.page + 1
  //     }));
  //   }
  // };

  // const debouncedSearch = useMemo(
  //   () =>
  //     debounce((val: string) => {
  //       if (val.length >= 3 || val.length === 0) {
  //         setCategoryArgs((prev) => ({
  //           ...prev,
  //           page: 1,
  //           search: val
  //         }));
  //       }
  //     }),
  //   []
  // );

  // table columns

  const columns: ColumnsType<IFaqListItem> = useMemo(
    () => [
      {
        title: 'Cover Image',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'center',
        width: 120,
        render: (thumbnail: string) => {
          if (thumbnail) {
            return (
              <Image
                preview={false}
                width={42}
                height={30}
                src={`${IMAGE_URL}scamper/${ImageTypeEnum.FAQ}/${thumbnail}`}
                alt="cover-image"
                fallback="/icons/error.png"
              />
            );
          }
          return (
            <Image
              preview={false}
              width={42}
              height={30}
              src="/icons/error.png"
              alt="cover-image"
            />
          );
        }
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'center',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'title'),
        render: (title: string) => <span>{title || '-'}</span>
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'category'),
        render: (_: any, record: IFaqListItem) => <span>{record.faq_category?.name || '-'}</span>
      },
      {
        title: 'Last Updated on',
        dataIndex: 'updated_at',
        key: 'updated_at',
        align: 'center',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'updated_at'),
        render: (date: string) => (date ? formatDate(date) : '-')
      },
      {
        title: 'Last Updated by',
        dataIndex: 'updated_user',
        key: 'updated_user',
        align: 'center',
        render: (user: IFaqListItem['updated_user']) =>
          user ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() || '-' : '-'
      },
      {
        title: 'Action',
        key: 'actions',
        align: 'center',
        render: (_, record: IFaqListItem) => (
          <RenderActionCell>
            <Button
              type="primary"
              title="View"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate(ROUTES.faq.viewFaq(String(record?.id)))}
            />
          </RenderActionCell>
        )
      }
    ],
    [args?.sort_by, args?.sort_order, navigate]
  );

  // table change handler
  const handleTableChange = (
    pagination: any,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IFaqListItem> | SorterResult<IFaqListItem>[]
  ) => {
    if (Array.isArray(sorter)) return;

    updateArgs({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? PAGE_LIMIT.LIMIT,
      sort_by: sorter.order ? String(sorter.field) : '',
      sort_order: getSortOrder(sorter.order) || ''
    });
  };

  return (
    <>
      <Meta title={`${TITLES.COMMON} - FAQs`} />
      <FaqWrapper>
        <HeaderToolbar title="FAQs" />
        <RenderSearchInput
          inputProps={{
            value: searchVal,
            size: 'large',
            onChange: onSearchChange,
            placeholder: INPUTS.PLACEHOLDER.SEARCH,
            prefix: (
              <IconWrapper>
                <SearchOutlined />
              </IconWrapper>
            )
          }}
        />

        <div className="shadow-paper">
          <CommonTable
            bordered
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={data?.faqs_list || []}
            pagination={{
              current: args.page ?? PAGE_LIMIT.PAGE,
              pageSize: args.limit ?? PAGE_LIMIT.LIMIT,
              total: data?.total_records ?? 0
            }}
            onChange={handleTableChange}
            loading={isLoading}
            emptyText={
              <EmptyState
                isEmpty={isEmpty}
                search={args.search}
                searchDescription="No FAQs Found"
              />
            }
          />
        </div>
      </FaqWrapper>
    </>
  );
};

export default FaqTable;
