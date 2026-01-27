import { Sheet } from 'zmp-ui';
import { useEffect } from 'react';
import { useSheetStore } from '@/state/sheet';

const CustomSheet = () => {
  const { visible, children, closeSheet } = useSheetStore();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <Sheet
      swipeToClose={true}
      visible={visible}
      onClose={closeSheet}
      autoHeight
      mask
      maskClosable={true}
      handler={false}
    >
      <div
        className="overflow-visible max-h-[90vh] min-h-[40vh] rounded-2xl bg-gray-100"
      >
        <div className="absolute h-1 w-16 -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 z-[1001]"></div>

        <div className="relative text-secondary rounded-t-2xl min-h-[90vh] max-h-[90vh]">
          {children}
        </div>
      </div>
    </Sheet>
  );
};

export default CustomSheet;