import React from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
    const loaderClasses = classNames(
        styles.loader,
        styles[`size-${size}`],
        className
    );

    return <div className={loaderClasses} />;
};

export default Loader;
