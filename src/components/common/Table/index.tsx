import React from 'react';

import { Empty, TablePaginationConfig, TableProps } from 'antd';

import { StyledTable } from './style';

interface CustomProps {
  summaryRow?: React.ReactNode;
  emptyText?: React.ReactNode;
}

export const TableSummaryCell: React.FC<{
  index: number;
  colSpan: number;
  component: React.ReactNode;
}> = ({ index, colSpan, component }) => (
  <StyledTable.Summary.Cell index={index} colSpan={colSpan}>
    {component}
  </StyledTable.Summary.Cell>
);

const defaultPaginationSettings: Partial<TablePaginationConfig> = {
  showSizeChanger: true,
  showQuickJumper: true,
  defaultPageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  size: 'small',
  position: ['bottomRight'],
  showTotal: (total) => `Total ${total} items`
};

export const CommonTable: React.FC<TableProps<any> & CustomProps> = (props) => {
  const { pagination, summaryRow, emptyText } = props;

  return (
    <StyledTable
      size="small"
      {...props}
      pagination={pagination ? { ...defaultPaginationSettings, ...pagination } : false}
      scroll={props.scroll ?? { x: 'max-content' }}
      // TODO : depend on backend response
      rowKey={(record: any) => (record?.id ? record?.id : '')}
      locale={{
        emptyText: emptyText || (
          <Empty
            className="pt-40 pb-40"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`No data added yet.`}
          />
        )
      }}
      summary={
        summaryRow
          ? () => (
              <StyledTable.Summary fixed="top">
                <StyledTable.Summary.Row>{summaryRow}</StyledTable.Summary.Row>
              </StyledTable.Summary>
            )
          : undefined
      }
    />
  );
};
