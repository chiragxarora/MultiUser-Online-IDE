import React from "react";
import { Dropdown } from "semantic-ui-react";
import { motion } from "framer-motion";
import { languages, themes } from "../utils/util";

//Styles
import "../styles/app.css";

//Editor
import * as ace from "ace-builds";
import SocketIOClient from "socket.io-client";
//Modes
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
//Themes
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-tomorrow";

import AceEditor from "react-ace";

const endpoint = "http://127.0.0.1:4676";
const socket = SocketIOClient(endpoint, { transports: ["websocket"] });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: languages[0].template,
      currentLang: languages[0].key,
      currentMode: languages[0].mode,
      currentTheme: themes[0].value,
    };
    this.codeEditor = React.createRef();
    this.fireTyping = this.fireTyping.bind(this);
    this.onDDChange = this.onDDChange.bind(this);
    this.onThemeChange = this.onThemeChange.bind(this);
    this.runCode = this.runCode.bind(this);
    this.handleOutput = this.handleOutput.bind(this);
  }

  componentDidMount() {
    socket.on("typed", (data) => {
      this.setState({
        codeValue: data.text,
      });
    });
    socket.on("ans", (data) => {});
  }

  fireTyping = () => {
    console.log();
    socket.emit("typing", {
      text: this.codeEditor.current.editor.getValue(),
    });
  };

  onDDChange = (e, data) => {
    const selectedVal = languages.filter((v) => v.key === data.value);
    this.setState({
      currentLang: data.value,
      currentMode: selectedVal[0].mode,
      codeValue: selectedVal[0].template,
    });
  };

  onThemeChange = (e, data) => {
    const selectedTheme = themes.filter((t) => t.value === data.value);
    this.setState({
      currentTheme: data.value,
    });
  };

  runCode = () => {
    socket.emit("run", {
      code: this.codeEditor.current.editor.getValue(),
      lang: this.state.currentLang,
      input: "",
    });
  };

  handleOutput = () => {};
  style = {
    backgroundColor: "darkgrey",
    borderRadius: "1rem",
  };
  render() {
    return (
      <div>
        <Dropdown
          className="dropdown"
          style={this.style}
          placeholder="Languages"
          onChange={this.onDDChange}
          selection
          value={this.state.currentLang}
          options={languages}
        />
        <Dropdown
          className="dropdown"
          style={this.style}
          placeholder="Themes"
          selection
          onChange={this.onThemeChange}
          value={this.state.currentTheme}
          options={themes}
        />
        <AceEditor
          style={{
            margin: "3rem auto",
            width: "80vw",
            height: "70vh",
          }}
          fontSize={18}
          ref={this.codeEditor}
          mode={this.state.currentMode}
          theme={this.state.currentTheme}
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
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{
            scale: 1,
            borderRadius: "50%",
            backgroundColor: "#0db863",
          }}
          onClick={this.runCode}
          style={{
            marginLeft: "40rem",
          }}
          className="large ui teal button"
        >
          Run
        </motion.button>
      </div>
    );
  }
}

export default App;
