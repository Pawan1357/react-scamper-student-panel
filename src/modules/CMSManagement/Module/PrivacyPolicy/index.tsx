import { useEffect, useState } from 'react';

import { Wrapper } from 'modules/CMSManagement/cms.style';

import { TITLES } from 'utils/constants';
import { CmsTypeEnum } from 'utils/constants/enum';
import { showToaster } from 'utils/functions';

import { cmsHooks } from 'services/cms';

import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

const PrivacyPolicy = () => {
  const [value, setValue] = useState<string>('');

  const {
    data,
    mutate: getCmsDetails,
    isError,
    error,
    isPending: isGetCmsLoading
  } = cmsHooks.useGetCmsDetails();

  useEffect(() => {
    if (!data) {
      getCmsDetails({ title: CmsTypeEnum.PRIVACY_POLICY });
    }
  }, [data, getCmsDetails]);

  useEffect(() => {
    if (data) {
      setValue(data?.data?.description);
    }

    if (isError && error) {
      showToaster('error', error.message);
    }
  }, [data, isError, error]);
  return (
    <>
      {isGetCmsLoading && <Loader />}
      <Meta title={`${TITLES.COMMON} - ${TITLES.CMS.PRIVACY_POLICY}`} />
      <Wrapper>
        <HeaderToolbar title={TITLES.CMS.PRIVACY_POLICY} />
        <div className="shadow-paper mt-20">
          <p
            className="cms-content tiptap-content-view"
            dangerouslySetInnerHTML={{ __html: value || '' }}
          />
        </div>
      </Wrapper>
    </>
  );
};

export default PrivacyPolicy;
