import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
//import SocketIOClient from "socket.io-client";
// const endpoint = "https://multiuseride.herokuapp.com";
// const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Button onClick={this.joinRoom}>
          <Link to={`/code/${this.props.roomHash}`} onClick={this.fetchHash}>
          App
        </Link>
        </Button>
      </div>
    );
  }
}

export default Home;
