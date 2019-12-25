import React, { Component } from 'react';
import * as maptalks from 'maptalks';
import PropTypes from 'prop-types';

class Marker extends Component {

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
          (this.props.lat !== prevProps.lat) || (this.props.lon !== prevProps.lon)) {
            this.renderMarker();
        }
    }

    renderMarker() {
        let {
            map, lat, lon
          } = this.props;
      
        let point = new maptalks.Marker(
            [lon, lat],
            {
              visible : true,
              editable : true,
              cursor : 'pointer',
              shadowBlur : 0,
              shadowColor : 'black',
              draggable : false,
              dragShadow : false, // display a shadow during dragging
              drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
              symbol : {
                'textFaceName' : 'sans-serif',
                'textName' : 'MapTalks',
                'textFill' : '#34495e',
                'textHorizontalAlignment' : 'right',
                'textSize' : 40
              }
            }
          );
          
          if(window.map){
            console.log(works);
            this.marker = new maptalks.VectorLayer('vector', point).addTo(window.map);
          }
    }

    render() {
        return null;
    }
}

Marker.propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    map: PropTypes.object
}

export default Marker;