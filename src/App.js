import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {addCustomerAction, delCustomerAction} from './store/customerReducer'
import { fetchCustomers } from './asyncActions/customers';

function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)


  const addCash = (cash) => {
    dispatch({type:"ADD_CASH", payload: cash})
  }

  const getCash = (cash) => {
    dispatch({type:"GET_CASH", payload: cash})

  }

  const addCustomer = (name) => {
    if (name && /^[\p{L}\s]+$/u.test(name) && /\S/.test(name)) {
      const words = name.split(' ');
      const customer = {
        name: words.map(word => {
          if (/^[\p{Script=Cyrillic}]+$/.test(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
        }).join(' '),
        id: Date.now(),
      };
      dispatch(addCustomerAction(customer));
    }
  };


  const removeCustomer = (customer) => {
    dispatch(delCustomerAction(customer.id))
  }


  return (
    <div className="App">
      <div className='CashDiv'>Balance: {cash}</div>
      <div style={{display:'flex'}}>
        <button onClick={() => addCash(Number(prompt()))}>Add</button>
        <button onClick={() => getCash(Number(prompt()))}>Get</button>
        <button onClick={() => addCustomer(prompt())}>Add customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>Add many customer</button>
      </div>
      {customers.length > 0 ?
      <div>
        {customers.map(customer =>
          <div className='nameDiv' key={customer.id} onClick={() => removeCustomer(customer)}>
            {customer.name}
          </div>
        )}

      </div>
      :
      <div className='clientsDiv'>
        No clients!
      </div>
      }
    </div>
  );
}

export default App;
