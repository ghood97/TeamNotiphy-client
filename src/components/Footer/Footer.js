import React from 'react'

const footerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
}

const Footer = (props) => {
  return (
    <p style={footerStyle} className="text-center">A website by Griffin Hood</p>
  )
}

export default Footer
