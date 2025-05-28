import React, { Component } from "react";

class Greeting extends Component {
  render() {
    return (
      <div>
        <h1>Hello React,{this.props.name} </h1>
      </div>
    );
  }
}

export default Greeting;
