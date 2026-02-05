import styled from 'styled-components';

interface AvatarProps {
  imageUrl?: string; // Optional profile image URL
  bgColor?: string; // Background color when no image
}

export const AvatarCircle = styled.div<AvatarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;

  /* If image is provided, show it as background */
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
