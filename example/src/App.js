import React, { Component } from 'react'
import { ReactMaptalk, Marker } from 'react-maptalk';
import './index.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: false,
      lat: 27.4534,
      lon: 78.43535,
      textSizeState: 20
    }
    this.locationGet = this.locationGet.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }

  onMapEvent = (props, map, e) => {
    var answer = document.getElementById('calculated-area');
    answer.innerHTML = '<p>' + new Date().toLocaleTimeString() + ': click map on ' + e.coordinate.toFixed(5).toArray().join() + '</p>';
  };

  locationGet() {
    this.setState({
      current: true
    })
  }

  getCenter() {
    var center = window.map.getCenter();
    var answer = document.getElementById('calculated-area');
    answer.innerHTML = '<p>Center: ' + [center.x.toFixed(5), center.y.toFixed(5)].join() + '</p>';
  }

  changeSize(){
      this.setState({
        textSizeState: 40
      });
  }

  render() {
    const { current, lat, lon, textSizeState } = this.state;
    return (
      <div>
        <ReactMaptalk
          lat={lat}
          lon={lon}
          centerAroundCurrentLocation={current}
          onClick={this.onMapEvent}
        />
        <Marker lat={lat} lon={lon} textSize={textSizeState} />
        <div className="calculation-box">
          <div id="calculated-area"></div>
          <div>
            <button onClick={this.locationGet}>CurrentLocation</button>
            <br />
            <button onClick={this.getCenter}>GetCenter</button>
            <br />
            <button onClick={this.changeSize}>changeSize</button>
          </div>
        </div>
      </div>
    )
  }
}