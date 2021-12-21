import { HelpCenterList } from '../components/helpcenter/HelpCenterList'
import React from 'react'
const GenerateHelpCenterList = () => {
  if (HelpCenterList)
    HelpCenterList.map(helpcenter => {
      document.write('<br>')
      document.write(
        "<div style='width:100px;border-bottom:1px solid black'>" + helpcenter.title + '</div>'
      )
      document.write('<br>')
      document.write('https://www.decormatters.com/help-center/' + helpcenter.id)
      document.write('<br>')
      helpcenter.subNav.map(list => {
        const id = list.id

        //subnav url has /cat/id/subnavid
        const url = '/help-center/' + helpcenter.id + '/' + id
        document.write('https://www.decormatters.com' + url)
        document.write('<br>')

        if (list.subNav) {
          list.subNav.map(sub => {
            const id = sub.id
            // document.write(sub.title)
            // document.write('<br>')
            document.write('https://www.decormatters.com' + url + '/' + id)
            document.write('<br>')
          })
        }
      })
    })
  return <></>
}

export default GenerateHelpCenterList
