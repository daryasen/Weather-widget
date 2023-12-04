import React from "react";
import Location from "./componets/Location"
import Date from "./componets/Date";
import Forecast from "./componets/Forecast"

const API_KEY = "ec89bba80f387f33187c9f32b1d17064"

// const API_KEY = "078dff010664d9a1f14a1b6e469ec303"

class App extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         somthing: "",
         // Location
         position: "",
         city: "",
         state: [],
         correctNameCity: true,
         // Date
         date: true,
         // Forecast
         forecast: []
      }

      // Location
      this.findLocation = this.findLocation.bind(this)
      this.city = this.city.bind(this)
      this.searchCity = this.searchCity.bind(this)
      // Date
      this.changeDate = this.changeDate.bind(this)
      this.requestForcast = this.requestForcast.bind(this)
   }

   componentDidMount() {
      this.findLocation()
      this.city(this.state.position)
   }
   componentDidUpdate() {
      //  console.log(this.state.forecast.length)
       console.log(this.state.correctNameCity)
   }


   render() {
      return (
         <div className="app">
            <Location findLocation={this.findLocation} name={this.city} searchCity={this.searchCity} coords={this.state.position} city={this.state.city} state={this.state.state} />
            <Date date={this.state.date} changeDate={this.changeDate} request={this.requestForcast} correctName={this.state.correctNameCity} />
            <Forecast forecast={this.state.forecast} date={this.state.date} city={this.state.city} correctName={this.state.correctNameCity} />
         </div>
      )
   }

   // Location
   findLocation() {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
         const {
            latitude,
            longitude
         } = coords
         let geolocation = `lat=${latitude}&lon=${longitude}&`
         this.setState({ position: geolocation })
      })
   }
   city(coords) {
      if (this.state.position !== "") {
         fetch(`http://api.openweathermap.org/geo/1.0/reverse?${coords}&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then((data) => {
               this.setState({ city: `${data[0].name}` })
               this.setState({ state: `${data[0].state}` })
               this.setState({ correctNameCity: true })
            })
      }
   }
   searchCity(e) {
      if (!(e === "")) {
         this.setState({ city: `${e}` })
         this.setState({ state: [] })
         this.setState({ correctNameCity: true })
      }
   }

   // Date
   changeDate() {
      this.setState({ date: !this.state.date })
   }
   requestForcast() {
      if (this.state.date) {
         fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then((data) => {
               const dailyData = data.list.filter((reading) =>
                  reading.dt_txt.includes("12:00:00")
               );
               this.setState({ forecast: dailyData });
               this.setState({ correctNameCity: true })
            })
            .catch((error) => {
               console.log(error)
               this.setState({ city: "" })
               this.setState({ forecast: [] })
               this.setState({ correctNameCity: false })
            })
      } else {
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=${API_KEY}`)
            .then((resp) => resp.json())
            .then((data) => {
               if (data.cod === 200) {
                  this.setState({ forecast: [data] })
                  this.setState({ correctNameCity: true })
               }
               else {
                  this.setState({ city: "" })
                  this.setState({ forecast: [] })
                  this.setState({ correctNameCity: false })
               }
            })
            .catch((error) => {
               console.log(error)
            })
      }
   }
}

export default App