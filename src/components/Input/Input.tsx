import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, disabled, type = 'text', ...rest }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div 
        className={classNames(
          styles.container, 
          disabled && styles.disabled, 
          className
        )}
      >
        <input
          {...rest}
          ref={ref}
          type={type} 
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={styles.input}
        />
        
        {afterSlot && (
          <div className={styles.afterSlot}>
            {afterSlot}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
