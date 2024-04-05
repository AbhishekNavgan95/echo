import React from 'react'

const DangerButton = ({
    style,
    action,
    children
}) => {
  return (
    <button
    className={style}
        onClick={action}
    >{children}</button>
  )
}

export default DangerButton