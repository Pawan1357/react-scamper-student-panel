import React from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from './style';

interface IHeaderToolbarProps {
  title?: string;
  isMultipleBtn?: boolean;
  button?: React.ReactNode;
  backBtn?: boolean;
  backTo?: string;
  className?: string;
  backButtonHandler?: () => void;

  /** Enable responsive layout */
  responsive?: boolean;
}

const HeaderToolbar: React.FC<IHeaderToolbarProps> = (props) => {
  const {
    title,
    button,
    backBtn,
    backTo,
    className,
    isMultipleBtn,
    backButtonHandler,
    responsive
  } = props;
  const navigate = useNavigate();

  const onBack = () => {
    return backTo ? navigate(backTo) : navigate(-1);
  };

  return (
    <Wrapper
      className={`header-toolbar-wrap ${responsive ? 'layout-responsive' : ''} ${className || ''}`}
    >
      <Row align="middle" justify="space-between" gutter={[10, 6]} className="main-row">
        {(title || button) && (
          <Col xs={24}>
            <Row justify={'start'} align={'middle'} className="sub-row">
              {title && (
                <Col className={`title-wrap ${backBtn ? 'title-with-cta' : ''}`}>
                  {backBtn && (
                    <Button
                      className="headerBackBtn"
                      type="text"
                      icon={<ArrowLeftOutlined />}
                      onClick={backButtonHandler ?? onBack}
                    />
                  )}
                  <Typography.Title level={4} className="page-title" title={title}>
                    {title}
                  </Typography.Title>
                </Col>
              )}
              {button && (
                <Col className={`cta-wrap ${isMultipleBtn ? 'btn-wrapper' : ''}`}>{button}</Col>
              )}
            </Row>
          </Col>
        )}
      </Row>
    </Wrapper>
  );
};

export default HeaderToolbar;
