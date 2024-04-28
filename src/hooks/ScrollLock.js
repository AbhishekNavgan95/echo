import React, { useEffect } from 'react';

const ScrollLock = () => {
  useEffect(() => {
    // Function to disable body scroll
    const disableBodyScroll = () => {
      // Get the current scroll position
      const scrollY = window.scrollY;

      // Save current scroll position and prevent body from moving
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
    };

    // Function to enable body scroll
    const enableBodyScroll = () => {
      // Retrieve the previous scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };

    // Call disableBodyScroll() to prevent scrolling when component mounts
    disableBodyScroll();

    // Call enableBodyScroll() to re-enable scrolling when component unmounts
    return () => {
      enableBodyScroll();
    };
  }, []); // Run this effect only once on component mount

  return null; // This component doesn't render anything
};

export default ScrollLock;
