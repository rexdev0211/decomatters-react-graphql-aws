import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const BadgeIconContainer = styled.div`
  margin-right: 8px;
`

const BadgeCompleteEntry = ({ data, moving, onClick }) => {
  const handleClick = e => {
    if (moving !== 0) return
    onClick(data)
  }
  return (
    <BadgeIconContainer>
      <img
        src={data.badge.imageFiles[data.badge.imageFiles.length - 1].url}
        alt={data.badge.title}
        width="50"
        height="50"
        draggable={false}
        onClick={handleClick}
      />
    </BadgeIconContainer>
  )
}

const BadgeEntry = ({ data, moving, onClick }) => {
  const handleClick = e => {
    if (moving !== 0) return
    onClick(data)
  }
  return (
    <BadgeIconContainer>
      <img
        src={data.imageFiles[0].url}
        alt={data.title}
        width="50"
        height="50"
        draggable={false}
        onClick={handleClick}
      />
    </BadgeIconContainer>
  )
}

const Badges = ({ badgesComplete, badgesIncomplete, onClick }) => {
  const badgestyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    color: 'white'
  }

  const bRef = useRef()
  const [grabbing, setGragging] = useState(false)
  const [moved, setMoved] = useState(0)

  let pos = { left: 0, x: 0, y: 0 }

  const handleMouseUp = e => {
    setGragging(false)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = e => {
    const dx = e.clientX - pos.x
    bRef.current.scrollLeft = pos.left - dx
    setMoved(dx)
  }

  const handleMouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()

    pos = {
      left: bRef.current.scrollLeft,
      x: e.clientX,
      y: e.clientY
    }
    setMoved(0)
    setGragging(true)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    const ref = bRef.current
    if (ref) {
      ref.addEventListener('mousedown', handleMouseDown, { passive: false })
    }

    return () => {
      if (ref) ref.removeEventListener('mousedown', handleMouseDown)
    }
  })

  return (
    <div style={{ cursor: grabbing === true ? 'grabbing' : 'grab', ...badgestyle }} ref={bRef}>
      {badgesComplete &&
        badgesComplete.map((b, i) => (
          <BadgeCompleteEntry data={b} key={i} moving={moved} onClick={onClick} />
        ))}
      {badgesIncomplete &&
        badgesIncomplete.map((b, i) => (
          <BadgeEntry data={b} key={i} moving={moved} onClick={onClick} />
        ))}
    </div>
  )
}

export default Badges
