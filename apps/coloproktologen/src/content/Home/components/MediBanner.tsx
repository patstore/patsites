import { AppImage } from "@ui";
import staticAsset0 from "../images/banner_mediMeisterschaften.webp";
import staticAsset1 from "../images/banner_mediMeisterschaften_mobile.webp";
import React, { useState, useEffect } from 'react'
import { mediBannerContainer } from '../styles'
import { motion } from 'motion/react'
import { useMediaQuery } from 'usehooks-ts'

const bannerVariants = {
  visible: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hidden: {
    opacity: 1,
    y: 300,
    x: "-50%",
    transition: { duration: 0.5, ease: "easeIn" },
  },
}

const MediBanner: React.FC<{isFixed: boolean}> = ({isFixed}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const matches = useMediaQuery('(min-width: 768px)', { initializeWithValue: false, defaultValue: true })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY === 0)
    }

    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
  }, [])

  return (
    <motion.div 
      css={[mediBannerContainer, {position: isFixed ? "fixed" : "relative"}]}
      initial="visible"
      variants={bannerVariants as any}
      animate={isVisible ? "visible" : "hidden"}
    >
        {matches ? 
          <AppImage 
            src={staticAsset0} 
            alt={"Medi Meisterschaften"} 
            width={4000}
            style={{ height: "100%", width: "auto", marginLeft: "auto", marginRight: "auto", objectFit: "contain" }}
            objectFit="contain"
          />
        : 
          <AppImage 
            src={staticAsset1} 
            alt={"Medi Meisterschaften"} 
            width={4000}
            style={{ height: "100%", width: "auto", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }}
            objectFit="cover"
          />
        }
    </motion.div>
  )
}

export default MediBanner