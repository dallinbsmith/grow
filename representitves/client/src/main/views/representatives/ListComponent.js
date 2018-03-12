import React from "react";

export default function ListComponent(props){
    return(
        <div>
            <h3 className = "reps-name">{props.name}</h3>
            <div onClick = {() => {props.contactClick(props.sen)}} className = "contact-button">CONTACT</div>
        </div>
    )
}
