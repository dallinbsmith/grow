import React from "react";

import IndividualComponent from "./IndividualComponent"
import ListComponent from "./ListComponent"

export default class Senators extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                names: []
            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.contactClick = this.contactClick.bind(this)
            this.backToList = this.backToList.bind(this)
        }
        contactClick(sen) {
            this.setState(() => ({
                selected: true,
                repName: sen.name,
                party: sen.party,
                location: sen.state,
                district: sen.district,
                phone: sen.phone,
                office: sen.office,
                link: sen.link
            }));
            console.log(this.state)
        }
        backToList() {
            this.setState(() => ({
                selected: false
            }));
        }

        handleSubmit(e) {
            let names = this.props.represent.map((sen) => {
                return sen
            })
            this.setState(() => ({
                names: names
            }));
        }
    render() {
            if (this.props.represent !== "" && this.state.selected === true) {
                return (
                    <IndividualComponent
                    repName = {this.state.repName}
                    party = {this.state.party}
                    location = {this.state.location}
                    district = {this.state.district}
                    phone = {this.state.phone}
                    office = {this.state.office}
                    link = {this.state.link}
                    backToList = {this.backToList}
                    />
                )
            } else if (this.props.represent !== "") {
                return ( < div >
                    <div onClick = {this.handleSubmit}
                        className = "submit" > SUBMIT < /div>
                    <div className = "list-main-container"
                        style = {{height: toString((this.props.represent.length) * 29 + 18) + "px"}} > < /div>
                    <div className = "list-container"
                        style = {{height: toString((this.props.represent.length) * 29) + "px"}} >
                        {this.state.names.map((sen, i) => {
                            return (
                                <ListComponent
                                    sen = {sen}
                                    name = {sen.name}
                                    key = {sen.name + i}
                                    contactClick = {this.contactClick}
                                    />)
                                })
                            }
                        </div>
                    </div>
                )
            }else {
                return null
                    }
                }
            }
