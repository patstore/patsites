import { FC } from 'react'
import { ButtonProps } from './types'
import { ArrowRightIcon } from 'lucide-react'

const Button: FC<ButtonProps> = ({text,showIcon, underline = false, onClick, disabled}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}>
      <span className={`button-text ${underline ? 'underline-text' : ''}`} data-has-icon={showIcon ? 'true' : 'false'}>{text}</span>
      {showIcon && <span className="button-icon" ><ArrowRightIcon size={12} /></span>}
    </button>
  )
}

export default Button