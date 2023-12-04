import React from "react"
import * as ReactDOMClient from "react-dom/client"
import App from "./App"
import "./main.css"




const app = ReactDOMClient.createRoot(document.getElementById("root"))
app.render(<App />)



let days = `forecast?`
let today = `weather?`

function request() {
   return fetch(`https://api.openweathermap.org/data/2.5/${today}lat=55.755864&lon=37.617698&units=metric&appid=ec89bba80f387f33187c9f32b1d17064`)
      .then((resp) => resp.json())
      .then((data) => data)
      .catch(() => console.log("Error!!!"))
}

