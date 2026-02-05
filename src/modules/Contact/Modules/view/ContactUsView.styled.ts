import { Typography } from 'antd';

import styled from 'styled-components';

export const ContactUsViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 20px;
  }
`;

export const ContactDetailCardWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 40px 73px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 6px;
  }

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

export const ContactDetailCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const ContactDetailTitle = styled(Typography.Title)`
  margin-bottom: 0 !important;
  font-size: 20px !important;
  font-weight: 600 !important;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

export const ContactDetailSection = styled.div`
  padding: 25px 0;

  .description-admin {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .description-text {
      font-size: 16px;
      font-weight: 400;
      color: #01132a;
      line-height: 24px;
      margin: 0;
      word-wrap: break-word;
    }
  }

  .description-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;

    .description-label {
      font-size: 14px;
      font-weight: 500;
      color: #6a6a6a;
      margin: 0;
    }

    .description-text {
      font-size: 16px;
      font-weight: 400;
      color: #01132a;
      line-height: 24px;
      margin: 0;
      word-wrap: break-word;
    }
  }

  @media (max-width: 768px) {
    padding: 5px 0;

    .description-section {
      .description-label {
        font-size: 13px;
      }

      .description-text {
        font-size: 15px;
        line-height: 22px;
      }
    }
  }
`;

export const AdminResponseContent = styled.div`
  margin-bottom: 20px;
`;

export const AdminResponseFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

export const ResponseSignature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ResponseSignatureInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  .admin-name {
    font-size: 16px;
    font-weight: 400;
    color: #01132a;
    line-height: 24px;
  }

  .admin-date {
    font-size: 16px;
    font-weight: 400;
    color: #01132a;
    line-height: 24px;
  }

  @media (max-width: 768px) {
    .admin-name,
    .admin-date {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
