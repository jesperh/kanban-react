import * as React from "react";
import "./App.css";
import { createStore } from "redux";
import { task } from "./reducers/index";
import { Provider } from "react-redux";
import Board from "./containers/Board";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";

const store = createStore(task);

class App extends React.Component {
  public render() {
    return (
      <div id="root" className="App full-height">
        <header className="App-header">
          <h1 className="App-title">My awesome TODO app</h1>
        </header>
        <div>
          <Provider store={store}>
            <DragDropContextProvider backend={HTML5Backend}>
              <Board />
            </DragDropContextProvider>
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;
