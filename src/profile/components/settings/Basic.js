import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
//import { useProfile } from '../context/profile'
import Layout from './Layout'
import { InputGroup, TextAreaGroup } from '../FormElements'
//import ProfileCircle from '../components/ProfileCircle'
import CropModal from './CropModal'
import { DMPrimaryAltButton, DMPrimaryAltDivButton } from '@decormatters/dm-theme'
import { saveUsername, saveProfile } from '../../store/profileReducer'

const ProfilePicContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;

  margin-top: 12px;
  margin-bottom: 12px;
`

const ProfilePic = styled.div`
  width: 148px;
  height: 148px;
  background-size: cover;
  border-radius: 50%;
  box-shadow: none;
  user-select: none;
`

const ProfilePicButtonContainer = styled.div`
  margin-left: 40px;
`

const fileInput = {
  height: '0px',
  width: '0px',
  overflow: 'hidden',
  opacity: '0'
}

const Basic = ({ scheme, onUserUpdate }) => {
  const dispatch = useDispatch()
  const rCrop = useRef()
  const rFile = useRef()

  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [edited, setEdited] = useState(false)

  //const { profile, saveProfile, saveUsername } = useProfile()
  const [username, setUsername] = useState('')
  const [ousername, setOUsername] = useState('')

  const [about, setAbout] = useState('')
  const [oabout, setOAbout] = useState('')

  const [pic, setPic] = useState('')
  const [picSubmitting, setPicSubmitting] = useState(false)

  const [error, setError] = useState(null)

  const { me } = useSelector(state => state.profile)

  useEffect(() => {
    if (!me) return

    setSubmitting(false)
    setEdited(false)
    setSaved(false)
    setPicSubmitting(false)
    if (me.uniqueDisplayName) {
      setUsername(me.uniqueDisplayName)
      setOUsername(me.uniqueDisplayName)
    } else {
      setUsername('')
      setOUsername('')
    }
    if (me.aboutMe) {
      setAbout(me.aboutMe)
      setOAbout(me.aboutMe)
    } else {
      setAbout('')
      setOAbout('')
    }
    if (me.pic) setPic(me.pic)
  }, [me])

  useEffect(() => {
    setSaved(false)
    var mod = false

    if (username !== ousername) mod = true
    if (about !== oabout) mod = true

    setEdited(mod)
  }, [username, ousername, about, oabout])

  const invalidCharacters = un => {
    const RegEx = /[^a-z\d_.]/i
    return !RegEx.test(un)
  }

  const handleSave = e => {
    if (submitting === true) return
    setError(null)
    setSubmitting(true)

    if (username !== ousername) {
      var checkName = true

      checkName = invalidCharacters(username)

      if (checkName === false) {
        setSubmitting(false)
        setError('Username cannot contain special characters')
        return
      }

      checkName = username.length < 6 ? false : true

      if (checkName === false) {
        setSubmitting(false)
        setError('Username must be between 6-15 characters long')
        return
      }
    }

    if (username !== ousername && about !== oabout) {
      dispatch(saveUsername(username)).then(d => {
        const r = d.payload
        setOUsername(username)
        dispatch(
          saveProfile({
            aboutMe: about
          })
        )
          .unwrap()
          .then(p => {
            if (r.error) {
              setSubmitting(false)
              if (r.code === 125) setError('Username must be less than 15 characters')
              else setError(r.error)
              return
            }

            setOAbout(about)
            setSubmitting(false)
            setSaved(true)

            //if(onUserUpdate) onUserUpdate()
          })
      })
    }

    if (username !== ousername) {
      dispatch(saveUsername(username)).then(d => {
        const r = d.payload
        if (r.error) {
          setSubmitting(false)
          if (r.code === 125) setError('Username must be less than 15 characters')
          else setError(r.error)
          return
        }

        setOUsername(username)
        setSubmitting(false)
        setSaved(true)
        const toUpdate = {
          uniqueDisplayName: username
        }
        if (onUserUpdate) onUserUpdate(toUpdate)
      })
    }

    if (about !== oabout) {
      const toUpdate = {
        aboutMe: about
      }
      dispatch(saveProfile(toUpdate)).then(p => {
        setOAbout(about)
        setSubmitting(false)
        setSaved(true)

        if (onUserUpdate) onUserUpdate(toUpdate)
      })
    }
  }

  const handleUpload = e => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = e => {
        rCrop.current.show(e.target.result)
        rFile.current.value = null
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = img => {
    setPicSubmitting(true)
    const thumbProfileImageData = {
      __type: 'Bytes',
      base64: img
    }

    const body = {
      thumbProfileImageData
    }

    dispatch(saveProfile(body)).then(p => {
      setPic(img)
      setPicSubmitting(false)

      const u = p.payload

      if (u.result && u.result.user) {
        const toUpdate = {
          thumbProfileImageFile: u.result.user.thumbProfileImageFile,
          pic: u.result.user.thumbProfileImageFile.url
        }

        if (onUserUpdate) onUserUpdate(toUpdate)
      }
    })
  }

  return (
    <Layout
      scheme={scheme}
      title="Profile"
      description="Anyone on DecorMatters can see this info when viewing content you create."
      onSave={handleSave}
      submitting={submitting}
      saved={saved}
      edited={edited}
    >
      {/*<Test>sdfdsfdsf</Test>*/}
      <CropModal ref={rCrop} onOk={handleCropComplete} />
      <ProfilePicContainer>
        <ProfilePic style={{ backgroundImage: `url(${pic})` }} />
        {/*<ProfileCircle pic={pic} scheme={scheme} />*/}
        <ProfilePicButtonContainer>
          <div style={fileInput}>
            <input
              ref={rFile}
              type="file"
              id="img"
              name="img"
              accept="image/png,image/jpeg"
              onChange={e => {
                handleUpload(e)
              }}
            />
          </div>
          {picSubmitting === false ? (
            <label htmlFor="img">
              <DMPrimaryAltDivButton>Change</DMPrimaryAltDivButton>
            </label>
          ) : (
            <DMPrimaryAltButton disabled={true}>Change</DMPrimaryAltButton>
          )}
        </ProfilePicButtonContainer>
      </ProfilePicContainer>

      <InputGroup
        scheme={scheme}
        title="Username"
        subtitle="(only letters, numbers, and underscores)"
        value={username}
        error={error}
        onChange={e => setUsername(e.target.value)}
      />
      <TextAreaGroup
        scheme={scheme}
        title="About me"
        value={about}
        onChange={e => setAbout(e.target.value)}
      />
    </Layout>
  )
}

export default Basic
