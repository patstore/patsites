import { useEffect, useState } from 'react'
import { Calendar, MapPin, Monitor, ArrowUpRight } from 'lucide-react'
import { homeHeaderContainer, homeHeaderContent, homeHeaderCopy, homeHeaderFact, homeHeaderFacts, homeHeaderHero, homeHeaderLink, homeHeaderMedia, homeHeaderMediaImage, homeHeaderPlakat, homeHeaderWatermark, loaderContainer } from './styles'
import HomeHeaderTrack from './components/HomeHeaderTrack'
import { AnimatePresence, motion } from 'motion/react'
import { homeHeaderMediaVariants, homeHeaderStaggerVariants, homeHeaderVariants } from './constants/variants'
import saveTheDate from './images/main_header.jpg'
import kongressCenter from './images/kongress_center.png'
import kongressPlakat from './images/kongressplakat.png'
import dgkLogo from './images/dgk-logo.png'
import { topline } from '@styles'
import { Button } from '@ui'

const CONGRESS_URL = 'https://www.koloproktologen-kongress.de/'

const facts = [
    { icon: Calendar, label: '11.–13. März 2027' },
    { icon: MapPin, label: 'Kongress am Park, Augsburg' },
    { icon: Monitor, label: 'Hybrid: vor Ort oder online' },
]

const slides = [
    {
        topline: 'Save the Date',
        title: '53. Deutscher Koloproktologen-Kongress',
        text: 'Die Deutsche Gesellschaft für Koloproktologie lädt vom 11. bis 13. März 2027 in den Kongress am Park nach Augsburg ein.',
        image: saveTheDate,
        imageAlt: 'Ankündigung des 53. Deutschen Koloproktologen-Kongresses 2027 in Augsburg',
        imageFit: 'cover' as const,
        imagePosition: 'center',
    },
    {
        topline: 'Programm',
        title: 'Impulse. Perspektiven. Ein gemeinsames Programm.',
        text: 'Der Call for Abstracts ist abgeschlossen. Herzlichen Dank an alle, die mit ihren wissenschaftlichen Beiträgen das Programm aktiv mitgestalten.',
        image: kongressCenter,
        imageAlt: 'Kongress am Park in Augsburg am Abend, Veranstaltungsort des Koloproktologen-Kongresses 2027',
        imageFit: 'cover' as const,
        imagePosition: 'center 82%',
    },
]

const HomeHeader = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCount((current) => (current === slides.length - 1 ? 0 : current + 1))
        }, 6000)

        return () => clearTimeout(timeout)
    }, [count])

    const slide = slides[count]

    return (
        <div css={homeHeaderContainer()}>
            {/* <div css={homeHeaderHero}>
            <div
                css={homeHeaderWatermark}
                style={{
                    WebkitMaskImage: `url(${dgkLogo})`,
                    maskImage: `url(${dgkLogo})`,
                }}
                aria-hidden
            />
            <div css={loaderContainer}>
                {slides.map((item, index) =>
                    <HomeHeaderTrack key={item.topline} isActive={index === count} index={index} setCount={setCount} title={item.topline} />
                )}
            </div>
            <div css={homeHeaderContent}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={slide.topline}
                        css={homeHeaderCopy}
                        variants={homeHeaderStaggerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.p variants={homeHeaderVariants} css={topline}>
                            {slide.topline}
                        </motion.p>
                        <motion.h1 variants={homeHeaderVariants}>
                            {slide.title}
                        </motion.h1>
                        <motion.p variants={homeHeaderVariants}>
                            {slide.text}
                        </motion.p>
                        <motion.div variants={homeHeaderVariants} css={homeHeaderFacts}>
                            {facts.map((fact) => (
                                <div key={fact.label} css={homeHeaderFact}>
                                    <fact.icon size={16} strokeWidth={1.75} aria-hidden />
                                    <p css={{margin: "0 !important"}}>{fact.label}</p>
                                </div>
                            ))}
                        </motion.div>
                        <motion.div
                            variants={homeHeaderVariants}
                            css={homeHeaderLink}
                            href={CONGRESS_URL}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button 
                                text="Zum Kongress"

                                // icon={<ArrowUpRight size={16} aria-hidden />}
                                externalLink={CONGRESS_URL}
                                
                            >
                                <ArrowUpRight size={16} aria-hidden />
                            </Button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={slide.image}
                        css={homeHeaderMedia}
                        variants={homeHeaderMediaVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <img
                            css={[homeHeaderMediaImage, { objectFit: slide.imageFit, objectPosition: slide.imagePosition }]}
                            src={slide.image}
                            alt={slide.imageAlt}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            </div> */}
            <img
                css={homeHeaderPlakat}
                src={kongressPlakat}
                alt="Programmankündigung des 53. Deutschen Koloproktologen-Kongresses 2027 in Augsburg"
            />
        </div>
    )
}

export default HomeHeader
