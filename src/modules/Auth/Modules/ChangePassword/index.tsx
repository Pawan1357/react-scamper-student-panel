import { Wrapper } from 'modules/Auth/Auth.Styled';

import { TITLES } from 'utils/constants';

import { ChangePasswordForm } from './components/ChangePasswordForm';
import HeaderToolbar from 'components/common/HeaderToolbar';
import Meta from 'components/common/Meta';

const ChangePassword = () => {
  return (
    <>
      <Meta title={`${TITLES.COMMON} - ${TITLES.CHANGE_PASSWORD}`} />

      <Wrapper>
        <HeaderToolbar title={TITLES.CHANGE_PASSWORD} backBtn={true} />
        <div className="shadow-paper change-pwd-wrapper mt-20">
          <p className="change-pwd-info">
            Your new password must be at least 8 characters and contain at least 1 special
            character, 1 number and 1 capital letter.
          </p>
          <ChangePasswordForm />
        </div>
      </Wrapper>
    </>
  );
};

export default ChangePassword;
