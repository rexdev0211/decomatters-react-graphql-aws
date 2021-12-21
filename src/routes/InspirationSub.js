import React from 'react'
import { useParams } from 'react-router-dom'
import Inspirations from '../components/feeds/InspirationFeed'
import Hero from '../components/heros/TitleHero'
import Menu from '../components/menus/InspirationMenu'

const InspirationSub = () => {
  const { name } = useParams()

  return (
    <div>
      <Menu />
      <Hero name={name} />
      <Inspirations />
    </div>
  )
}

export default InspirationSub
