import React, { FC, useMemo } from 'react'
import { useSiteContext } from '@provider'
import { RenderContentProps } from './types'
import RenderText from './components/RenderText'
import { WebpageClass } from '@types'
import RenderVideo from './components/RenderVideo'
import RenderImage from './components/RenderImage'
import RenderTable from './components/RenderTable'
import RenderDivider from './components/RenderDivider'

const RenderContent: FC<RenderContentProps> = ({path}) => {
    const {website} = useSiteContext().data

    const currentContent: WebpageClass['content'] = useMemo(() => {
        const currentWebsite = website.find((item) => item.path.includes(path))
        if (currentWebsite) {
            return currentWebsite.content || []
        }
        return []
    }, [path, website]);

    return (
        <>
            { currentContent.map((item) => {
                if (item.type === 'text' && item.active) {
                    return <RenderText key={item.id} text={item} />
                }       
                if (item.type === 'image' && item.active) {
                    return <RenderImage key={item.id} image={item} />
                }   
                if (item.type === 'video' && item.active) {
                    return <RenderVideo key={item.id} video={item} />
                }    
                if (item.type === 'table' && item.active) {
                    return <RenderTable key={item.id} content={item} />
                }    
                if (item.type === 'divider' && item.active) {
                    return <RenderDivider key={item.id} content={item} />
                }    
            })}
        </>
    )
}

export default RenderContent