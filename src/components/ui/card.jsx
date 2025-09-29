import React from 'react'

const Card = React.forwardRef(({ 
  className = '', 
  children,
  ...props 
}, ref) => {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm'
  
  return (
    <div
      ref={ref}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardContent = React.forwardRef(({ 
  className = '', 
  children,
  ...props 
}, ref) => {
  const baseClasses = 'p-6 pt-0'
  
  return (
    <div
      ref={ref}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

export { Card, CardContent }