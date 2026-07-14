import React,{useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const Project = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
    const navigate=useNavigate()
    const location = useLocation()
    const project = location.state?.project
  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-72 bg-gray-100">
        <header className="flex justify-end p-4 w-full bg-slate-200">
          <button className='p-2 rounded-full bg-slate-100 hover:bg-slate-300' onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>

          <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className='conversation-area flex-grow flex flex-col justify-end p-4'>
          <div className='message-box flex mt-auto flex-col'>
            <div className='incoming message flex flex-col gap-2 p-2 bg-slate-200 rounded-md max-w-60'>
              <small className='opacity-45 text-xs'>name@gmail.com</small>
              <p className="text-sm">Hello,this is an application cksuevs kscuosebf asejfnaef olsjdefojebf </p>
            </div>
            <div className='ml-auto message flex flex-col m-2 gap-2 p-2 bg-slate-200 rounded-md max-w-60'>
              <small className='opacity-45 text-xs'>name@gmail.com</small>
              <p className="text-sm">Hello,this is an application</p>
            </div>
          </div>
          <div className="inputField w-full flex">
            <input className='p-2 px-4 border-none outline-none rounded-md'
            type="text" placeholder='Type a message...'  />
            <button className='flex-grow bg-slate-200 hover:bg-slate-300'><i className="mr-4 ml-4 ri-send-plane-fill"></i></button>
          </div>

        </div>
        <div className={`sidePanel w-full h-60 bg-gray-200 p-4 absolute  transition-all ${isSidePanelOpen ? 'translate-x-0' : 'left-[-100%]'} top-0`}>

        </div>
      </section>

    </main>
  )
}

export default Project