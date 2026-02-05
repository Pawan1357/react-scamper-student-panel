import { LoadingIcon } from 'components/svg';

import { PrimaryLoader, Spinner, Wrapper } from './style';

interface IProps {
  children?: React.ReactNode;
}

export const LoaderWrapper: React.FC<IProps> = ({ children }) => {
  return (
    <Wrapper>
      <PrimaryLoader>{children}</PrimaryLoader>
    </Wrapper>
  );
};

export const Loader: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Spinner>
          <LoadingIcon />
        </Spinner>
        {children}
      </Wrapper>
      {children}
    </>
  );
};
