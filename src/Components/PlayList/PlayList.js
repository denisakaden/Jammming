import React from 'react';
import './PlayList.css';
import TrackList from '../../Components/TrackList/TrackList.js';

export class PLayList extends React.Component {
  render() {
    return(
      <div className="Playlist">
        <input defaultValue={"New Playlist"}/>
          <TrackList tracks={this.props.playlistTracks}/>
          <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
