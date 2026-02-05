import React, { useState } from 'react';

import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { IDeleteRecordModalProps } from '../types';
import CommonModal from './CommonModal';

const DeleteRecordModal = (props: IDeleteRecordModalProps) => {
  const {
    btnDisabled,
    btnIcon = <DeleteOutlined />,
    closeIcon = <CloseCircleOutlined />,
    cancelText = 'No',
    okText = 'Yes'
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleModalOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen(false);
    props.onOk?.(e);
  };

  return (
    <>
      <Button
        title={`Delete this ${props.itemName}`}
        type="primary"
        size="small"
        className="cta_btn table_cta_btn"
        icon={btnIcon}
        onClick={handleDeleteClick}
        disabled={btnDisabled}
      />
      <CommonModal
        {...props}
        open={isModalOpen}
        closeIcon={closeIcon}
        className={`${props.className} delete-modal`}
        closable={true}
        centered={true}
        title={props.title ?? `Delete ${props.itemName}`}
        onCancel={handleModalCancel}
        cancelText={cancelText}
        okText={okText}
        onOk={handleModalOk}
      >
        <p>Are you sure you want to delete this {props.itemName}?</p>
      </CommonModal>
    </>
  );
};
export default DeleteRecordModal;
