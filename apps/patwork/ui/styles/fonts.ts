import { mq, colors, fontSize, sizes } from "@/settings";

export const h1 = mq({
    fontFamily: 'Coco Sharp',
    fontWeight: 700,
    letterSpacing: '2px', 
    // color: colors.white,
    // "-webkit-text-stroke": `1.2px ${colors.darkgrey}`,
    textTransform: 'lowercase',
    textAlign: 'left',
    margin: 0,
    lineHeight: 1,
    // maxWidth: '720px',
    'strong': { fontWeight: 700 }
});

export const h2 = mq({
    fontFamily: 'Coco Sharp',
    fontSize: ['24px','36px', '90px'],
    letterSpacing: '-0.6px',
    fontWeight: 700,
    color: 'inherit',
    textTransform: 'uppercase',
    margin: 0
});

export const h3 = mq({
    marginBlockEnd: 0,
    marginBottom: 0,
    fontFamily: 'Coco Sharp',
    letterSpacing: '2px',
    lineHeight: 1.2
});

export const h4 = mq({
    fontFamily: 'Coco Sharp',
    fontWeight: 600,    
    fontSize: fontSize.medium,
    letterSpacing: '2px',
    maxWidth: '660px',
    lineHeight: 1.5,
    margin: 0,
    marginTop: sizes.large,
    marginBottom: sizes.small
});

export const h5 = mq({
    fontFamily: 'Coco Sharp',
    fontWeight: 300,    
    fontSize: fontSize.large,
    letterSpacing: '1.2px',
    maxWidth: '480px',
    lineHeight: 1.5,
    margin: 0,
    marginBottom: sizes.small
});

export const h6 = mq({
    fontFamily: 'Coco Sharp',
    fontWeight: 300,    
    fontSize: fontSize.large,
    letterSpacing: '1.2px',
    maxWidth: '660px',
    lineHeight: 1.5,
    margin: 0,
    marginBottom: sizes.small
});

export const p = mq({
    fontFamily: 'Coco Sharp',
    fontWeight: 500,
    fontSize: ["30px"],
    letterSpacing: '1px',
    lineHeight: 1.5,
    marginBlockEnd: sizes.medium
});

export const a = mq({
    fontFamily: 'Coco Sharp',
    fontWeight: 400,
    fontSize: "16px",
    textDecoration: 'underline',
    color: colors.darkgrey,
    marginBlockEnd: 0
});