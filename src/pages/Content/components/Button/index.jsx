import React from 'react';
import './button.scss';

const Button = ({ children, onClick, className }) => {
    return (
        <div className={`button ${className}`} onClick={onClick}>
            <button>{children}</button>
        </div>
    );
};

export default Button;
