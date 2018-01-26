import React from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js';
import SearchResults from '../../Components/SearchResults/SearchResults.js';
import Playlist from '../../Components/PlayList/PlayList.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const trackExists = this.state.playlistTracks.some( currentTrack => currentTrack.id === track.id );

    if (!trackExists) {
      let updatedPlaylist = this.state.playlistTracks.concat(track);
      this.setState({playlistTracks: updatedPlaylist});
    }
  }

  removeTrack(track) {
    const trackExists = this.state.playlistTracks.some( currentTrack => currentTrack.id === track.id );

    if (trackExists) {
      let indexOfTrack = this.state.playlistTracks.indexOf(track);
      this.state.playlistTracks.splice(indexOfTrack,1);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(newPlaylist) {
    let trackURIs = this.state.playlistTracks.map( track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
