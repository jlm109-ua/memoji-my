import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    const cardStyles = `bg-white rounded-lg shadow-md ${className}`

    return (
        <div className={cardStyles} {...props}>
            {children}
        </div>
    )
}