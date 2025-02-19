
import './App.css'
import InputForm from './components/inputForm/InputForm'
import Output from './components/output/Output'

function App() {

  return (
    <>
      <InputForm/>
      <br /><br />
      <Output output={10}/>
    </>
  )
}

export default App
