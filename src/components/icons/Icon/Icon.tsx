import cn from 'classnames';
import * as React from 'react';
import styles from './Icon.module.scss';

export type IconColor = 'primary' | 'secondary' | 'accent';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: IconColor;
    width?: number;
    height?: number;
};

const COLOR_MAP: Record<IconColor, string> = {
    'primary': '#000000',
    'secondary': '#AFADB5',
    'accent': '#b5460f',
};

export { COLOR_MAP };

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
    color,
    width = 24,
    height = 24,
    className,
    children,
    style, 
    ...attrs
}) => {
    const combinedStyle: React.CSSProperties = {
        ...style,
        ...(color ? { color: COLOR_MAP[color] } : {}),
    };
    
    return (
        <svg
            className={cn(className, styles.icon)}
            width={width}
            height={height}
            style={combinedStyle}
            preserveAspectRatio='xMidYMid meet'
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attrs}
        >
            {children}
        </svg>
    );
};

export default Icon;