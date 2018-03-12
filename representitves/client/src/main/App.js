import React from "react";
import axios from "axios"

import StateDropdown from "../snippets/StateDropdown"
import Landing from "./views/Landing";
import Representatives from "./views/representatives/Representatives";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            congressActivated: false,
            senateActivated: false,
            represent: ""
        }
        this.senateClick = this.senateClick.bind(this)
        this.congressClick = this.congressClick.bind(this)
        this.selectStateDropdown = this.selectStateDropdown.bind(this)
    }

    senateClick() {
        this.setState(() => ({
            congressActivated: false,
            senateActivated: true,
            represent: ""}));
    }
    congressClick() {
        this.setState(() => ({
            congressActivated: true,
            senateActivated: false,
            represent: ""}));
    }
    selectStateDropdown(e) {
        let reps = []
        axios.get('http://localhost:3000/' + (
            (this.state.congressActivated)? 'representatives/': 'senators/') + e.target.value).then((response) => {
            response.data.results.forEach((item) => {
                reps.push(item)
            })
        }).catch(function(error) {
            console.log(error);
        });
        this.setState({represent: reps});
    }
    render() {
        return (<div className="maincontainer">
            <Landing congressActivated={this.state.congressActivated} senateActivated={this.state.senateActivated} senateClick={this.senateClick} congressClick={this.congressClick}/>
            <StateDropdown congressActivated={this.state.congressActivated} senateActivated={this.state.senateActivated} selectStateDropdown={this.selectStateDropdown} selectedState={this.state.selectedState}/>
            <Representatives represent={this.state.represent}/>
        </div>)
    }
}
