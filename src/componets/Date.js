import React from "react";

function Date(props) {
   let day = `${props.date ? "active" : ""}`
   let fiveDay = `${props.date ? "" : "active"}`
   return (
      <div className="date">
         <button><p className={day} onClick={() => {
            props.changeDate()
            props.request()
         }}>Today</p></button>
         <button><p className={fiveDay} onClick={() => {
            props.changeDate()
            props.request()
         }}>Next 5 days</p></button>
         <p className={props.correctName? "alert" : "alert-active"}>Введите название города</p>
      </div>
   )
}

export default Date