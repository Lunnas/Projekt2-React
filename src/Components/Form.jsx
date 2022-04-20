import React from "react";
import Select from "./Select.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: {
        EUR: 0,
        USD: 0,
        CHF: 0,
      },
      currency: null,
      amountExchange: 0,
      amount: 0,
    };
  }

  componentDidMount() {
    fetch("https://api.nbp.pl/api/exchangerates/tables/c/")
      .then((data) => data.json())
      .then((data) => {
        this.setState(() => ({
          rates: {
            USD: data[0].rates[0].ask,
            EUR: data[0].rates[3].ask,
            CHF: data[0].rates[5].ask,
          },
        }));
      })
      .catch((error) => console.log(error));
  }

  getCurrency = (currency) => {
    this.setState({ currency });
  };

  getAmount = (amount) => {
    this.setState({ amount });
  };

  converterFn = () => {
    !!this.state.currency
      ? this.setState((state) => ({
          amountExchange: state.rates[state.currency] * state.amount,
        }))
      : this.setState({ amountExchange: 0 });
  };

  render() {
    return (
      <>
        <div className="container2">
          <div>
            <Input getAmount={this.getAmount} />
            <Select getCurrency={this.getCurrency} />
            <Button
              converterFn={this.converterFn}
              disabled={!!this.state.currency}
            />
          </div>
          <h2>
            <span id="result">
              {!!this.state.currency
                ? ` ${this.state.amountExchange.toFixed(2)} PLN`
                : "Wybierz walutę z listy!"}
            </span>
          </h2>
        </div>
      </>
    );
  }
}
export default Form;
