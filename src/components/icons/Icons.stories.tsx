import React from 'react';
import { type IconProps } from './Icon';
import CheckIcon from './CheckIcon';
import ArrowDownIcon from './ArrowDownIcon';

export default {
  title: 'Icons',
  argTypes: {
    className: {
      control: 'text',
    },
    color: {
      options: ['primary', 'secondary', 'accent'],
      mapping:  ['primary', 'secondary', 'accent'],
      control: 'select'
    },
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    },
  },
};

export const Default = (props: IconProps) => (
    <div style={{ display: 'flex', gap: '20px'}}>
      <div style={{ position: 'relative', width: props.width || 24, height: props.height || 24 }}>
        <CheckIcon {...props} />
      </div>
      <div style={{ position: 'relative', width: props.width || 24, height: props.height || 24 }}>
        <ArrowDownIcon {...props} />
      </div>
    </div>
);
