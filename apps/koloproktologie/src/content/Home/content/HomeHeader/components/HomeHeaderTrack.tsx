import { slideDot } from '../styles'

const HomeHeaderTrack = ({isActive, index, setCount, title}: {isActive: boolean, index: number, setCount: (index: number) => void, title: string}) => {
    return (
        <button
            type="button"
            css={slideDot(isActive)}
            aria-label={title}
            aria-current={isActive}
            onClick={() => setCount(index)}
        />
    )
}

export default HomeHeaderTrack
