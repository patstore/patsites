import { useMemo } from "react";
import { appContent, container, notch, phone, subText } from "./styles";

export default function PhoneMockup({content} : {content: React.ReactNode}) {
    
    const sizes = useMemo(() => {
        const key = 2.1;
        const phoneHeight = 640 /key;
        const phoneWidth = 320 / key;
        const phoneBorderRadius = 40 / key;
        const notchHeight = 16 / key;
        const notchWidth = 96 / key;
        return {
            phoneHeight,
            phoneWidth,
            phoneBorderRadius,
            notchHeight,
            notchWidth,
        }
        
    }, [])
    return (
      <div css={container}>
        {/* Phone Frame */}
        <div css={phone(sizes.phoneHeight, sizes.phoneWidth, sizes.phoneBorderRadius)}>
            {/* Notch */}
            <div css={notch(sizes.notchHeight, sizes.notchWidth)}></div>
            <div css={appContent}>
                {content}
            </div>
        </div>
      </div>
    );
}