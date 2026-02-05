import React from 'react';

import { Button } from 'antd';

import { Wrapper } from './Error.Styled';

type Props = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const ErrorContent = ({ title, description, action }: Props) => {
  const errTitle = title ?? 'Something Went Wrong';
  const errDescription = description ?? 'Sorry, an unexpected error has occurred';
  const resetAction = action ?? (
    <Button type="primary" href="/alert/reports">
      Reload
    </Button>
  );

  return (
    <Wrapper className="error-page">
      <picture className="error-img">
        <h1 className="animateNumber">
          <span className="number">4</span>
          <span className="number">0</span>
          <span className="number">4</span>
        </h1>
      </picture>
      <div className="error-content">
        <h3>{errTitle}</h3>
        <p>{errDescription}</p>
        {resetAction}
      </div>
    </Wrapper>
  );
};

export default ErrorContent;
