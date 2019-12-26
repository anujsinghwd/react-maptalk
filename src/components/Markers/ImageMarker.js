import React, { Component } from 'react';
import * as maptalks from 'maptalks';
import PropTypes from 'prop-types';
import Logo from '../../images/1.png';


class ImageMarker extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if ((this.props.lat !== prevProps.lat) || (this.props.lon !== prevProps.lon)) {
        this.renderMarker();
    }
  }

  componentDidMount() {
    this.renderMarker(window.map);
  }

  removeLayer(layer){
    map.removeLayer(layer);
  }

  renderMarker() {
    let {
      lat, lon
    } = this.props;
    map = window.map;

    if(this.marker){
        this.removeLayer(this.marker);
    }

    let point = new maptalks.Marker(
      [lon, lat],
      {
        symbol: {
          'markerFile'   : Logo,
          'markerWidth'  : 28,
          'markerHeight' : 40,
          'markerDx'     : 0,
          'markerDy'     : 0,
          'markerOpacity': 1
        }
      }
    );

    if (map) {
      this.marker = new maptalks.VectorLayer('vector', point).addTo(map);
    }
  }

  render() {
    return null;
  }
}

ImageMarker.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number
}

ImageMarker.defaultProps = {
  lat: 28.774929,
  lon: 78.419416
}

export default ImageMarker;