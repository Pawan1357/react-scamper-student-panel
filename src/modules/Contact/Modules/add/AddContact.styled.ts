import styled from 'styled-components';

export const AddContactFormWrapper = styled.div`
  .create-sub-admin-flow {
    margin-top: 20px;
    padding: 40px 70px;
    border-radius: 8px;
  }

  .form-action-buttons {
    gap: 15px;
    .ant-btn {
      padding: 4px 70px;
      border-radius: 20px !important;
    }
  }

  @media (max-width: 768px) {
    .create-sub-admin-flow {
      padding: 30px 20px;
    }

    .form-action-buttons {
      .ant-btn {
        padding: 4px 30px;
      }
    }
  }
`;
