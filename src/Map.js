import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Map.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {

  static propTypes = {
      points:PropTypes.array.isRequired,
      selectedPoint:PropTypes.number,
      onPointSelected:PropTypes.func.isRequired
    }

  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

   onMarkerClick = (props, marker) => {
     this.setState({
       activeMarker: marker,
       selectedPlace: props,
       showingInfoWindow: true
     });

     const { points, onPointSelected } = this.props
     for(var i = 0; i < points.length; i++) {
       let point = points[i];
       if(point.title === marker.title) {
         onPointSelected(point.id);
         break;
       }
     }
   }


  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {

    const style = {
      width: '100%',
      height: '100%'
    }

    const { points, selectedPoint } = this.props
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
//sets up map
    return(
      <Map aria-label='map of locations'
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 39.7392,
          lng: -104.9848
        }}
        bounds={bounds}
        zoom={12}
      >
      {points.map((point)=> (
        <Marker
          ref={'marker-'+ point.id}
          key={point.id}
          onClick={this.onMarkerClick}
          title={point.title}
          name={point.title}
          position={{lat: point.lat, lng: point.lng}}
          backgroundColor="#00FF00"
          icon={selectedPoint === point.id ? {
            url: "/marker-icon.png"
          } : null }
        />
      ))}


      <InfoWindow
        marker={this.state.activeMarker}
        onClose={this.onInfoWindowClose}
        visible={this.state.showingInfoWindow}>
        <div>
          <h3>{this.state.selectedPlace.name}</h3>
        </div>
      </InfoWindow>

      </Map>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Loading...</div>
)
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCwBJFP9M-JYwwgTsmepSEmw2PwWNXjNGI"),
  LoadingContainer: LoadingContainer
})(MapContainer)
