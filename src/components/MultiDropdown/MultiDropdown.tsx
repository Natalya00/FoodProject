import React, { useState, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';
import inputStyles from './MultiDropdownInput.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.value.toLowerCase().includes(filter.toLowerCase())
    );
  }, [options, filter]);

  const handleInputClick = () => {
    if (disabled) return;
    
    if (!isOpen) {
      setFilter('');
    }
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);
    if (isSelected) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const title = getTitle(value);
  const isEmpty = value.length === 0;

  const inputValue = isOpen ? filter : (isEmpty ? '' : title);
  const inputPlaceholder = isOpen ? (isEmpty ? title : filter) : title;

  return (
    <div 
      className={classNames(styles.container, className)} 
      ref={rootRef}
    >
      <Input
        value={inputValue}
        placeholder={inputPlaceholder}
        disabled={disabled}
        onClick={handleInputClick}
        onChange={(val) => {
          setFilter(val);
          setIsOpen(true);
        }}
        className={classNames(!isEmpty && !isOpen && inputStyles.inputValue)}
        afterSlot={
          <ArrowDownIcon 
            color="secondary" 
            className={classNames(styles.icon, isOpen && styles.iconOpened)} 
          />
        }
      />

      {isOpen && !disabled && (
        <div className={styles.menu}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const isSelected = value.some((v) => v.key === opt.key);
              return (
                <div
                  key={opt.key}
                  className={classNames(
                    styles.option, 
                    isSelected && styles.selected
                  )}
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt.value}
                </div>
              );
            })
          ) : (
            <div className={styles.option} style={{ color: '#afb1b6' }}>
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;