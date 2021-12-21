import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
//import { useProfile } from '../context/profile'
import Layout from './Layout'
import { InputGroup, InlineGroup, CustomGroup, SelectGroup, TagsGroup } from '../FormElements'
import { countries } from '../Countries'
import { saveProfile } from '../../store/profileReducer'

const FirstNameContainer = styled.div`
  margin-right: 25px;
`

//- Radio

const radioLabel = {
  whiteSpace: 'nowrap'
}

const genderOptions = [
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Female',
    value: 'female'
  },
  {
    label: 'Non-Binary',
    value: 'pronoun'
  },
  {
    label: 'Rather not say',
    value: 'na'
  }
]

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const RadioContainer = styled.div`
  margin-right: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  align-self: center;
`

const RadioInput = styled.input`
  margin-right: 10px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  padding: 3px;
  background-clip: content-box;
  border: 1px solid #c4c4c4;
  background-color: transparent;
  border-radius: 50%;
  outline: none;

  &:checked {
    background-color: #ff5e6d;
    border: 1px solid #ff5e6d;
  }
`

const RadioLabel = styled.label`
  color: ${props => (props.scheme === 'dark' ? 'white' : 'black')};
`

const copyAndLower = ar => {
  var temp = []
  for (var i = 0; i < ar.length; i++) {
    temp.push(ar[i].toLowerCase())
  }
  return temp.sort()
}

const checkMatching = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i].toLowerCase() !== arr2[i].toLowerCase()) return false
  }

  return true
}

const Personal = ({ scheme, onUserUpdate }) => {
  //const { profile, saveProfile } = useProfile()
  //const { pic, level, dcoins, username, about, numFollowing, numFollowers, badgeRewards, badgesNotStarted, numDesigns, numMydecor, numMyrooms } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [edited, setEdited] = useState(false)

  const [fname, setFname] = useState('')
  const [ofname, setOFname] = useState('')

  const [lname, setLname] = useState('')
  const [olname, setOLname] = useState('')

  const [gend, setGender] = useState('')
  const [ogend, setOGender] = useState('')

  const [pronoun, setPronoun] = useState('')
  const [opronoun, setOpronoun] = useState('')

  const [country, setCountry] = useState('')
  const [ocountry, setOCountry] = useState('')

  const [location, setLocation] = useState('')
  const [olocation, setOLocation] = useState('')

  const [tags, setTags] = useState([])
  const [otags, setOTags] = useState([])

  const [word, setWord] = useState('')

  const { me } = useSelector(state => state.profile)

  useEffect(() => {
    if (!me) return

    setSubmitting(false)
    setEdited(false)
    setSaved(false)

    setFname(me.firstName || '')
    setOFname(me.firstName || '')

    setLname(me.lastName || '')
    setOLname(me.lastName || '')

    if (!me.gender) {
      setGender('na')
      setOGender('na')
    } else if (me.gender === '') {
      setGender('na')
      setOGender('na')
    } else if (me.gender !== 'male' && me.gender !== 'female' && me.gender !== 'na') {
      setGender('pronoun')
      setOGender('pronoun')

      setPronoun(me.gender)
      setOpronoun(me.gender)
    } else {
      setGender(me.gender)
      setOGender(me.gender)
    }

    setLocation(me.location || '')
    setOLocation(me.location || '')

    setCountry(me.country || '')
    setOCountry(me.country || '')

    if (me.interests) {
      const words = me.interests.split(' ')
      setTags(words)
      setOTags(words)
    }
  }, [me])

  useEffect(() => {
    setSaved(false)
    var mod = false

    if (fname !== ofname) mod = true
    if (lname !== olname) mod = true
    if (location !== olocation) mod = true
    if (gend !== ogend) mod = true
    if (opronoun.length > 0) {
      if (pronoun !== opronoun) mod = true
    }
    if (country !== ocountry) mod = true

    if (tags.length !== otags.length) mod = true
    else {
      const a1 = copyAndLower(tags)
      const a2 = copyAndLower(otags)

      const check = checkMatching(a1, a2)
      if (check === false) {
        mod = true
      }
    }

    setEdited(mod)
  }, [
    fname,
    lname,
    location,
    gend,
    pronoun,
    country,
    tags,
    ofname,
    olname,
    olocation,
    ogend,
    opronoun,
    ocountry,
    otags
  ])

  const handleSave = e => {
    if (submitting === true) return
    setSubmitting(true)

    var gender = gend
    if (gend === 'pronoun') gender = pronoun

    var interests = ''

    if (tags.length) {
      const words = tags.join(' ')
      interests = words
    }

    const body = {
      firstName: fname,
      lastName: lname,
      gender,
      location,
      country,
      interests
    }

    dispatch(saveProfile(body)).then(p => {
      setOFname(fname)
      setOLname(lname)
      setOLocation(location)
      setOGender(gend)
      setOpronoun(pronoun)
      setOCountry(country)
      setOTags([...tags])
      setSubmitting(false)
      setSaved(true)
      if (onUserUpdate) onUserUpdate(body)
    })
  }

  const removeTag = i => {
    const newTags = [...tags]
    newTags.splice(i, 1)
    setTags(newTags)
  }

  const inputKeyDown = e => {
    const val = e.target.value.split(' ').join('')
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return
      }
      setTags([...tags, val])
      setWord('')
    } else if (e.key === 'Backspace' && !val) {
      if (tags) {
        if (tags.length > 0) removeTag(tags.length - 1)
      }
    }
  }

  const handleWord = e => {
    setWord(e.target.value)
  }

  return (
    <Layout
      title="Personalization"
      description="Basic info to personalize your experience better on DecorMatters. This info is not visible to other people on Decormatters."
      submitting={submitting}
      saved={saved}
      edited={edited}
      onSave={handleSave}
    >
      <InlineGroup>
        <FirstNameContainer>
          <InputGroup
            scheme={scheme}
            title="First name"
            value={fname}
            onChange={e => setFname(e.target.value)}
          />
        </FirstNameContainer>
        <InputGroup
          scheme={scheme}
          title="Last name"
          value={lname}
          onChange={e => setLname(e.target.value)}
        />
      </InlineGroup>
      <CustomGroup scheme={scheme} title="Gender">
        <RadioGroup>
          {genderOptions.map((d, i) => {
            return (
              <RadioContainer key={i}>
                <RadioInput
                  type="radio"
                  id={d.value}
                  name="gend"
                  value={d.value}
                  checked={gend === d.value}
                  onChange={e => setGender(d.value)}
                />
                <RadioLabel scheme={scheme} style={radioLabel} htmlFor={d.value}>
                  {d.label}
                </RadioLabel>
              </RadioContainer>
            )
          })}
        </RadioGroup>
      </CustomGroup>
      {gend === 'pronoun' && (
        <InputGroup scheme={scheme} value={pronoun} onChange={e => setPronoun(e.target.value)} />
      )}
      <SelectGroup
        scheme={scheme}
        title="Country/Region"
        value={country}
        onChange={e => setCountry(e.target.value)}
      >
        {countries.map((d, i) => {
          return (
            <option key={i} value={d.value}>
              {d.label}
            </option>
          )
        })}
      </SelectGroup>
      <InputGroup
        scheme={scheme}
        title="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <TagsGroup
        scheme={scheme}
        title="Interests"
        tags={tags}
        word={word}
        onRemove={removeTag}
        onChange={handleWord}
        onInputKeyDown={inputKeyDown}
      />
    </Layout>
  )
}

export default Personal
