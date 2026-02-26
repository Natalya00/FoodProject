import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      <img src={image} className={styles.image} alt="" />

      <div className={styles.content}>
        <div className={styles.textBlock}>
          {captionSlot}
          {title}
          {subtitle}
        </div>

        <div className={styles.footer}>
          {contentSlot}
          {actionSlot && (
            <div className={styles.actionWrapper}>
              {actionSlot}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
