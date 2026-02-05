import { useEffect, useImperativeHandle, useRef } from 'react';

import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Image, Row, Spin } from 'antd';
import { useProfile } from 'modules/MyAccount/hooks/useProfile';

import { INPUTS, MAX_TEXT_LENGTH, VALIDATION_MESSAGES } from 'utils/constants';

import { RenderTextInput } from 'components/common/FormField';
import { Loader } from 'components/common/Loader';

import { ProfileWrapper } from '../style';

export interface ProfileFormRef {
  submit: () => void;
  cancel: () => void;
  isUpdating: boolean;
}

export const ProfileForm = ({
  isEditMode,
  formRef,
  onUpdatingChange,
  onPendingChange
}: {
  isEditMode: boolean;
  formRef?: React.Ref<ProfileFormRef>;
  onUpdatingChange?: (isUpdating: boolean) => void;
  onPendingChange?: (isPending: boolean) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    form,
    onFieldsChange,
    onSubmit,
    isLoading,
    isPending,
    handleCapitalizedChange,
    handleFileChange,
    imageShow,
    isPreviewVisible,
    setIsPreviewVisible,
    isProfilePicUploadPending,
    handleCancel
  } = useProfile();

  // Disable all interactions while update is pending
  const isUpdating = isPending || isProfilePicUploadPending;

  // Notify parent component of updating state changes
  useEffect(() => {
    onUpdatingChange?.(isUpdating);
  }, [isUpdating, onUpdatingChange]);

  // Notify parent component of pending state (for spinner)
  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  // Expose submit and cancel handlers to parent via ref
  useImperativeHandle(
    formRef,
    () => ({
      submit: () => {
        if (!isUpdating) {
          form.submit();
        }
      },
      cancel: () => {
        if (!isUpdating) {
          handleCancel();
        }
      },
      isUpdating
    }),
    [form, handleCancel, isUpdating]
  );

  const handleAvatarClick = () => {
    if (!isUpdating) {
      fileInputRef.current?.click();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <ProfileWrapper>
      <div className="shadow-paper mt-20">
        <Form onFieldsChange={onFieldsChange} onFinish={onSubmit} form={form} autoComplete="off">
          <div className="relative inline-block text-left profile-pic-container">
            <Spin spinning={isProfilePicUploadPending}>
              {imageShow ? (
                <Image
                  className="border-full"
                  wrapperClassName="image-container"
                  src={imageShow}
                  preview={{
                    visible: isPreviewVisible,
                    onVisibleChange: (visible) => setIsPreviewVisible(visible)
                  }}
                />
              ) : (
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="border-4 border-white shadow-lg cursor-pointer"
                />
              )}
              {isEditMode && (
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  icon={<EditOutlined />}
                  style={{
                    position: 'relative',
                    right: 30,
                    bottom: 16,
                    boxShadow: 'none'
                  }}
                  htmlType="button"
                  onClick={handleAvatarClick}
                  disabled={isUpdating}
                />
              )}
            </Spin>
            <input
              id="avatar-upload"
              name="profile_pic"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={isUpdating}
            />
          </div>
          <Row gutter={[34, 34]} className="d-flex justify-content-center">
            <RenderTextInput
              colProps={{
                md: 12,
                span: 24
              }}
              formItemProps={{
                name: 'first_name',
                label: INPUTS.LABEL.FIRST_NAME,
                required: true,
                rules: [
                  {
                    required: true,
                    message: VALIDATION_MESSAGES.FIRST_NAME.REQUIRED
                  },
                  {
                    max: MAX_TEXT_LENGTH.FIRST_NAME,
                    message: VALIDATION_MESSAGES.MAX_LENGTH.FIRST_NAME
                  }
                ]
              }}
              inputProps={{
                disabled: !isEditMode || isUpdating,
                size: 'large',
                placeholder: INPUTS.PLACEHOLDER.FIRST_NAME,
                onChange: handleCapitalizedChange('first_name')
              }}
            />

            <RenderTextInput
              colProps={{
                md: 12,
                span: 24
              }}
              formItemProps={{
                name: 'last_name',
                label: INPUTS.LABEL.LAST_NAME,
                required: true,
                rules: [
                  {
                    required: true,
                    message: VALIDATION_MESSAGES.LAST_NAME.REQUIRED
                  },
                  {
                    max: MAX_TEXT_LENGTH.FIRST_NAME,
                    message: VALIDATION_MESSAGES.MAX_LENGTH.FIRST_NAME
                  }
                ]
              }}
              inputProps={{
                disabled: !isEditMode || isUpdating,
                size: 'large',
                placeholder: INPUTS.PLACEHOLDER.LAST_NAME,
                onChange: handleCapitalizedChange('last_name')
              }}
            />

            <RenderTextInput
              colProps={{
                md: 24,
                span: 24
              }}
              formItemProps={{
                name: 'email',
                label: INPUTS.LABEL.EMAIL,
                required: true
              }}
              inputProps={{
                size: 'large',
                disabled: true
              }}
            />
          </Row>
        </Form>
      </div>
    </ProfileWrapper>
  );
};
