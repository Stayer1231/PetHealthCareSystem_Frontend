import React from 'react'
import './Button.scss'
import PropTypes from 'prop-types';
import Text from '../Text/Text';

function Button({ content, variant, onClick, className, rightIcon }) {
    return (
        <>
            {
                rightIcon ? (
                    <button className={`btn-comp ${variant} ${className} right-icon`} onClick={onClick}>
                        <Text cursor={"pointer"} content={content} type={"primary"} />
                        {rightIcon}
                    </button>
                ) : (
                    <button className={`btn-comp ${variant} ${className}`} onClick={onClick}>
                        <Text cursor={"pointer"} content={content} type={"subtitle"} />
                    </button >
                )
            }
        </>
    )
}

Button.propTypes = {
    content: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['transparent', 'filled', 'underline', 'no-layout']).isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button
