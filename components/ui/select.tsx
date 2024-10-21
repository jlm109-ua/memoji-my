import React, { createContext, useContext, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectContextType {
    value: string
    onChange: (value: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

interface SelectProps {
    children: React.ReactNode
    onValueChange: (value: string) => void
    defaultValue?: string
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange, defaultValue = '' }) => {
    const [value, setValue] = useState(defaultValue)
    const [open, setOpen] = useState(false)

    const handleChange = (newValue: string) => {
        setValue(newValue)
        onValueChange(newValue)
        setOpen(false)
    }

    return (
        <SelectContext.Provider value={{ value, onChange: handleChange, open, setOpen }}>
            <div className="relative inline-block text-left">
                {children}
            </div>
        </SelectContext.Provider>
    )
}

interface SelectTriggerProps {
    children: React.ReactNode
    className?: string
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className = '' }) => {
    const context = useContext(SelectContext)
    if (!context) throw new Error('SelectTrigger must be used within a Select')

    return (
        <button
            type="button"
            onClick={() => context.setOpen(!context.open)}
            className={`inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
            aria-haspopup="listbox"
            aria-expanded={context.open}
        >
            {children}
            <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
    )
}

interface SelectValueProps {
    placeholder: string
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
    const context = useContext(SelectContext)
    if (!context) throw new Error('SelectValue must be used within a Select')

    return <span>{context.value || placeholder}</span>
}

interface SelectContentProps {
    children: React.ReactNode
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
    const context = useContext(SelectContext)
    if (!context) throw new Error('SelectContent must be used within a Select')

    if (!context.open) return null

    return (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <ul tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                {children}
            </ul>
        </div>
    )
}

interface SelectItemProps {
    children: React.ReactNode
    value: string
}

export const SelectItem: React.FC<SelectItemProps> = ({ children, value }) => {
    const context = useContext(SelectContext)
    if (!context) throw new Error('SelectItem must be used within a Select')

    const selected = context.value === value

    return (
        <li
            className={`cursor-default select-none relative py-2 pl-3 pr-9 ${selected ? 'text-white bg-indigo-600' : 'text-gray-900'}`}
            id={`listbox-option-${value}`}
            role="option"
            aria-selected={selected}
            onClick={() => context.onChange(value)}
        >
            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                {children}
            </span>
            {selected && (
                <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${selected ? 'text-white' : 'text-indigo-600'}`}>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                </span>
            )}
        </li>
    )
}