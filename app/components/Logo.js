import * as React from 'react'


export default function Logo (props){
  const {activetype, name} = props
  let classAdd = ''
  if (activetype === name){
    classAdd = 'cardLogo activeClass'
  }else{
    classAdd = 'cardLogo'
  }

  return(
    <img className={classAdd} src={`app/assets/${name}.svg`} alt={name} />
  )
}