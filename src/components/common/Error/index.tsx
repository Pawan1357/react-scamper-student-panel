import { Component, ErrorInfo, ReactNode } from 'react';

import { toAbsoluteUrl } from 'utils/functions';

import styled from 'styled-components';

// Styled Components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const ErrorImage = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
`;

const RefreshButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #071447;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #165ca8;
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorImage src={`${toAbsoluteUrl('/icons/error.png')}`} alt="Error Illustration" />
          <ErrorTitle>Oops! Something went wrong :(</ErrorTitle>
          <ErrorMessage>Try to refresh the page</ErrorMessage>
          <RefreshButton onClick={this.handleRefresh}>Refresh</RefreshButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
