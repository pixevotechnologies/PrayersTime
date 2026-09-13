import { useEffect, useState, useCallback } from 'react';

export interface DeviceOrientationState {
  heading: number | null; // 0-360 degrees, 0 = True North
  isSupported: boolean;
  permissionState: 'prompt' | 'granted' | 'denied' | 'unsupported';
  isCalibrated: boolean;
  errorMsg: string | null;
  requestSensorPermission: () => Promise<boolean>;
}

export function useDeviceOrientation(): DeviceOrientationState {
  const [heading, setHeading] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'unsupported'>('prompt');
  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('DeviceOrientationEvent' in window)) {
      setIsSupported(false);
      setPermissionState('unsupported');
      setErrorMsg('Device orientation sensor is not supported by your browser or hardware.');
      return;
    }

    setIsSupported(true);

    // Check if permission API is needed (iOS 13+)
    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceOrientation.requestPermission === 'function') {
      setPermissionState('prompt');
    } else {
      // Android or desktop browser supporting deviceorientation directly
      setPermissionState('granted');
      startListening();
    }
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    let compassHeading: number | null = null;

    // iOS Safari webkitCompassHeading
    if ('webkitCompassHeading' in e && typeof (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading === 'number') {
      compassHeading = (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading;
      setIsCalibrated(true);
    } else if (e.alpha !== null) {
      // Android absolute orientation: alpha is rotation around z-axis
      // When compass is pointing north, alpha is typically 360 - alpha or 0
      compassHeading = (360 - e.alpha) % 360;
      setIsCalibrated(true);
    }

    if (compassHeading !== null && !isNaN(compassHeading)) {
      setHeading(Math.round(compassHeading));
    }
  };

  const startListening = () => {
    if (typeof window === 'undefined') return;
    window.addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
    window.addEventListener('deviceorientation', handleOrientation as EventListener, true);
  };

  const requestSensorPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceOrientation.requestPermission === 'function') {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === 'granted') {
          setPermissionState('granted');
          startListening();
          return true;
        } else {
          setPermissionState('denied');
          setErrorMsg('Compass sensor permission was declined in your browser settings.');
          return false;
        }
      } catch (err) {
        setPermissionState('denied');
        setErrorMsg('Could not initialize orientation sensor: ' + (err instanceof Error ? err.message : String(err)));
        return false;
      }
    } else {
      startListening();
      setPermissionState('granted');
      return true;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
        window.removeEventListener('deviceorientation', handleOrientation as EventListener, true);
      }
    };
  }, []);

  return {
    heading,
    isSupported,
    permissionState,
    isCalibrated,
    errorMsg,
    requestSensorPermission,
  };
}
