import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
       const [length,setLength]=useState(8);
       const [numberAllowed,setNumberAllowed]=useState(false);
       const [characterAllowed,setCharacterAllowed]=useState(false);
       const [password,setPassword]=useState("");

       const generatePassword = useCallback(()=>{
           let pass="";
           let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
           if(numberAllowed){
               str+="0123456789"
           }
           if(characterAllowed){
              str+="!@#$%^&*-_+=[]{}~"
           }
           for (let i = 0; i < length; i++) {
             
              let index=Math.floor(Math.random()*str.length +1);
              pass+=str.charAt(index);

           }
           setPassword(pass);

       },[length,numberAllowed,characterAllowed,setPassword])

       useEffect(()=>{
        generatePassword()
       },[length,numberAllowed,characterAllowed,generatePassword]);

       
       const passwordRef = useRef(null);
       const copyPassword =useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,101);
        window.navigator.clipboard.writeText(password)}
        ,[password])
       


  return (
    <div className='h-screen w-full bg-slate-400 overflow-hidden' >
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-20  bg-gray-800 text-orange-500">
      <h1 className='text-yellow-400 text-center my-3 text-xl'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
         
        <input type="text" value={password} ref={passwordRef} readOnly className="outline-none w-full py-1 px-3"/>
        <button className='outline-none hover:bg-blue-900 bg-blue-600 text-white px-3 py-0.5 shrink-0'
         onClick={copyPassword} >Copy</button>

        </div>


        <div  className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input type="range"  id="ran" className='cursor-pointer' min={6} max={100} onChange={(e)=>setLength(e.target.value)} />
            <label htmlFor="ran">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="chek" onChange={()=>{
              setNumberAllowed((prev)=>(!prev))
            }}/>
            <label htmlFor="chek">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="chekC" defaultChecked={characterAllowed} onChange={()=>{
            setCharacterAllowed((prev)=>(!prev))
          }}
           />
          <label htmlFor="chekC">Characters</label>
          </div>


          <button type="reset" onClick={()=>setPassword("password erased")
        } className='bg-orange-500 px-3 py-2 rounded-xl text-white'>RESET</button>
          
          


        </div>



      </div>
    </div>
  )
}

export default App
