import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { Home } from "@material-ui/icons";


// functional component
const App = () => {
  return (

    <div className='center-content'>
      <HomePage/>
    </div>
  );
}


// 
{/* <h1>Testing React Code by : {name} </h1> */}
// class component
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <h1>Testing React Code</h1>
//   }
// }

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;