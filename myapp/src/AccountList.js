// AccountList.js
import React, { Component } from 'react';

class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAccount: {
        balance: 0,
      },
    };
  }

  handleBalanceChange = (event) => {
    this.setState({
      newAccount: {
        balance: parseFloat(event.target.value),
      },
    });
  }

  handleAddAccount = () => {
    this.props.onAddAccount(this.state.newAccount);
    this.setState({
      newAccount: { balance: 0 },
    });
  }

  render() {
    return (
      <div>
        <h2>Accounts</h2>
        <ul>
          {this.props.accounts.map((account, index) => (
            <li key={index}>Balance: {account.balance}</li>
          ))}
        </ul>
        <div>
          <input
            type="number"
            placeholder="Enter balance"
            value={this.state.newAccount.balance}
            onChange={this.handleBalanceChange}
          />
          <button onClick={this.handleAddAccount}>Add Account</button>
        </div>
      </div>
    );
  }
}

export default AccountList;
