import React from 'react'

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md'
  }
  
  const variantClasses = variants[variant] || variants.default
  const sizeClasses = sizes[size] || sizes.default
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }