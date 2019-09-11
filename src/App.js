import React, { Component } from 'react'
import { connect } from 'react-redux';

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props, context) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    this.doNothing = this.doNothing.bind(this);
  }
  
  doNothing(event) {
    // Do nothing. This is here so that click events are generated on Safari iOS.
  }

  render() {
    return (
      <div onClick={this.doNothing}>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    menu: state.menu,
    overlay: state.overlay
  }
}

const AppContainer = connect(mapStateToProps, null)(App);
export default AppContainer;
