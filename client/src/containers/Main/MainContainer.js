import React from 'react';
import {NavBottom} from '../../components/';

//Socket.io
import SocketIOClient from 'socket.io-client';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard';

class MainContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            socket: null
        }

        if (window.location.hostname === 'localhost') {
            this.socket = SocketIOClient('http://localhost:8080');
            this.props.setSocket(this.socket);
        } else {
            this.socket = SocketIOClient(window.location.hostname);
            this.props.setSocket(this.socket);
        }
    }

    componentDidMount() {
        this.socket.on('connect', function(){
            this.socket.emit('startSession', localStorage.getItem('sessionCode'));
            this.setState(function() {
                return {
                    socket: this.socket
                }
            })
        }.bind(this));
        this.socket.on('sessionCode', function(code){
            this.setState(function() {
                localStorage.setItem('sessionCode',code);
                this.props.setSessionCode(code);
                return {
                    sessionCode: code
                }
            })
        }.bind(this))
    }

    render() {
        return (
            <div> 
                {this.props.children}
                <NavBottom />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dashboardActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);