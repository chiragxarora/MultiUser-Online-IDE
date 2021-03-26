import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketIOClient from "socket.io-client";
import App from "./App";
import Home from './Home';
const endpoint = "https://multiuseride.herokuapp.com";
const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.fetchHash = this.fetchHash.bind(this);
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
          <Route path={`/code/${this.state.roomHash}`} component={App}></Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
