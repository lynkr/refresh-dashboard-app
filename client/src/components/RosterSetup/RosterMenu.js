
import React, {Component} from 'react'

import {SpokenContainer} from '../../containers'

import Team from './Team'

class RosterMenu extends Component {
    render() {
        return (
            <div className='rosterMenu'>
                <div className='rosterMenuContainer'>
                    <div className='rosterMenuTeamsContainer'>
                        <Team teamMembers={this.props.teamOne} teamName='Team 1' teamId='team1'/>
                        <Team teamMembers={this.props.teamTwo} teamName='Team 2' teamId='team2'/>
                    </div>
                    <div className='rosterMenuConfirmContainer'>
                        <div className='rosterMenuConfirmText'>
                            {this.props.context === 'readyToStart'
                                ? <div className='confirmRoster'><SpokenContainer text='Confirm roster!' /></div>
                                : <div className='settingRoster'>
                                    <span>Setting up roster....</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default RosterMenu