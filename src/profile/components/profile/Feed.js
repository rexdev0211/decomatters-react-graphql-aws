import React, { useState } from 'react'

const Designs = ({ data, card, ...props }) => {
  if (!card) return <></>
  if (!data) return <></>

  return (
    <>
      {data.map((d, i) => {
        const Card = card
        return <Card key={i} data={d} {...props} />
      })}
    </>
  )
}

export default Designs
