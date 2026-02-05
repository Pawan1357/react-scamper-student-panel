import React, { useCallback, useMemo, useRef, useState } from 'react';

import { DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ICommonPagination } from 'utils/Types';
import { INPUTS } from 'utils/constants';
import { formatDate } from 'utils/constants/day';
import { PAGE_LIMIT } from 'utils/constants/enum';
import { ROUTES } from 'utils/constants/routes';
import {
  buildSearchParams,
  capitalizeFirst,
  debounce,
  getAntDSortOrder,
  getSortOrder,
  showToaster
} from 'utils/functions';

import { contactHooks, contactQueryKeys } from 'services/contactUs';
import { IContactUsListRes } from 'services/contactUs/types';

import { RenderSearchInput } from 'components/common/FormField';
import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import ConfirmModal from 'components/common/Modal/components/ConfirmModal';
import { CommonTable } from 'components/common/Table';
import EmptyState from 'components/common/Table/EmptyState';

import { ContactWrapper, IconWrapper } from './ContactTable.styles';

function useContactTableState(initialSearchParams: URLSearchParams) {
  const initialArgs: ICommonPagination = {
    page: Number(initialSearchParams.get('page')) || PAGE_LIMIT.PAGE,
    limit: Number(initialSearchParams.get('limit')) || PAGE_LIMIT.LIMIT,
    search: initialSearchParams.get('search') || '',
    sort_by: initialSearchParams.get('sort_by') || '',
    sort_order: initialSearchParams.get('sort_order') || ''
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

const ContactTable: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // encapsulate table/search state
  const {
    args,
    setArgs: updateArgs,
    searchVal,
    onSearchChange
  } = useContactTableState(searchParams);

  const { data, isLoading } = contactHooks.ContactList(args);
  const { mutate: mutateDeleteContacts, isPending: isDeleting } = contactHooks.useDeleteContacts();

  const isEmpty = !data?.contact_us_list?.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return '#68A729';
      case 'pending':
        return '#FA751C';
      case 'delete':
        return 'red';
      default:
        return 'default';
    }
  };

  const handleView = useCallback(
    (record: IContactUsListRes) => {
      navigate(ROUTES.contact.viewContactUs(String(record.id)));
    },
    [navigate]
  );

  const truncateText = (text: string, maxLength: number = 200) => {
    if (!text || text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  const columns: ColumnsType<IContactUsListRes> = useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'center',
        width: 300,
        render: (title: string) => {
          const text = title || '-';
          const truncated = truncateText(text, 200);
          return text?.length > 200 ? <span>{truncated}</span> : <span>{text}</span>;
        }
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 400,
        align: 'center',
        render: (description: string) => {
          const text = description || '-';
          const truncated = truncateText(text, 200);
          return text?.length > 200 ? <span>{truncated}</span> : <span>{text}</span>;
        }
      },
      {
        title: 'Response',
        dataIndex: 'response',
        key: 'response',
        width: 400,
        align: 'center',
        render: (response: any) => {
          const text = response ? String(response) : '-';
          const truncated = truncateText(text, 200);
          return text?.length > 200 ? <span>{truncated}</span> : <span>{text}</span>;
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'status'),
        render: (status: string) => (
          <Tag
            style={{
              color: '#ffffff',
              borderRadius: '11px',
              padding: '1px 8px',
              backgroundColor: getStatusColor(status)
            }}
          >
            {status ? capitalizeFirst(status) : '-'}
          </Tag>
        )
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'created_at'),
        render: (date: string) => formatDate(date)
      },
      {
        title: 'Action',
        key: 'actions',
        align: 'center',
        render: (_: any, record: IContactUsListRes) => (
          <Button
            type="primary"
            title="View"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
        )
      }
    ],
    [args?.sort_by, args?.sort_order, handleView]
  );

  const handleTableChange = (
    pagination: any,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IContactUsListRes> | SorterResult<IContactUsListRes>[]
  ) => {
    if (Array.isArray(sorter)) return;

    updateArgs({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? PAGE_LIMIT.LIMIT,
      sort_by: sorter.order ? String(sorter.field) : '',
      sort_order: getSortOrder(sorter.order) || ''
    });
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) return;
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRowKeys.length === 0) return;

    const ids = selectedRowKeys.map((key) => Number(key));

    mutateDeleteContacts(
      { ids },
      {
        onSuccess: (response) => {
          showToaster('success', response?.message || 'Contacts deleted successfully');
          queryClient.invalidateQueries({ queryKey: contactQueryKeys.all });
          setSelectedRowKeys([]);
          setIsDeleteModalOpen(false);
        },
        onError: (error) => {
          showToaster('error', error?.message || 'Failed to delete contacts');
        }
      }
    );
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCreate = () => {
    navigate(ROUTES.contact.add);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
    preserveSelectedRowKeys: true // Preserve selections across pagination
  };

  const headerButtons = (
    <>
      {selectedRowKeys?.length ? (
        <Button
          type="default"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          style={{ marginRight: '5px' }}
        >
          Delete
        </Button>
      ) : null}
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
        Create
      </Button>
    </>
  );

  return (
    <>
      {isLoading && <Loader />}
      <HeaderToolbar title="Contact Admin" button={headerButtons} isMultipleBtn />

      <ContactWrapper>
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
            dataSource={data?.contact_us_list || []}
            rowSelection={rowSelection}
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
                searchDescription="No Contact Requests Found"
              />
            }
          />
        </div>
      </ContactWrapper>

      <ConfirmModal
        modalProps={{
          open: isDeleteModalOpen,
          onOpenChange: (open) => !open && handleDeleteCancel(),
          question: `Delete`,
          description: `Are you sure you want to delete selected contact requests?`,
          onOk: handleDeleteConfirm,
          onCancel: handleDeleteCancel,
          cancelText: 'No',
          okText: 'Yes',
          okButtonProps: { loading: isDeleting, disabled: isDeleting },
          cancelButtonProps: { disabled: isDeleting }
        }}
      />
    </>
  );
};

export default ContactTable;
