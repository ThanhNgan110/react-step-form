import clsx from 'clsx'
import React from 'react'

interface SimpleButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'outline' | 'success' | 'disabled'
}

interface IVariant {
  [key: string]: string
}

function SimpleButton({ type = 'button', children, disabled, variant = 'primary', ...restProps }: SimpleButtonProps) {

  const variantClasses: IVariant = {
    primary: "text-white bg-blue-500 rounded-lg hover:bg-blue-600",
    disabled: "text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200",
    success: "text-white bg-green-500 hover:bg-green-600",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      // className="text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 "
      // className="text-white bg-green-500 hover:bg-green-600"
			className={clsx(
        'flex items-center px-4 py-2 rounded-lg transition-colors',
        disabled && 'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant]
      )}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default SimpleButton