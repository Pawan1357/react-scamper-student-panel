import { ReactNode } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

interface IProps {
  pageTitle?: string;
  button?: ReactNode;
  gap?: number;
  backBtn?: boolean;
  backTo?: string;
  backButtonHandler?: () => void;
}

const ContentHeader = (props: IProps) => {
  const navigate = useNavigate();

  const onBack = () => {
    return props?.backTo ? navigate(props?.backTo) : navigate(-1);
  };
  return (
    <div className="shadow-paper pad-md">
      <Row gutter={[0, 15]} align={'middle'}>
        {props?.backBtn && (
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={props?.backButtonHandler ?? onBack}
          />
        )}
        <Col xs={props?.backBtn ? 18 : 24}>
          <h2 className="pageTitle">{props?.pageTitle}</h2>
        </Col>
        {props?.button && (
          <Col xs={6}>
            <div className="text-right">
              <Space size={props?.gap ?? 10}>{props?.button}</Space>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ContentHeader;
