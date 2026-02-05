import { ButtonProps, ModalProps } from 'antd';

export interface IModalProps extends ModalProps {}

export interface ICommonModalProps extends ModalProps {
  icon?: React.ReactNode;
}

export interface IDeleteRecordModalProps extends ModalProps {
  btnDisabled?: boolean;
  btnIcon?: React.ReactNode;
  itemName?: string | React.ReactNode;
}

export interface IConfirmModalProps {
  modalProps: ICommonModalProps & {
    title?: string;
    question?: string;
    description?: string | React.ReactNode;
    onOk?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
  buttonProps?: ButtonProps;
}
