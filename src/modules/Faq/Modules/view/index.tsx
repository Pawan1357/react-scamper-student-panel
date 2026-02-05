import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { TITLES } from 'utils/constants';
import { showToaster } from 'utils/functions';

import { faqHooks } from 'services/faq';
import { IGetFaqRes } from 'services/faq/types';

import { FaqDetailCard } from './components/FaqDetailCard';
import HeaderToolbar from 'components/common/HeaderToolbar';
import { Loader } from 'components/common/Loader';
import Meta from 'components/common/Meta';

import { FaqDetailSection } from './FaqView.styled';

const ViewFaqPage: React.FC = () => {
  const { faqId } = useParams<{ faqId: string }>();

  const { data, isLoading, isError, error } = faqHooks.useGetFaqById(faqId || '');

  useEffect(() => {
    if (isError) {
      showToaster('error', error?.message || 'Failed to fetch faq details.');
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${'FAQs Detail'}`} />

      <HeaderToolbar title="FAQs Detail" backBtn />
      <FaqDetailSection role="main">
        <FaqDetailCard faqData={data?.data as IGetFaqRes} />
      </FaqDetailSection>
    </>
  );
};

export default ViewFaqPage;
