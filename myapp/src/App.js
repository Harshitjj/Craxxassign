// App.js
import React, { Component } from 'react';
import AccountList from './AccountList';
import RepaymentModel from './RepaymentModel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      monthlyPayment: 0,
    };
  }

  handleMonthlyPaymentChange = (event) => {
    // Parse the input value to a float
    const amount = parseFloat(event.target.value);
    this.setState({ monthlyPayment: amount });
  }

  handleAddAccount = (account) => {
    this.setState((prevState) => ({
      accounts: [...prevState.accounts, account],
    }));
  }

  render() {
    return (
      <div>
        <h1>Account Management App</h1>
        <label>
          Monthly Payment: 
          <input
            type="number"
            value={this.state.monthlyPayment}
            onChange={this.handleMonthlyPaymentChange}
          />
        </label>
        <AccountList
          accounts={this.state.accounts}
          onAddAccount={this.handleAddAccount}
        />
        <RepaymentModel
          accounts={this.state.accounts}
          monthlyPayment={this.state.monthlyPayment}
        />
      </div>
    );
  }
}

export default App;
