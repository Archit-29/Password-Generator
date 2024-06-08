
import { useCallback,useState,useRef, useEffect } from 'react'
import './App.css'

function App() {


const [length,setLength]=useState(8)
const [numberAllowed,setnumberAllowed]=useState(false)
const [charAllowed,setcharAllowed]=useState(false)
const [lowerAllowed,setlowerAllowed]=useState(false)
const [password,setPassword]=useState("")
const[bracketAllowed,setbracketAllowed]=useState(false)


const passwordRef=useRef(null)

const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(bracketAllowed) str+="(){}[]"
  if(numberAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*"
  if(lowerAllowed) str+="abcdefghijklmnopqrstuvwxyz"

  for(let i=0;i<length;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }

  setPassword(pass)
},[length,numberAllowed,charAllowed,lowerAllowed,bracketAllowed,setPassword])

useEffect( ()=> {
  passwordGenerator()
},[length,numberAllowed,bracketAllowed,lowerAllowed,charAllowed,passwordGenerator])


const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select();
window.navigator.clipboard.writeText(password)
passwordRef.current?.setSelectionRange(0,999);
},[password])


  return (
  
  
  
  <div className="container">
    <h2 className="title">Password Generator</h2>
    <div className="result">
      <input type='text' className="text" placeholder='Password' value={password} ref={passwordRef} readOnly/>
    </div>
    <div className="length range__slider" data-min={6} data-max={32}>
      <div className="length__title field-title">
        length : {length}
      </div>
      <input id="slider" type="range" min={6} max={32} value={length} onChange={(e)=>{
        setLength(e.target.value)}} defaultValue={16} />
    </div>



    <div className="settings">
      <span className="settings__title field-title">settings</span>

      <div className="setting">
        <input type="checkbox" id="uppercase" defaultChecked={bracketAllowed} onChange={()=>{
          setbracketAllowed((prev)=>!prev)}}/>
        <label htmlFor="uppercase">Include Brackets</label>
      </div>

      <div className="setting">
        <input type="checkbox" id="lowercase" defaultChecked={lowerAllowed} onChange={()=>{
          setlowerAllowed((prev)=>!prev)}} />
        <label htmlFor="lowercase">Include Lowercase</label>
      </div>

      <div className="setting">
        <input type="checkbox"defaultChecked={numberAllowed} id="number" onChange={()=>{
          setnumberAllowed((prev)=>!prev)
        }} />
        <label htmlFor="number">Include Numbers</label>
      </div>

      <div className="setting">
        <input type="checkbox" defaultChecked ={charAllowed} id="symbol" onChange={()=>{
          setcharAllowed((prev)=>!prev)
        }}/>
        <label htmlFor="symbol">Include Symbols</label>
      </div>

    </div>
    <button className="btn generate" id="generate" onClick={copyPasswordToClipboard}>
      Copy Password
    </button>
  </div>


  )

}

export default App
