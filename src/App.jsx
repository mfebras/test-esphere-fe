import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const getProducts = () => {
    const headers = {
      accept: 'application/json',
      'content-type': 'application/json'
    }
    
    const options = {
      method: 'GET',
      headers,
    };

    return fetch(`http://localhost:3001/api/v1/products`, options)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((error) => {
        throw error;
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json'
    }

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        price,
        stock
      })
    };

    await fetch(`http://localhost:3001/api/v1/products`, options)
      .then((res) => res.json())
      .then(async() => await getProducts())
      .catch((error) => {
        throw error;
      });
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className='title'>
        <h1>Product List</h1>
      </div>

      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              className='input'
              type='text'
              name='name'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <input
              className='input'
              type='text'
              name='price'
              placeholder='Price'
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <input
              className='input'
              type='text'
              name='stock'
              placeholder='Stock'
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <button className='btn' type='submit'>Create</button>
        </form>
      </div>
      <div>
        {data.map((item, index) => (
          <p key={item.id}>{index + 1}. {item.name}</p>
        ))}
      </div>
    </>
  )
}

export default App
