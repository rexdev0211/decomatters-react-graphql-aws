import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import { useDispatch } from 'react-redux'
import ReactCrop from 'react-image-crop'
import styled from 'styled-components'
import { DMPrimaryButton, DMPrimaryAltButton, DMSimpleModal } from '@decormatters/dm-theme'
import { setModalOpen, setModalClose } from '../../../redux/reducers/DMReducer'

import 'react-image-crop/dist/ReactCrop.css'

import firebase from 'firebase/app'
import 'firebase/analytics'

const ActionContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: nowrap;
`

const CropModal = forwardRef(({ onOk }, ref) => {
  const dispatch = useDispatch()

  const rCrop = useRef()
  const rImg = useRef(null)

  const pixelRatio = 4
  const [image, setImage] = useState()
  const [crop, setCrop] = useState(null)
  //const [submitting, setSubmitting] = useState(false)
  const [completedCrop, setCompletedCrop] = useState(null)

  const [viewImgHeight, setViewImgHeight] = useState('750px')
  const [viewImgWidth, setViewImgWidth] = useState('750px')
  //const [setViewScale] = useState(1.0)

  const VIEW_MAX_HEIGHT = 750
  const VIEW_MAX_WIDTH = 750

  const squareCrop = useCallback(({ w, h }) => {
    if (rCrop.current.visible() === true) {
      if (!w) w = rImg.current.width
      if (!h) h = rImg.current.height

      const short = w > h ? h : w
      const aspect = 1 / 1
      const width = short
      const height = short
      const x = Math.abs(w / 2 - short / 2)
      const y = Math.abs(h / 2 - short / 2)

      const c = {
        width,
        height,
        x,
        y,
        aspect
      }

      setCrop(c)
      setCompletedCrop(c)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', squareCrop)
    return function cleanup() {
      window.removeEventListener('resize', squareCrop)
    }
  }, [image, squareCrop])

  const cropImage = () => {
    if (!completedCrop || !rImg.current) return

    const image = rImg.current

    const canvas = document.createElement('canvas')
    const crop = completedCrop
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingEnabled = false

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8)

    return dataUrl
  }

  const dataURItoBlob = dataURI => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1])
    else byteString = unescape(dataURI.split(',')[1])

    // separate out the mime component
    var mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0]

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  }

  const onLoad = useCallback(
    img => {
      rImg.current = img

      var w = img.naturalWidth
      var h = img.naturalHeight

      if (w > VIEW_MAX_WIDTH || h > VIEW_MAX_HEIGHT) {
        if (w >= h) {
          const sx = VIEW_MAX_WIDTH / w
          //setViewScale(sx)
          setViewImgWidth(VIEW_MAX_WIDTH + 'px')
          const sh = sx * h
          setViewImgHeight(sh + 'px')
          w = VIEW_MAX_WIDTH
          h = sh
        } else {
          const sy = VIEW_MAX_HEIGHT / h
          //setViewScale(sy)
          setViewImgHeight(VIEW_MAX_HEIGHT + 'px')
          const sw = sy * w
          setViewImgWidth(sw + 'px')
          w = sw
          h = VIEW_MAX_HEIGHT
        }
      } else {
        //setViewScale(1.0)
        setViewImgWidth(w + 'px')
        setViewImgHeight(h + 'px')
      }

      const sw = Math.min(w, 200)
      const sh = Math.min(h, 200)
      squareCrop({ w: sw, h: sh })

      return false
    },
    [squareCrop]
  )

  const handleClose = () => {
    firebase.analytics().logEvent('my_room_upload_cancelled', {
      content_type: 'my_room'
    })

    dispatch(setModalClose())
    rCrop.current.hide()
  }

  const handleOk = () => {
    //const cropped = cropImage()
    //const blob = dataURItoBlob(cropped)
    //var file = new File([blob], 'myroom.jpeg', { type: 'image/jpeg' })
    firebase.analytics().logEvent('my_room_upload_complete', {
      content_type: 'my_room'
    })

    //setSubmitting(true)
    if (!image) {
      rCrop.current.hide()
      //setSubmitting(false)
      return
    }

    dispatch(setModalClose())
    rCrop.current.hide()
    if (onOk) onOk(cropImage())
  }

  useImperativeHandle(ref, () => ({
    show: imgfile => {
      setImage(imgfile)
      rCrop.current.show()
      dispatch(setModalOpen())
    },
    hide: () => {
      dispatch(setModalClose())
      rCrop.current.hide()
    }
  }))

  return (
    <DMSimpleModal ref={rCrop} overlayClose={false} title="Crop Profile Image">
      <ReactCrop
        src={image}
        onImageLoaded={onLoad}
        crop={crop}
        minWidth={150}
        minHeight={150}
        keepSelection={true}
        ruleOfThirds={true}
        onChange={c => setCrop(c)}
        onComplete={c => setCompletedCrop(c)}
        imageStyle={{
          maxHeight: viewImgHeight,
          width: viewImgWidth,
          backgroundColor: 'white'
        }}
      />

      <ActionContainer>
        <DMPrimaryAltButton type="button" onClick={handleClose} style={{ marginRight: '10px' }}>
          Cancel
        </DMPrimaryAltButton>
        <DMPrimaryButton type="button" onClick={handleOk} style={{ marginLeft: '10px' }}>
          Ok
        </DMPrimaryButton>
      </ActionContainer>
    </DMSimpleModal>
  )
})

export default CropModal
