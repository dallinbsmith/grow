import React from "react";

export default function IndividualComponent(props){
    return(
        <div>
            <div onClick = {props.backToList} className = "go-back">BACK TO LIST</div>
            <div className = "container-container">
                <div className = "indi-container-left">
                    <h3 className = "indi-name">{props.repName}</h3>
                    <h4 className = "indi-party">{props.party}</h4>
                </div>
                <div className = "indi-container-right">
                    <h3 className = "indi-state">{props.location}</h3>
                    <h4 className = "indi-phone">{props.phone}</h4>
                </div>
            </div>
            <div className = "indi-container-center">
                <a href = {props.link} className = "indi-link">{props.link}</a>
                <h4 className = "indi-office">{props.office}</h4>
            </div>
        </div>
    )
}
