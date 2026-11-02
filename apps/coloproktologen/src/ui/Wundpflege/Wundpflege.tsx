import React, { useState, useEffect } from 'react'
import { Button } from '../Button'
import { modalOverlay, modalContent, modalHeader, modalTitle, closeButton, videoContainer } from './styles'

type WundpflegeProps = {
    inline?: boolean
}

const Wundpflege: React.FC<WundpflegeProps> = ({inline = false}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleModalClose()
        }
    }

    return (
        <div>
            <h3>
                Anleitung zur Wundpflege
            </h3>
            {inline ?  <video src="/videos/BCD_Wundpflege_Video.mp4"
                controls
                css={{ width: "100%", height: "auto" }} /> : <Button text="Video ansehen" onClick={handleModalOpen} />}
            
            {isModalOpen && (
                <div css={modalOverlay} onClick={handleOverlayClick}>
                    <div css={modalContent}>
                        <div css={modalHeader}>
                            <h3 css={modalTitle}>Anleitung zur Wundpflege</h3>
                            <button 
                                css={closeButton} 
                                onClick={handleModalClose}
                                aria-label="Schließen"
                            >
                                ×
                            </button>
                        </div>
                        <div css={videoContainer}>
                            <video
                                controls
                                src="/videos/BCD_Wundpflege_Video.mp4"
                                autoPlay
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Wundpflege