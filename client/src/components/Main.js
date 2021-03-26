import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketIOClient from "socket.io-client";
import App from "./App";
import Home from './Home';
const endpoint = "http://localhost:4676";
const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomHash: 'xyzabc'
    }
  }

  // componentDidMount() {
  //     console.log(this.props)
  //     //this.fetchHash()
  //     console.log(this.state.roomHash)
  // }

  // fetchHash = () => {
  //   console.log('inside hash')
  //   fetch("https://random.justyy.workers.dev/api/random/?cached&n=15")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({
  //         roomHash: data,
  //       });
  //     });
  // };
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home roomHash={this.state.roomHash} />}></Route>
          <Route path={`/code/${this.state.roomHash}`} component={() => <App socket={socket} />}></Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
