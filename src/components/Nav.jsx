import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ setLibraryStatus, libraryStatus, currentSong }) => {
  return (
    <nav>
      <h1>Music Thingy</h1>
      <p>
        <a
          style={{ color: `${currentSong.color[0]}` }}
          href={currentSong.link}
          target='_blank'
        >
          Click here to support the artist
        </a>
      </p>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  )
}

export default Nav
