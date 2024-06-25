 import React from 'react'
 
 export default function Navbar() {
   return (
     <nav className='bg-slate-800 text-white '>
      <div className="mycontainer  flex justify-between items-center px-4 py-5 h-11">

     
      <div className="logo font-bold text-white text-2xl">
       
        <span className='text-green-500'> &lt;</span>
        Pass 
        <span className='text-green-500'>Op/&gt;</span>
        
        </div>
       <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold ' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
            
        </li>
       </ul>
       <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center '>
        <img  className='invert w-10 p-1' src="/icons/git.jfif" alt="git is here" />
        <span className='font-bold px-2'>GitHub</span>

       </button>
       </div>

     </nav>
   )
 }
 