import React from 'react'
import Flow from "../../data/flow-1.png"
import "./objectives.css";
function Objectives() {
  return (
    <div className='objective_main'>
        <h1>Objectives</h1>
        <p>There exists no such platform where the investor can directly invest in a startup of their choice . Shark Up will bridge this gap and provide an interface for the startup to promote their idea and for the company to invest in a startup in a safe and trusted way.</p>
        <p>We at Shark Up aim to provide a platform to startups to raise external funding or capital in order to expand their businesses into new markets or locations. It also allows them to invest in research & development (R&D) or to fend off the competition. This in turn helps generate more employment</p>
        <img className='flow_img' src={Flow}/>
    </div>
  )
}

export default Objectives;