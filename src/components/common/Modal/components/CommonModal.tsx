import { ModalWrapper } from '../Modal.Styled';
import { IModalProps } from '../types';

const DEFAULT_MODAL_Z_INDEX = 2000;

const CommonModal = (props: IModalProps) => {
  const {
    className = '',
    footer,
    closable = true,
    maskClosable = true,
    destroyOnClose = true,
    zIndex,
    getContainer
  } = props;
  return (
    <ModalWrapper
      {...props}
      closable={closable}
      footer={footer}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      // Ensure modals always appear above the app header (header z-index is 1001).
      zIndex={zIndex ?? DEFAULT_MODAL_Z_INDEX}
      // Ensure modal is not clipped by any scroll/overflow containers.
      getContainer={getContainer ?? (() => document.body)}
      className={`common-modal ${className}`}
    >
      {props.children}
    </ModalWrapper>
  );
};

export default CommonModal;
