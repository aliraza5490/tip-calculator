import * as React from 'react';
import './style.css';

export default function App() {
  const [bill, setBill] = React.useState(0);
  const [billPerPerons, setBillPerPerson] = React.useState(0);
  const [tipPerPerson, setTipPerPerson] = React.useState(0);
  const [numOfPerson, setNumOfPerson] = React.useState(0);
  const [tipPercentage, setTipPercentage] = React.useState(0);

  const handleBillChange = (e) => {
    const data = {
      bill: Number(e.target.value),
      tipPercentage: Number(tipPercentage),
      numOfPerson: Number(numOfPerson),
    };
    setBill(e.target.value);
    updateDisplay(data);
  };

  const handleNumOfPeopleChange = (e) => {
    const data = {
      bill: Number(bill),
      tipPercentage: Number(tipPercentage),
      numOfPerson: Number(e.target.value),
    };
    setNumOfPerson(e.target.value);
    updateDisplay(data);
  };

  const handleTipPercentageChange = (e) => {
    // https://stackoverflow.com/questions/27784212/how-to-use-radio-buttons-in-reactjs
    const { name, value } = e.target;
    if (name == 'tip') {
      const data = {
        bill: Number(bill),
        tipPercentage: Number(value),
        numOfPerson: Number(numOfPerson),
      };
      setTipPercentage(value);
      updateDisplay(data);
    }
  };

  const updateDisplay = (data) => {
    // console.table({ bill, tipPercentage, numOfPerson });
    console.table(data);
    if (!data['numOfPerson']) {
      setBillPerPerson(0);
      setTipPerPerson(0);
    } else {
      const tipPerPeople = Number(
        (
          ((data['tipPercentage'] / 100) * data['bill']) /
          data['numOfPerson']
        ).toFixed(2)
      );
      setTipPerPerson(tipPerPeople);
      const billPerPeople = Number(
        (data['bill'] / data['numOfPerson']).toFixed(2)
      );
      setBillPerPerson(Number((billPerPeople + tipPerPeople).toFixed(2)));
    }
  };

  const handleCustomTipFocus = () => {
    const checkedBox = document.querySelector(
      "input[type='radio']:checked"
    );
    if (checkedBox) {
      checkedBox.checked = false;
    }
  };

  const reset = () => {
    setBill(0);
    setNumOfPerson(0);
    setTipPerPerson(0);
    setBillPerPerson(0);
    setTipPercentage(0);
    handleCustomTipFocus();
  };

  return (
    <React.Fragment>
      <header>
        <div className="logo">
          <img src="/images/logo.svg" alt="splitter logo" />
        </div>
      </header>

      <main>
        <div className="calculator">
          <div className="bill">
            <label htmlFor="bill">Bill</label>
            <div className="input">
              <img src="/images/icon-dollar.svg" alt="dollar icon" />
              <input
                type="text"
                id="bill"
                onChange={handleBillChange}
                value={bill}
              />
            </div>
          </div>
          <div className="tip">
            <label>Select Tip %</label>
            <div
              className="tip-container"
              id="tip-input"
              onChange={handleTipPercentageChange}
            >
              <input id="tip-5" type="radio" name="tip" value="5" />
              <label className="tip-label" htmlFor="tip-5">
                5%
              </label>
              <input id="tip-10" type="radio" name="tip" value="10" />
              <label className="tip-label" htmlFor="tip-10">
                10%
              </label>
              <input id="tip-15" type="radio" name="tip" value="15" />
              <label className="tip-label" htmlFor="tip-15">
                15%
              </label>
              <input id="tip-25" type="radio" name="tip" value="25" />
              <label className="tip-label" htmlFor="tip-25">
                25%
              </label>
              <input id="tip-50" type="radio" name="tip" value="50" />
              <label className="tip-label" htmlFor="tip-50">
                50%
              </label>
              {/* <!-- Custom Tip --> */}
              <input
                type="text"
                placeholder="Custom"
                name="tip"
                id="tip"
                onFocus={handleCustomTipFocus}
              />
            </div>
          </div>

          <div className="people-num">
            <label htmlFor="people">Number of People</label>
            <div className="input">
              <img src='/images/icon-person.svg' alt="person icon" />
              <input
                type="text"
                id="people"
                onChange={handleNumOfPeopleChange}
                value={numOfPerson}
              />
            </div>
          </div>
        </div>
        <div className="display">
          <div className="bar">
            <div className="info">
              <h4>Tip Amount</h4>
              <h5>/ person</h5>
            </div>
            <h2>${tipPerPerson}</h2>
          </div>

          <div className="bar">
            <div className="info">
              <h4>Total</h4>
              <h5>/ person</h5>
            </div>
            <h2>${billPerPerons}</h2>
          </div>
          <button onClick={reset}>Reset</button>
        </div>
      </main>

      <footer>
        <div className="attribution">
          Coded by{' '}
          <a href="https://linkedin.com/aliraza5490" target="_blank">
            Ali Raza
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
}
