import React from 'react'

interface TypographyProps extends React.PropsWithChildren {
  component?: string
}

function Typography({ children, component = 'div' }: TypographyProps) {
  const Component = component || React.Fragment;
  
  return (
    <Component>{children}</Component>
  )
}

export default Typography