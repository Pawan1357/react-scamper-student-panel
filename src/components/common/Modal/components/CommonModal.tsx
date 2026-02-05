import { ModalWrapper } from '../Modal.Styled';
import { IModalProps } from '../types';

const CommonModal = (props: IModalProps) => {
  const {
    className = '',
    footer,
    closable = true,
    maskClosable = true,
    destroyOnClose = true
  } = props;
  return (
    <ModalWrapper
      {...props}
      closable={closable}
      footer={footer}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      className={`common-modal ${className}`}
    >
      {props.children}
    </ModalWrapper>
  );
};

export default CommonModal;
