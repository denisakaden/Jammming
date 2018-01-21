import React from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js';
import SearchResults from '../../Components/SearchResults/SearchResults.js';
import PlayList from '../../Components/PlayList/PlayList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: '',
        artist: '',
        album: ''
      }],
      playlistName: '',
      playlistTracks: [{
        name: '',
        artist: '',
        album: ''
      }]
    }

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks[track.id]) {
      this.state.playlistTracks[track.id].append(track);
    }
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}
