import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import * as maptalks from 'maptalks';

const evtNames = ['click'];

const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

export default class ReactMaptalk extends Component {
  constructor(props){
    super(props);
    const { lat, lon, zoom, style, centerAroundCurrentLocation } = this.props;
    this.state = {
        lat: lat,
        lon: lon,
        zoom: zoom,
        style: style,
        centerAroundCurrentLocation: centerAroundCurrentLocation
    };
  }

  componentDidMount(){
      if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                  const coords = pos.coords;
                  this.setState({
                          lat: coords.latitude,
                          lon: coords.longitude
                  })
              })
          }
      }
      this.loadMaps();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.lat !== this.props.lat) || (prevProps.lon !== this.props.lon) || (prevProps.zoom !== this.props.zoom) || (prevProps.style !== this.props.style)) {
      this.loadMap();
    }
    if ((prevState.lat !== this.state.lat) || (prevState.lat !== this.state.lat)) {
      this.recenterMap();
    }
    if(prevState.centerAroundCurrentLocation !== this.props.centerAroundCurrentLocation){
      if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                  const coords = pos.coords;
                  this.setState({
                          lat: coords.latitude,
                          lon: coords.longitude
                  }, () => {
                      this.recenterMap();
                  })
              })
          }
      }
    }
  }

  recenterMap(){
    const map = this.map;
    const { lat, lon } = this.state;
    if (map) {
        map.panTo([lon, lat]);
        // map.animateTo({
        //   center: [lon, lat],
        //   zoom: 13,
        //   pitch: 0,
        //   bearing: 20
        // }, {
        //   duration: 4000
        // });
    }
  }

  loadMaps(){
        const { lat, lon, zoom, style } = this.props;
        this.map = new maptalks.Map(this.mapContainer ,{
          center: [lon, lat],
          zoom: zoom,
          baseLayer: new maptalks.TileLayer('base', {
            urlTemplate: `https://{s}.basemaps.cartocdn.com/${style}_all/{z}/{x}/{y}.png`,
            subdomains: ['a','b','c','d'],
            attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
          })
        });

        evtNames.forEach(e => {
          this.map.on(e, this.handleEvent(e));
        });

        window.map = this.map;
  }

  

  handleEvent(evtName){
    let timeout;
    const handlerName = `on${camelize(evtName)}`;;

    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
  }

  renderChildren() {
    const {children} = this.props;
    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        lat: this.state.lat,
        lon: this.state.lon
      });
    })
  }

  render() {
    return (
        <div ref={el => this.mapContainer = el} className={styles.mapContainer}>
            {this.renderChildren()}
        </div>
    )
  }
}

ReactMaptalk.propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number,
    style:  PropTypes.string,
    centerAroundCurrentLocation: PropTypes.bool
};

evtNames.forEach(e => ReactMaptalk.propTypes[`on${camelize(e)}`] = PropTypes.func);

ReactMaptalk.defaultProps = {
  zoom: 13,
  lat: 28.774929,
  lon: 78.419416,
  style: "light",
  centerAroundCurrentLocation: false
}

evtNames.forEach(e => ReactMaptalk.defaultProps[`on${camelize(e)}`] = function() {});
