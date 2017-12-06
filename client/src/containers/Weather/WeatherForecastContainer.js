import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherForecast} from '../../components/'

import  {WeatherRequests} from '../../requests'
class WeatherForecastContainer extends Component{

   render(){
        return (
            <div className="forecastContainer">
                  <WeatherForecast {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        lat: weather.location.lat,
        long: weather.location.long,
        summary: weather.forecast.summary,
        icon: weather.forecast.icon
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)