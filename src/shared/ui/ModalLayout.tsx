import React from 'react';
import Modal from 'react-native-modal';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const ModalLayout = ({ children, isVisible, onClose }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
      propagateSwipe
      backdropTransitionOutTiming={0}
    >
      {children}
    </Modal>
  );
};

export default ModalLayout;
