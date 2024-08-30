import { useState,FormEvent } from 'react';
import olx from '../assets/olx.png';
import { login,signup } from '../firebase';

const Login = () => {

    const [signState,setSignState]=useState('Sign In')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const user_auth=async (event: FormEvent<HTMLFormElement>)=>{
      event.preventDefault()
      if(signState==='Sign In'){
        await login(email,password)
      }else{
        await signup(name,email,password)
      }
    }

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
         style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/background_banner.jpg')" }}>
      <div className="w-full max-w-lg bg-white bg-opacity-75 rounded-md p-10">
        <img src={olx} className="w-36 mx-auto mb-8" alt="OLX Logo" />
        <h1 className="text-3xl font-medium mb-7 text-dark">{signState}</h1>
        <form>
        {signState === 'Sign Up' && (
            <input value={name} onChange={(e)=>{setName(e.target.value)}}
              type="text"
              placeholder="Your Name"
              className="w-full h-12 bg-gray-800 text-white mb-3 border-0 rounded-md px-5 text-lg font-medium focus:outline-none"
            />
          )}

          <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-gray-800 text-white mb-3 border-0 rounded-md px-5 text-lg font-medium focus:outline-none"
          />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}}
            type="password" 
            placeholder="Password"
            className="w-full h-12 bg-gray-800 text-white mb-3 border-0 rounded-md px-5 text-lg font-medium focus:outline-none"
          />
          <button onClick={user_auth} 
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md text-lg font-medium mt-5 hover:bg-red-700 cursor-pointer focus:outline-none"
          >
            {signState==='Sign In'?'Sign In':'Sign Up'}
          </button>
          <div className="form-help mt-4 flex items-center justify-between text-dark-400 text-sm">
            <div className="remember flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label>Remember me</label>
            </div>
            <p className="cursor-pointer hover:underline">Need Help?</p>
          </div>
        </form>
        <div className="mt-6 text-dark-400 text-sm">
            {signState==='Sign In'?<p className="remember flex items-center gap-2">
            New to Netflix? <span  onClick={()=>setSignState('Sign Up')} className="text-black cursor-pointer hover:underline">Sign Up Now</span  >
          </p>: <p className="mt-2">
            Already have an account? <span onClick={()=>setSignState('Sign In')} className="text-black cursor-pointer hover:underline">Sign In Now</span>
          </p>}
          
         
        </div>
      </div>
    </div>
  );
}

export default Login;

