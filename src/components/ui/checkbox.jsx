import React from 'react'

const Checkbox = React.forwardRef(({ 
  className = '', 
  checked = false,
  onCheckedChange,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = 'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked)
    }
  }
  
  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${baseClasses} ${className}`}
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      {...props}
    />
  )
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }