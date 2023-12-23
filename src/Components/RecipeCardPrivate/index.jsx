/* eslint-disable react/prop-types */
import React from 'react'
import * as Icons from 'react-feather'

export default function RecipeCardPrivate ({ image, title, removeHandler }) {
  const styles = {
    backgroundImage: {
      backgroundImage: `url(${image})`,
      height: 160,
      width: 260,
      margin: 10,
      borderRadius: 10,
      objectFit: 'cover',
      backgroundRepeat: 'unset',
      backgroundSize: '100%',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'flex-end'
    },
    cardLable: {
      backgroundColor: '#00000088',
      color: 'white',
      width: '100%',
      height: 60,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  }

  return (
    <div className='RecipeCardPrivate'>
      <div
        style={styles.backgroundImage}>
        <div className='p-2 d-flex justify-content-between'
          style={styles.cardLable}>
          <h5 style={{ fontSize: 14 }}>{title}</h5>
          <button className='btn' style={{ color: '#cacaca' }} onClick={removeHandler}>
            <Icons.XCircle size={26}/>
          </button>
        </div>
      </div>
    </div>
  )
}
