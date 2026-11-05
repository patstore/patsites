import { loaderBar, loaderItem, loaderTrack } from '../styles'
import { motion } from 'motion/react'
import variants from '../constants/variants'
import { useState } from 'react'

const HomeHeaderTrack = ({isActive, index, setCount, title}: {isActive: boolean, index: number, setCount: (index: number) => void, title: string}) => {
    const [hover, setHover] = useState(false)
    return (
        <button 
            type="button"
            css={loaderItem(isActive, hover)} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCount(index)}
        >
            <div key={index} css={loaderTrack(isActive || hover)} >
                <motion.div css={loaderBar}
                    variants={variants}
                    animate={isActive ? "active" : "inactive"}
                    transition={{ duration: 6, ease: "easeInOut" }}
                />
            </div>
            <span>{index + 1}</span>
            <p>
                {title}
            </p>
        </button>
    )
}

export default HomeHeaderTrack