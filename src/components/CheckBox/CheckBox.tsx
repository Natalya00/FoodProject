import React from 'react';
import classNames from 'classnames';
import CheckIcon from '../icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  checked,
  disabled,
  onChange,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className={classNames(styles.container, disabled && styles.disabled, className)}>
      <input
        {...rest}
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <div className={styles.checkmark}>
        <CheckIcon className={styles.icon} width={40} height={40} />
      </div>
    </label>
  );
};

export default CheckBox;
