import clsx from 'clsx'
import React from 'react'

interface IconProps {
  icon?: React.ReactNode,
  isActive?: boolean
}

function Icon({ icon = null, isActive = false }: IconProps) {
  return (
    <div
      className={clsx(
        'w-12 h-12 flex items-center justify-center rounded-full mb-2',
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500' 
      )}
    >
      {icon}
    </div>
  )
}

export default Icon