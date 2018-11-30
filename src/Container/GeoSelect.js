import React from 'react';
import Geosuggest from 'react-geosuggest';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GeoSelect extends React.Component {
  /**
   * Render the example app
   */
   onSuggestSelect(suggest) {
     console.log(suggest);
   }

  render() {

    return (
      <div>
        <Geosuggest
          ref={el=>this._geoSuggest=el}
          placeholder="Pickup location..."
          onSuggestSelect={this.onSuggestSelect}
          location={new this.props.google.maps.LatLng(53.558572, 9.9278215)}
          radius="20" />

        <button onClick={()=>this._geoSuggest.focus()}>Focus</button>
        <button onClick={()=>this._geoSuggest.update('New Zealand')}>Update</button>
        <button onClick={()=>this._geoSuggest.clear()}>Clear</button>
        <button onClick={()=>this._geoSuggest.selectSuggest()}>Search</button>
      </div>
    )
  }
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg')
})(GeoSelect);
