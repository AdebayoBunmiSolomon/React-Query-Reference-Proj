import { useEffect, useState } from 'react';
import * as Device from 'expo-device';

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = async () => {
      setIsTablet(Device.deviceType === Device.DeviceType.TABLET);
    };

    checkTablet();
  }, []);

  return isTablet;
};
