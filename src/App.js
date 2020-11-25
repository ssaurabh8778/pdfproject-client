import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PdfDetails from "./PdfDetails";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/">
            <PdfDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
