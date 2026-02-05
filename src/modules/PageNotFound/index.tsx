import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import ErrorContent from './Components/ErrorContent';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorContent
      title="Page not found"
      description="Sorry, the page you visited does not exist"
      action={
        <Button size="small" type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
