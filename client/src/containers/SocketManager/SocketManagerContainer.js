
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as gdaxActionCreators from '../../redux/modules/gdax'
import * as twentyOneActionCreators from '../../redux/modules/twentyOne'
import * as weatherActionCreators from '../../redux/modules/weather'

import socket from '../../config/socket';

class SocketManagerContainer extends Component {

    constructor(props) {
        super(props)

        this.state={
        };

        // Dashboard
        socket.on('connect', function(){
            socket.emit('startSession', localStorage.getItem('sessionCode'));
        });

        socket.on('sessionCode', function(code){
            localStorage.setItem('sessionCode',code);
            this.props.setSessionCode(code);
        }.bind(this));

        // TwentyOne
        socket.on('updateCards', function(cards) {
            this.props.setCards(cards);
        }.bind(this))

        // GDAX    
        socket.on('sellPriceHistoryETH', function(data) {
            this.props.setSellPriceHistoryETH(data)
        }.bind(this))

        socket.on('buyPriceHistoryETH', function(data) {
            this.props.setBuyPriceHistoryETH(data)
        }.bind(this))

        socket.on('sellPriceHistoryBTC', function(data) {
            this.props.setSellPriceHistoryBTC(data)
        }.bind(this))

        socket.on('buyPriceHistoryBTC', function(data) {
            this.props.setBuyPriceHistoryBTC(data)
        }.bind(this))

        //Weather
        socket.on('weather', function(data){
            console.log(data);
            this.props.setWeatherLocation(data);
        }.bind(this))
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }

}

function mapStateToProps({dashboard}) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...dashboardActionCreators,
            ...gdaxActionCreators,
            ...twentyOneActionCreators,
            ...weatherActionCreators
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SocketManagerContainer);