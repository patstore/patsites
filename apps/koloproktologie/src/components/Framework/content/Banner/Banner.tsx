import React, { useState, useEffect } from 'react'
// import { Image } from '@components/Image'
import { motion, Variants } from 'motion/react'
import { useMediaQuery } from 'usehooks-ts'
import settings from '@settings';
import call_for_abstracts from "./images/call_for_abstracts.png"
import wiss_preise from "./images/wiss_preise.png"
import { difference } from 'lodash-es';


export const mediBannerContainer = (isFixed: boolean) => settings.mq({
  position: isFixed ? "fixed" : "relative",
  overflow: "hidden",
  width: "100%",
  backgroundColor: settings.colors.primary,
  bottom: 0,
  zIndex: 10,
  padding: "12px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  boxShadow: isFixed ? "0 2px 5px rgba(0,0,0,.4)" : "none",
  gap: "12px"
});

const bannerImageCss = (matches: boolean) => ({
  display: "block",
  height: matches ? "clamp(48px, 10vw, 120px)" : "auto",
  width: matches ? "auto" : "100%",
  maxWidth: "100%",
  objectFit: "contain" as const,
  ...(matches && { flex: "1 1 0", minWidth: 0 }),
});

const bannerVariants = {
  visible: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  hidden: {
    opacity: 1,
    y: 300,
    x: "-50%",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
}

const Banner: React.FC<{isFixed: boolean}> = ({isFixed}) => {
  const [isVisible, setIsVisible] = useState(true)
  const matches = useMediaQuery('(min-width: 768px)', { initializeWithValue: false, defaultValue: true })
  const [formerScrollY, setFormerScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const newVisible = window.scrollY < formerScrollY
      if (newVisible !== isVisible) {
        setIsVisible(newVisible)
      }
      if (Math.abs(window.scrollY - formerScrollY) > 100) {
        setFormerScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
  }, [isVisible, formerScrollY])

  if (new Date() > new Date('2026-10-25')) {
    return null
  }

  if (!isFixed) {
    return (
      <div css={[mediBannerContainer(isFixed), {flexDirection: matches ? "row" : "column", zIndex: 1}]}>
        <img src={call_for_abstracts} alt="Call for Abstracts" css={bannerImageCss(matches)} style={{ cursor: "pointer" }} onClick={() => window.open("https://www.koloproktologen-kongress.de/abstracteinreichung.php", "_blank")} />
        {matches && <img src={wiss_preise} alt="Wiss Preise" css={bannerImageCss(matches)} />}
      </div>
    )
  }

  return (  
    <motion.div 
      css={[mediBannerContainer(isFixed), {left: "50%", flexDirection: matches ? "row" : "column"}]}
      initial="visible"
      variants={bannerVariants as Variants}
      animate={isVisible ? "visible" : "hidden"}
    >
       <img src={call_for_abstracts} alt="Call for Abstracts" css={[bannerImageCss(matches), { cursor: "pointer" }]} onClick={() => window.open("https://www.koloproktologen-kongress.de/abstracteinreichung.php", "_blank")} />
       {matches && <img src={wiss_preise} alt="Wiss Preise" css={bannerImageCss(matches)} />}
    </motion.div>
  )
}

export default Banner