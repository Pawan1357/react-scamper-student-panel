import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 34px;
  }

  .shadow-paper {
    padding: 40px 73px;
  }

  .image-container {
    width: 120px;
    height: 120px;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  @media (max-width: 768px) {
    .profile-pic-container {
      display: flex;
      justify-content: center;
    }
  }
`;
