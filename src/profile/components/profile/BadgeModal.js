import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import { DMPrimaryButton, DMSimpleModal } from '@decormatters/dm-theme'

const BadgeImage = styled.img`
  width: 150px;
`

const DetailContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`

const BadgeModal = forwardRef((props, ref) => {
  const [data, setData] = useState()
  const [image, setImage] = useState()

  const tRef = useRef()

  const handleClose = () => {
    tRef.current.hide()
    if (props.onClose) props.onClose()
  }

  useImperativeHandle(ref, () => ({
    show: data => {
      setData(null)
      if (data) {
        data = data.badge ? data.badge : data
        if (data.imageFiles) {
          const last = data.imageFiles[data.imageFiles.length - 1].url
          setImage(last)
        }
        setData(data)
      }
      tRef.current.show()
    },
    hide: () => {
      tRef.current.hide()
    }
  }))

  return (
    <DMSimpleModal ref={tRef} overlayClose={true} title="Badge">
      <BadgeImage src={image} alt={data && data.title} />
      <h3>{data && data.title}</h3>
      <DetailContainer>{data && data.description}</DetailContainer>
      <DMPrimaryButton type="button" onClick={handleClose}>
        Ok
      </DMPrimaryButton>
    </DMSimpleModal>
  )
})

export default BadgeModal
