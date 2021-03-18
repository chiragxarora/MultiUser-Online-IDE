import React from "react";
import AceEditor from "react-ace";
import ReactDOM from "react-dom";
import * as ace from "ace-builds";
import SocketIOClient from "socket.io-client";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";

class App extends React.Component {
  constructor(props) {
      super(props)
    const endpoint = "http://127.0.0.1:4676";
    const socket = SocketIOClient(endpoint, {transports: ['websocket']});
  }

  render() {
    return (
      <AceEditor
        mode="c_cpp"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
