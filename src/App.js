import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CMSDisplay from "./components/CMSDisplay";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <CMSDisplay />
        <Footer />
      </div>
    );
  }
}

export default App;
