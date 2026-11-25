import { css } from '@emotion/react';

const container = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const phone = (height: number, width: number, borderRadius: number) => css({
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'white',
    borderRadius: `${borderRadius}px`,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    border: '10px solid black',
    position: 'relative',
    overflow: 'hidden',
});

const notch = (height: number, width: number) => css({
    position: 'absolute',
    top: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'black',
    borderRadius: '10px',
});

const appContent = css({
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

const text = css({
    fontSize: '1.25rem',
    fontWeight: 600,
});

const subText = css({
    color: '#6B7280',
});

export { container, phone, notch, appContent, text, subText };