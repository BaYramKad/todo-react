import React from 'react'
import className from 'classnames'
import './Badge.scss'

const Badge = ({color, onClick,  active}) => <i onClick={onClick} className={className('badge', {[`badge--${color}`] : color}, `${active}`)}></i>

export default  Badge