import { FC } from 'react';
import './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

export const ButtonAlt: FC<ButtonProps> = ({
    className,
    children,
    appearence = 'small',
    ...props
}) => {
    return (
        <button
            className={cn(
                styles['button'],
                styles['accent'],
                styles[appearence],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

function Button({
    children,
    className,
    appearence = 'small',
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                styles['button'],
                styles['accent'],
                styles[appearence],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
