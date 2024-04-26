import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
// import { Lenis } from '@studio-freight/react-lenis/types';
import Lenis from 'lenis'

const ScrollToTop = () => {

  const lenis = new Lenis()

    const location = useLocation();

    useEffect(() => {
        lenis.scrollTo(0, {
          duration: 1.7,
          offset: 0,
          lock:true,
          immediate: true
        });
    }, [location])

  return null;
}

export default ScrollToTop