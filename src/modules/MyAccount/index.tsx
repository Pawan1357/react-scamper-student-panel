import { useRef, useState } from 'react';

import { Button } from 'antd';
import { Wrapper } from 'modules/Auth/Auth.Styled';

import { TITLES } from 'utils/constants';

import { ProfileForm, ProfileFormRef } from './components/ProfileForm';
import HeaderToolbar from 'components/common/HeaderToolbar';
import Meta from 'components/common/Meta';

const MyAccount = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const profileFormRef = useRef<ProfileFormRef>(null);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    // Set callback to exit edit mode after successful update
    (window as any).__onProfileUpdateSuccess = () => {
      setIsEditMode(false);
      delete (window as any).__onProfileUpdateSuccess;
    };
    profileFormRef.current?.submit();
  };

  const handleCancel = () => {
    profileFormRef.current?.cancel();
    setIsEditMode(false);
  };

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${isEditMode ? TITLES.EDIT_PROFILE : TITLES.PROFILE}`} />
      <Wrapper>
        <HeaderToolbar
          title={isEditMode ? TITLES.EDIT_PROFILE : TITLES.PROFILE}
          backBtn={true}
          button={
            !isEditMode ? (
              <Button
                type="primary"
                shape="round"
                className="title-btn"
                htmlType="button"
                onClick={handleEditMode}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex-gap-8">
                <Button
                  type="default"
                  shape="round"
                  className="title-btn"
                  htmlType="button"
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  className="title-btn"
                  htmlType="button"
                  onClick={handleSave}
                  disabled={isUpdating}
                  loading={isPending}
                >
                  Save
                </Button>
              </div>
            )
          }
        />
        <ProfileForm
          isEditMode={isEditMode}
          formRef={profileFormRef}
          onUpdatingChange={setIsUpdating}
          onPendingChange={setIsPending}
        />
      </Wrapper>
    </>
  );
};

export default MyAccount;
