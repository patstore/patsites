import { useEffect, useMemo } from 'react'
import { homeHeaderContainer, homeHeaderContent, homeHeaderCopy, homeHeaderMedia, homeHeaderMediaImage, loaderContainer } from './styles'
import { home_header_content } from './constants/content'
import { useCounter } from 'usehooks-ts'
import HomeHeaderTrack from './components/HomeHeaderTrack'
import { AnimatePresence, motion } from 'motion/react'
import { homeHeaderMediaVariants, homeHeaderStaggerVariants, homeHeaderVariants } from './constants/variants'
import congressImage from './images/main_header.jpg'
import kongressPlakat from './images/kongressplakat.png'
import { topline } from '@styles'

const HomeHeader = () => {
    const { count, setCount, increment, decrement, reset } = useCounter(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (count === home_header_content.length - 1) {
                reset()
            } else {
                increment()
            }
        
        }, 6000)
      
        return () => clearTimeout(timeout)
      }, [count])

      useEffect(() => {
        setCount(0)
      }, [])

      const renderContent = useMemo(() => {
        return ([
            {
                topline: "Kongress",
                title: "53. Deutscher Koloproktologen-Kongress 2027",
                subtitle: "1.03.2027 - 13.03.2027 - Augsburg",
                content: (
                    <img css={homeHeaderMediaImage} src={congressImage} alt="Congress Image" />
                )

            },
            {
                topline: "Kongress",
                title: "Impule. Perspektiven. Ein Gemeinsames Programm.",
                subtitle: "Call for Abstracts abgeschlossen",
                content: (
                    <img css={homeHeaderMediaImage} src={kongressPlakat} alt="Congress Image" />
                )
            }
        ])
      }, [count])

    return (
        <div css={homeHeaderContainer()}>
            <div css={homeHeaderContent}> 
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={count}
                        css={homeHeaderCopy}
                        variants={homeHeaderStaggerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.p variants={homeHeaderVariants} css={topline}>
                            {renderContent[count].topline}
                        </motion.p>
                        <motion.h1 variants={homeHeaderVariants}>
                            {renderContent[count].title}
                        </motion.h1>
                        <motion.p variants={homeHeaderVariants}>
                            {renderContent[count].subtitle}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={count}
                        css={homeHeaderMedia}
                        variants={homeHeaderMediaVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {renderContent[count].content}
                    </motion.div>
                </AnimatePresence>
                <div css={loaderContainer}>
                    {renderContent.map((item, index) => 
                        <HomeHeaderTrack key={item.title} isActive={index === count} index={index} setCount={setCount} title={item.topline} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeHeader