import React, { useState, useRef } from 'react'
import './styles/app.scss'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
// Import Util
import { playAudio } from './util'
import data from './data'

function App() {
  // Ref
  const audioRef = useRef(null)
  // State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    // Calculate percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
      volume: e.target.volume,
    })
  }
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    playAudio(isPlaying, audioRef)
    return
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        currentSong={currentSong}
      />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default App
