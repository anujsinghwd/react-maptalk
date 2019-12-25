import React, { Component } from 'react'
import ReactMaptalk from 'react-maptalk';
import './index.css';
import PropTypes from 'prop-types';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      current: false,
      lat: 27.4534,
      lon: 78.43535
    }
    this.locationGet = this.locationGet.bind(this);
    this.getCenter = this.getCenter.bind(this);
  }

  onMapEvent = (props, map, e) => {
      var answer = document.getElementById('calculated-area');
      answer.innerHTML = '<p>' + new Date().toLocaleTimeString() +': click map on ' + e.coordinate.toFixed(5).toArray().join() + '</p>';
  };

  locationGet(){
    this.setState({
      current: true
    })
  }

  getCenter(){
    var center = window.map.getCenter();
    var answer = document.getElementById('calculated-area');
    answer.innerHTML = '<p>Center: ' + [center.x.toFixed(5), center.y.toFixed(5)].join() + '</p>';
  }

  render () {
    const { current, lat, lon } = this.state;
    return (
        <div>
        <ReactMaptalk 
          lat={lat}
          lon={lon}
          centerAroundCurrentLocation= {current}
          onClick={this.onMapEvent}
        />
        <div className="calculation-box">
          <div id="calculated-area"></div>
          <div>
            <button onClick={this.locationGet}>CurrentLocation</button>
            <br />
            <button onClick={this.getCenter}>GetCenter</button>
          </div>
        </div>
        </div>
    )
  }
}