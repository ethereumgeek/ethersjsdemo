import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init, transferToken } from './HomeActions';
import './Home.css';

const TOKENS_TO_TRANSFER = 1;

class Home extends Component {
  constructor(props, context) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    this.transferTokens = this.transferTokens.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(init());
  }
  
  transferTokens(event) {
    this.props.dispatch(transferToken(TOKENS_TO_TRANSFER));
  }
  
  render() {
    return (
      <div className="homePage">
        <div className="heading">This is a demo page for using EthersJS</div>
        <div className="content">Visit the <a className="link" href="https://atstake.net/faucet" target="_blank" rel="noopener noreferrer">Atstake Faucet</a> to get free coins on Rinkeby.</div>
        <div className="content">Transfer 1 token back to the faucet by <span className="link" onClick={this.transferTokens}>clicking here</span>.</div>
        <div className="content">Latest transaction status is: <span className="highlight">{this.props.home.transactionStatus}</span>.</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    home: state.home
  }
}

const HomeContainer = connect(mapStateToProps, null)(Home);
export default HomeContainer;