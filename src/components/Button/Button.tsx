import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  disabled,
  ...props
}) => {
  const buttonClasses = classNames(
    styles.button,
    loading && styles['button-loading'],
    disabled && styles['button-disabled'],
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader size="s" className={styles.loader} />}
      {children}
    </button>
  );
};

export default Button;
