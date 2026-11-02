import React, { useMemo } from 'react'
import { useSiteContext } from '../context'
import { WebpageClass } from '@types';

const useFindWebpage = (path: string) => {
    const {website} = useSiteContext().data
    
     const currentPage: WebpageClass = useMemo(() => {
        const currentPage = website.find((item) => item.path.includes(path))
        if (currentPage) {
            return currentPage
        }
        return undefined
    }, [path, website])

    return currentPage
}

export default useFindWebpage