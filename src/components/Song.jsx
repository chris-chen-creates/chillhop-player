import React from 'react'

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className='song-container'>
      <img
        className={isPlaying ? 'rotateSong' : ''}
        alt={currentSong.name}
        src={currentSong.cover}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
      <br />
    </div>
  )
}

export default Song
