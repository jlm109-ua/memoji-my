import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    variant = 'default',
    size = 'md',
    ...props
}) => {
    const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50'
    const variantStyles = {
        default: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    }
    const sizeStyles = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    }

    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    return (
        <button className={buttonStyles} {...props}>
            {children}
        </button>
    )
}