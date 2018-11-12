import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './LocationList.css'

class LocationList extends Component {

  static propTypes = {
    points:PropTypes.array.isRequired,
    onFilterChange:PropTypes.func.isRequired,
    onCloseButtonClicked:PropTypes.func.isRequired,
    onPointSelected:PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.closeButtonClicked = this.closeButtonClicked.bind(this);
    this.locationClicked = this.locationClicked.bind(this);
  }

  onSelectChange(event) {
    const{ onFilterChange } = this.props;
    onFilterChange(event.target.value)
  }

  closeButtonClicked() {
    const{ onCloseButtonClicked } = this.props;
    onCloseButtonClicked();
  }

  locationClicked(id){
    const{ onPointSelected } = this.props;
    onPointSelected(id);
  }

  render() {

    const { points } = this.props;

    return (
      <div>

          <div aria-label='close location information' id="closeButton" onClick={this.closeButtonClicked}>X</div>

          <select onChange={this.onSelectChange}>
            <option value="all">All Locations</option>
            <option value="sports">Sports Locations</option>
            <option value="attractions">Attractions</option>
            <option value="historical">Historical Locations</option>
          </select>

          <div className="location-list">
            <ul>
              {points.map((point)=> (
                <li key={point.id}>
                    <a aria-label='location information link' href='#' onClick={(e) => {
                      e.preventDefault();
                      this.locationClicked(point.id);
                    }}>{point.title}</a>
                </li>
              ))}
            </ul>
          </div>
      </div>
    )
  }

}

export default LocationList;
