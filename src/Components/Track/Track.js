import React from 'react';

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    const reaction = (
      <a className="Track-action" onClick={this.addTrack}>
        {this.props.isRemoval ? '-': '+'}
      </a>
    );
    return reaction;
  }

  addTrack() {
    this.props.onAdd = this.props.track;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {
          this.renderAction()
        }
      </div>
    );
  }
}