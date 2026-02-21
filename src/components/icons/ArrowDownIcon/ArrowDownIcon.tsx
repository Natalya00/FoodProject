import * as React from 'react'
import Icon, { type IconProps, COLOR_MAP } from '../Icon';

export type ArrowDownIconProps = IconProps & {
  customColor?: string;
};

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({ color = 'notset', customColor, ...attrs }) => {
    const fillColor = customColor ?? COLOR_MAP[color];
    return (
        <Icon {...attrs} viewBox='0 0 24 24'>
            <path fill={fillColor} d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z" />
        </Icon>
    );
}

export default ArrowDownIcon;
