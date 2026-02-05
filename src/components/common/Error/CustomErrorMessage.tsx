import { ErrorMessage } from './style';

export const CustomErrorMessage = ({ message }: { message: string }) => {
  return <ErrorMessage>{message}</ErrorMessage>;
};
