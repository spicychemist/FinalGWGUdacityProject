import React, { Component } from 'react';
import './App.css';
import MapContainer from './Map';
import LocationList from './LocationList';
import LocationInfo from './LocationInfo';

class App extends Component {

  state = {
    allPoints: [],
    points: [],
    menuActive: false,
    selectedPoint: null,
    wikiInfo:null
  };

  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
    this.hamburgerClicked = this.hamburgerClicked.bind(this);
    this.onCloseButtonClicked = this.onCloseButtonClicked.bind(this);
    this.onPointSelected = this.onPointSelected.bind(this);
    this.fetchWikipedia = this.fetchWikipedia.bind(this);
    this.setWikiInfo = this.setWikiInfo.bind(this);

    this.state = {
      allPoints: [
        {
          id: 0,
          title: "Coors Field",
          lat: 39.756111,
          lng: -104.994167,
          category: "sports"
        },
        {
          id: 1,
          title: "Broncos Stadium at Mile High",
          lat: 39.743889,
          lng: -105.02,
          category: "sports"
        },
        {
          id: 2,
          title: "Denver Zoo",
          lat: 39.75,
          lng: -104.95,
          category: "attractions"
        },
        {
          id: 3,
          title: "16th Street Mall",
          lat: 39.748611,
          lng: -104.996667,
          category: "attractions"
        },
        {
          id: 4,
          title: "Colorado State Capitol",
          lat: 39.7392,
          lng: -104.9848,
          category: "historical"
        }
      ]
    }

    this.state.points = this.state.allPoints
  }

  onFilterChange(value) {

    let points = [];
    points = this.state.allPoints.filter((point) => {
      return (point.category === value || value === 'all');
    });

    console.log(points);
    this.setState({points});
  }

  hamburgerClicked(event) {
    event.preventDefault();

    let menuActive = !this.state.menuActive;
    this.setState({menuActive});
  }

  onCloseButtonClicked() {
    let menuActive = false;
    this.setState({menuActive});
  }

  onPointSelected(point) {
    let selectedPoint = point;
    this.setState({selectedPoint});
    this.fetchWikipedia(selectedPoint);
  }

  fetchWikipedia(pointId){
    let point;
    const allPoints = this.state.allPoints;

    for (var i = 0; i < allPoints.length; i++){
      var p = allPoints[i];
      if (p.id === pointId){
        point = p;
        break;
      }
    }
    let url='https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&format=json&search=' + point.title;
    let scope = this;
    fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }).then(function(response){
      return response.json();
    }).then(function(data) {
      scope.setWikiInfo(data);
    }).catch(function(error){
      let data = [];
      scope.setWikiInfo(data);
    })
  }

  setWikiInfo(wikiInfo) {
    this.setState({wikiInfo});
  }


  render() {

    return (
      <div className="App">
        <div id="mapContainer">
          <MapContainer points={this.state.points} selectedPoint={this.state.selectedPoint} onPointSelected={this.onPointSelected} />
        </div>
        <div id="locationContainer" className={this.state.menuActive ? 'open': null} >
          <LocationList
            points={this.state.points}
            onFilterChange={this.onFilterChange}
            onCloseButtonClicked={this.onCloseButtonClicked}
            onPointSelected={this.onPointSelected}
          />
          <div id='locationInfo'>
            <LocationInfo info={this.state.wikiInfo}/>
          </div>
        </div>
        <div aria-label="Toggle Location Information" role='navigation' className="hamburger-menu" onClick={this.hamburgerClicked}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    );
  }
}

export default App;
