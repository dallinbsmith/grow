import React from "react";

import {Link} from "react-router-dom";
import InlineSVG from 'svg-inline-react';

import {CongressSVG} from '../../assets/congressSVG.js';
import {SenateSVG} from '../../assets/senateSVG.js';

const congressSVG = CongressSVG
const senateSVG = SenateSVG

export default function LandingComponent(props) {
    return (<div className="map">
        <Link to="/congress" className="links">
            <div onClick={props.congressClick} className="congress-icon-container">
                <InlineSVG src={congressSVG} className="icon-fill" style={{
                        fill: props.congressActivated? '#3760ad': '#fff'
                    }}/>
                <h2 className="congress-title title-fill" style={{
                        color: props.congressActivated? '#ed3b24': '#fff'
                    }}>CONGRESS</h2>
            </div>
        </Link>
        <Link to="/senators" className="links">
            <div onClick={props.senateClick} className="senate-icon-container">
                <InlineSVG src={senateSVG} className="icon-fill senate-icon" style={{
                        fill: props.senateActivated? '#3760ad': '#fff'
                    }}/>
                <h2 className="senate-title title-fill" style={{
                        color: props.senateActivated? '#ed3b24': '#fff'
                    }}>SENATE</h2>
            </div>
        </Link>
        <h2 className="title">FIND YOUR REPRESENTATIVES</h2>
        <div className="reps-container" style={{
                display: props.senateActivated || props.congressActivated? 'block': 'none'
            }}>
            <div className="reps-inner-container"></div>
        </div>
    </div>)
}
