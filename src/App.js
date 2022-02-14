import { FiSearch } from 'react-icons/fi'
import './styles.css'

import { useState } from 'react'
import api from './services/Api'
function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSearch() {
    if (input === '') {
      alert('Informe o CEP')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch {
      alert('Erro na busca do CEP...')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">busque o CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o cep"
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}

export default App
