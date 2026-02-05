import { ReactNode } from 'react';

import { FormDesc, FormInfoWrapper, FormTitle } from 'modules/Auth/Auth.Styled';

import { AuthLogo } from 'components/svg';

import { AuthWrapper } from './Auth.Styled';

export interface IAuthProps {
  containerClassName?: string;
  authBg?: string;
  children?: ReactNode;
  formProps?: {
    title?: string | ReactNode;
    desc?: string | ReactNode;
  };
}
const AuthLayout = (props: IAuthProps) => {
  const { containerClassName, authBg, children, formProps } = props;
  return (
    <AuthWrapper className={`authLayout ${containerClassName}`}>
      <div className="logo-container">
        <AuthLogo />
      </div>

      <div className={`authWrapper ${authBg || 'authBg'}`}>
        <div>
          {(formProps?.title || formProps?.desc) && (
            <FormInfoWrapper>
              {formProps?.title && <FormTitle>{formProps?.title}</FormTitle>}
              {formProps?.desc && <FormDesc>{formProps?.desc}</FormDesc>}
            </FormInfoWrapper>
          )}
        </div>
        {children}
      </div>
    </AuthWrapper>
  );
};

export default AuthLayout;
