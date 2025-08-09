import React from 'react'
import Icon from '../atoms/icon/Icon'
import Typography from '../atoms/typography/Typography'

interface StepTitleProps {
  icon?: React.ReactNode,
  isActive?: boolean,
  component?: string,
  title?: React.ReactNode
}

function StepTitle({ icon, isActive, component, title }: StepTitleProps) {
  return (
    <>
      <Icon 
        icon={icon}
        isActive={isActive}
      />
      <Typography
        component={component}
      >
        {title}
      </Typography>
    </>
  )
}

export default StepTitle