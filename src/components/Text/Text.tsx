import * as React from 'react'
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const textClasses = classNames(
    styles.text,
    view && styles[view],
    weight && styles[`weight-${weight}`],
    color && styles[`color-${color}`],
    className
  );

  const style = maxLines ? {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  } : undefined;

  return (
    <Tag className={textClasses} style={style}>
      {children}
    </Tag>
  );
};

export default Text;
