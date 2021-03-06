import React from "react";
import { Dropdown } from "semantic-ui-react";
import languages from "../utils/languages";
//Styles

import "../styles/app.css";

//Editor
 import * as ace from "ace-builds";
//  import SocketIOClient from "socket.io-client";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import AceEditor from "react-ace";

let check = true;
let ld;

//  const endpoint = "http://localhost:4676";
//  const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: languages[0].template,
      currentLang: languages[0].key,
    };
    this.codeEditor = React.createRef();
    this.fireTyping = this.fireTyping.bind(this);
    this.onDDChange = this.onDDChange.bind(this);
    this.runCode = this.runCode.bind(this);
    this.handleOutput = this.handleOutput.bind(this);
  }

  componentDidMount() {
      this.props.socket.on("typed", (data) => {
        console.log(35, data.text)
        this.setState({
          codeValue: data.text,
        });
        check = true;
        console.log(check)
      });
    
    this.props.socket.on('ans',(data) => {
      console.log(data.output)
      //handleOutput(data.output)

  })
  }

  fireTyping = () => {
    ld = this.codeEditor.current.editor.getValue()
    //console.log(ld)
    if(check) {
      console.log(48, this.codeEditor.current.editor.getValue(), check);
      this.props.socket.emit("typing", {
        text: ld,
      });
      check = false;
    }
    console.log(check)
  };

  onDDChange = (e, data) => {
    const selectedVal = languages.filter((v) => v.key == data.value)
    this.setState({currentLang : data.value, codeValue: selectedVal[0].template})
  }

  runCode = () => {
    this.props.socket.emit('run', {
      code: this.codeEditor.current.editor.getValue(),
      lang: this.state.currentLang,
      input: ''
  })
  }

  handleOutput = () => {

  }

  render() {
    return (
      <div>
        <Dropdown
          placeholder="Languages"
          onChange = {this.onDDChange}
          selection
          value = {this.state.currentLang}
          options={languages}
        />

        <AceEditor
          style={{
            margin: "3rem auto",
            width: "80vw",
            height: "70vh",
          }}
          fontSize={18}
          ref={this.codeEditor}
          mode="c_cpp"
          theme="github"
          value={this.state.codeValue}
          onInput={this.fireTyping}
          showPrintMargin={false}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <div className="container">
          <button
            onClick={this.runCode}
            style={{
              marginLeft: "40rem",
            }}
            className="large ui teal button"
          >
            Run
          </button>
        </div>
      </div>
    );
  }
}

export default App;
