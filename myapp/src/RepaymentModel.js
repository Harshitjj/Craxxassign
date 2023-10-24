import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

class RepaymentModel extends Component {
  chartRef = React.createRef(); 

  chart = null; 

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accounts !== this.props.accounts || prevProps.monthlyPayment !== this.props.monthlyPayment) {
      this.destroyChart();
      this.renderChart();
    }
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  calculateRepaymentModel() {
    const { accounts, monthlyPayment } = this.props;
  
    if (!accounts || accounts.length === 0 || monthlyPayment === 0) {
      return [];
    }
  
    // Calculate the initial balance as the sum of all account balances
    const initialBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
    const balanceArray = [initialBalance]; // Set the initial balance
    const repaymentModel = [initialBalance];
  
    for (let month = 1; month < accounts.length; month++) {
      const previousBalance = balanceArray[month - 1];
      const remainingBalance = previousBalance - monthlyPayment;
      const newBalance = Math.max(remainingBalance, 0);
  
      balanceArray.push(newBalance);
      repaymentModel.push(newBalance);
    }
  
    return repaymentModel;
  }
  
//   calculateRepaymentModel() {
//     const { accounts, monthlyPayment } = this.props;
  
//     // Check if accounts is defined and not empty
//     if (!accounts || accounts.length === 0 || monthlyPayment === 0) {
//       return [];
//     }
  
//     const balanceArray = [accounts[0].balance];
//     const repaymentModel = [accounts[0].balance];
  
//     for (let month = 1; month < accounts.length; month++) {
//       const previousBalance = balanceArray[month - 1];
//       const remainingBalance = previousBalance - monthlyPayment;
//       const newBalance = Math.max(remainingBalance, 0);
  
//       balanceArray.push(newBalance);
//       repaymentModel.push(newBalance);
//     }
  
//     return repaymentModel;
//   }
  
  renderChart() {
    if (this.chart) {
      // Destroy the existing chart if it exists
      this.destroyChart();
    }

    const { monthlyPayment } = this.props;
    const repaymentModel = this.calculateRepaymentModel();

   
    
    const data = {
        labels: Array.from({ length: repaymentModel.length }, (_, i) => `Month ${i + 1}`),
        datasets: [
          {
            label: 'Repayment Model',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: repaymentModel,
          },
        ],
      };
        

   

    const chartRef = this.chartRef.current; // Get a reference to the canvas element using current

    this.chart = new Chart(chartRef, {
      type: 'line',
      data,
    
    });
  }

  render() {
    return (
      <div>
        <h2>Repayment Model</h2>
        <p>Monthly Payment: {this.props.monthlyPayment}</p>
        <canvas ref={this.chartRef} /> {/* Use the ref created with React.createRef() */}
      </div>
    );
  }
}

export default RepaymentModel;
