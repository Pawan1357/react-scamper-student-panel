import { ChangeEvent, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form } from 'antd';
import { useFormValidation } from 'hooks/useFormValidation';
import { useNavigate } from 'react-router-dom';

import { IMAGE_URL } from 'utils/constants';
import { ImageTypeEnum } from 'utils/constants/enum';
import { capitalizeFirstLetterWhileTyping, showToaster } from 'utils/functions';

import { authHooks, authQueryKey } from 'services/auth';
import { IProfileUpdateReq } from 'services/auth/types';
import { commonHooks } from 'services/common';
import { IUploadImageReq } from 'services/common/types';
import { authStore } from 'services/store/auth';

export const useProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [imageName, setImageName] = useState<string>('');
  const [imageShow, setImageShow] = useState<string>('');
  const [imageCurrentUrl, setImageCurrentUrl] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { isFormValid, onFieldsChange } = useFormValidation(form);
  const { userData, actions } = authStore((state) => state);

  const { data, isLoading } = authHooks.useGetProfile();
  const { mutate: mutateProfileUpdate, isPending } = authHooks.useUpdateProfile();
  const { mutate: mutateImageUpload, isPending: isProfilePicUploadPending } =
    commonHooks.useImageUpload();

  // Fill form whenever profile data changes (including refetch/invalidate)
  useEffect(() => {
    // make sure nested data exists
    if (data?.data) {
      const user = data.data;

      // Set form values - preserve original case for display
      const emailOriginal = (user.email || '').trim();

      // Map API response to form fields
      const mappedValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: emailOriginal
      };

      const imgUrl = `${IMAGE_URL}scamper/${ImageTypeEnum.STUDENT}/${user?.profile_photo}`;
      setImageShow(user?.profile_photo ? imgUrl : '');
      setImageCurrentUrl(user?.profile_photo ? user?.profile_photo : '');
      setImageName(user?.profile_photo ? user?.profile_photo : '');

      actions.authSuccess({
        data: {
          ...userData,
          profile_photo: user?.profile_photo ?? ''
        }
      });

      // Update the form fields safely
      form.setFieldsValue(mappedValues);
    }
  }, [data, form, isLoading]);

  const handleCapitalizedChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
      form.setFieldsValue({ [fieldName]: capitalized });
    };

  const onSubmit = (values: IProfileUpdateReq) => {
    // Build payload according to IProfileUpdateReq type
    const payload: IProfileUpdateReq = {
      first_name: values.first_name,
      last_name: values.last_name,
      google_classroom_email: values.google_classroom_email,
      profile_photo: imageName || userData?.profile_photo
    };

    mutateProfileUpdate(payload, {
      onSuccess: (response) => {
        showToaster('success', response.message);
        queryClient.invalidateQueries({ queryKey: authQueryKey.profileGet() });

        // Update auth store with new profile data
        actions.authSuccess({
          data: {
            ...userData,
            first_name: values.first_name as string,
            last_name: values.last_name as string,
            google_classroom_email: values.google_classroom_email as string,
            profile_photo: imageName || userData?.profile_photo
          }
        });

        // Trigger edit mode exit callback if provided
        if ((window as any).__onProfileUpdateSuccess) {
          (window as any).__onProfileUpdateSuccess();
        }
      },
      onError: (error) => {
        showToaster('error', error.message);
      }
    });
  };

  const handleImageUpload = (selectedFile: File) => {
    const payload: IUploadImageReq = {
      files: selectedFile,
      moduleName: ImageTypeEnum.STUDENT
    };

    mutateImageUpload(payload, {
      onSuccess: (response) => {
        const imgUrl = `${IMAGE_URL}tmp-scamper/${ImageTypeEnum.STUDENT}/${response?.data?.[0]?.name}`;
        setImageShow(imgUrl);
        setImageName(response?.data?.[0]?.name);
      },
      onError: (error) => {
        const errMessage = error as any;
        showToaster(
          'error',
          errMessage?.message || 'An error occurred while uploading the profile image.'
        );
      }
    });
  };

  // Profile Picture Upload
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // ✅ Validate file type
    if (!validTypes.includes(selectedFile.type)) {
      showToaster('error', 'Only JPG, JPEG, or PNG files are allowed.');
      return;
    }

    // ✅ Validate file size
    if (selectedFile.size > maxSizeInBytes) {
      showToaster('error', 'File size should not exceed 5 MB.');
      return;
    }
    handleImageUpload(selectedFile);
  };

  const handleCancel = () => {
    // Reset form to original values from API
    if (data?.data) {
      const user = data.data;

      // Set form values - preserve original case for display
      const emailOriginal = (user.email || '').trim();

      const mappedValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: emailOriginal
      };
      form.setFieldsValue(mappedValues);

      // Reset image to original
      const imgUrl = `${IMAGE_URL}scamper/${ImageTypeEnum.STUDENT}/${user?.profile_photo}`;
      setImageShow(user?.profile_photo ? imgUrl : '');
      setImageName(user?.profile_photo ? user?.profile_photo : '');
    }
  };

  return {
    navigate,
    form,
    isPending,
    isLoading,
    isFormValid,
    onFieldsChange,
    onSubmit,
    handleCancel,
    handleCapitalizedChange,
    handleFileChange,
    imageName,
    imageShow,
    isProfilePicUploadPending,
    imageCurrentUrl,
    isPreviewVisible,
    setIsPreviewVisible
  };
};
