import { StatusTagStyles } from './styles';
import { IStatusTagProps } from './types';

export const StatusTag = ({ status, color }: IStatusTagProps) => {
  return <StatusTagStyles color={color}>{status}</StatusTagStyles>;
};
