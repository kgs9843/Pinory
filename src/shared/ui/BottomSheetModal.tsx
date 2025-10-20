import React, { useRef, useEffect } from 'react';
import { Modalize } from 'react-native-modalize';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheetModal = ({ isOpen, onClose, children }: Props) => {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (isOpen) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isOpen]);

  return (
    <Modalize
      ref={modalizeRef}
      withOverlay={false}
      onClosed={onClose}
      panGestureEnabled
      adjustToContentHeight
      handlePosition="inside"
      handleStyle={{ width: 50, backgroundColor: '#ccc' }}
      modalStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
    >
      {children}
    </Modalize>
  );
};

export default BottomSheetModal;
