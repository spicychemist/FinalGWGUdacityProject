import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './LocationInfo.css';


class LocationInfo extends Component{

  static propTypes = {
    info:PropTypes.array
  }

  render(){
    const {info} = this.props;

    let description = <p />;
    let urlTag = <p />
    if(info) {
      if(info[2] && info[2][0] && info[2][0].length > 0) {
        description = <p>{info[2][0]}</p>
      }else {
        description = <p>More information is unavailable at this time.</p>;
      }

      if(info[3] && info[3][0]) {
        urlTag = <p>{info[3][0]}</p>
      }
    }
    return(
      <div>
        {description}
        {urlTag}
      </div>
    );
  }
}
export default LocationInfo;
