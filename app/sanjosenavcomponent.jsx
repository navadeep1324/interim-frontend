// SanjoseNavbarComponent.jsx
import React, { useEffect, useState } from 'react';
import SanjoseNavbarMobileComponent from './SanjoseNavbarMobileComponent';
import SanjoseNavbarDesktopComponent from './SanjoseNavbarDesktopComponent';

export default function SanjoseNavbarComponent() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992); // Use 1024px as the breakpoint for desktop
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop ? <SanjoseNavbarDesktopComponent /> : <SanjoseNavbarMobileComponent />;
}
