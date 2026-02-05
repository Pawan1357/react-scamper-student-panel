import React, { useState } from 'react';

import { Button, Typography } from 'antd';

import { ExclamationIcon } from 'components/svg';

import { IConfirmModalProps } from '../types';
import CommonModal from './CommonModal';

const ConfirmModal: React.FC<IConfirmModalProps> = (props) => {
  const { modalProps, buttonProps } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isControlled = modalProps?.open !== undefined;
  const modalOpen = isControlled ? modalProps.open || false : isModalOpen;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setIsModalOpen(open);
    }
    modalProps?.onOpenChange?.(open);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleOpenChange(false);
    modalProps?.onCancel?.(e);
  };

  const onOkClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await modalProps?.onOk?.(e);
      // handleOpenChange(false);
    } catch (error) {
      console.error('Failed:', error);
      return Promise.reject();
    }
  };

  return (
    <React.Fragment>
      {!isControlled && (
        <Button
          {...buttonProps}
          type="link"
          block={true}
          className="cta-btn"
          onClick={() => handleOpenChange(true)}
        />
      )}
      <CommonModal
        {...modalProps}
        width={415}
        open={modalOpen}
        onCancel={onCancelClick}
        onOk={onOkClick}
        title={null}
        centered={true}
        closable={false}
        maskClosable={false}
        className={`delete-modal ${modalProps.className || ''}`}
        cancelButtonProps={{ ...modalProps.cancelButtonProps, className: 'cta-btn cancel-btn' }}
        okButtonProps={{ ...modalProps.okButtonProps, className: 'cta-btn ok-btn' }}
        children={
          <div className="modal-body-wrap">
            <picture className="modal-icon-wrap">{modalProps.icon || <ExclamationIcon />}</picture>
            {modalProps.title && (
              <Typography.Title className="modal-title" level={5}>
                {modalProps.title}
              </Typography.Title>
            )}
            {modalProps.question && <p className="modal-question">{modalProps.question}</p>}
            {modalProps.description &&
              (typeof modalProps.description === 'string' ? (
                <Typography.Text className="modal-desc">{modalProps.description}</Typography.Text>
              ) : (
                <div className="modal-desc">{modalProps.description}</div>
              ))}
          </div>
        }
      />
    </React.Fragment>
  );
};

export default ConfirmModal;
