import React from 'react';

type Props = {
  type: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({children, type = "button"}) => {
    return (
        <div>
            <button type={type}>{children}</button>
        </div>
    )
}

export default Button;