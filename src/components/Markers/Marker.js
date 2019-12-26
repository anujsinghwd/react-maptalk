import React, { Component } from 'react';
import * as maptalks from 'maptalks';
import PropTypes from 'prop-types';

class Marker extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if ((this.props.lat !== prevProps.lat) || (this.props.lon !== prevProps.lon) || (this.props.visible !== prevProps.visible)
      || (this.props.editable !== prevProps.editable) || (this.props.cursor !== prevProps.cursor) || (this.props.shadowBlur !== prevProps.shadowBlur)
      || (this.props.shadowColor !== prevProps.shadowColor) || (this.props.draggable !== prevProps.draggable)
      || (this.props.dragShadow !== prevProps.dragShadow) || (this.props.textFaceName !== prevProps.textFaceName)
      || (this.props.textFill !== prevProps.textFill) || (this.props.textHorizontalAlignment !== prevProps.textHorizontalAlignment)
      || (this.props.textSize !== prevProps.textSize)) {
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
      lat, lon, visible, editable, shadowColor, shadowBlur, draggable, dragShadow, textFaceName,
      textName, textFill, textHorizontalAlignment, textSize, cursor, markerId
    } = this.props;
    map = window.map;

    if(this.marker){
        this.removeLayer(this.marker);
    }

    let point = new maptalks.Marker(
      [lon, lat],
      {
        visible: visible,
        editable: editable,
        cursor: cursor,
        shadowBlur: shadowBlur,
        shadowColor: shadowColor,
        draggable: draggable,
        dragShadow: dragShadow,
        drawOnAxis: null,
        symbol: {
          'textFaceName': textFaceName,
          'textName': textName,
          'textFill': textFill,
          'textHorizontalAlignment': textHorizontalAlignment,
          'textSize': textSize
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

Marker.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  visible: PropTypes.bool,
  editable: PropTypes.bool,
  cursor: PropTypes.string,
  shadowBlur: PropTypes.number,
  draggable: PropTypes.bool,
  dragShadow: PropTypes.bool,
  shadowColor: PropTypes.string,
  textFaceName: PropTypes.string,
  textName: PropTypes.string,
  textFill: PropTypes.string,
  textHorizontalAlignment: PropTypes.string,
  textSize: PropTypes.number
}

Marker.defaultProps = {
  lat: 28.774929,
  lon: 78.419416,
  visible: true,
  editable: true,
  cursor: 'pointer',
  shadowBlur: 0,
  shadowColor: 'black',
  draggable: false,
  dragShadow: false,
  drawOnAxis: null,
  textFaceName: 'sans-serif',
  textName: 'ReactMapTalks',
  textFill: '#34495e',
  textHorizontalAlignment: 'right',
  textSize: 40
}

export default Marker;