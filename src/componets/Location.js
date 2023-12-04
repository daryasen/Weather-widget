import React from "react";

function Location(props) {
   const input = document.querySelector("#input")

   return (
      <div className="location">
         <div className="location-geo" >
            <button className="loc" onClick={() => {
               props.findLocation()
               props.name(props.coords)
            }}>
               <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                  <path
                     d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                     stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                     d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                     stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
         </div>
         <p>{props.city}</p>
         <p>{props.state}</p>
         <div className="search">
            <button onClick={() => {
               props.searchCity(input.value)
               input.value = ""
            }}>
               <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                     d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z"
                     fill="#979797" />
               </svg>
            </button>
            <input id="input" type="text" placeholder="search city" />
         </div>
      </div>
   )
}

export default Location