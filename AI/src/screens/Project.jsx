import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Project = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const location = useLocation()
  const project = location.state?.project
  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-72 bg-gray-100">
        <header className="flex justify-between items-center p-4 w-full bg-slate-200">
          <h1 className="font-semibold text-lg">{project?.name || 'Project'}</h1>
          <button className='flex gap-2'><i className='ri-add-fill mr-1'></i>
          <p>Add Collaborator</p></button>
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
        <div className={`sidePanel w-79 h-full flex flex-col gap-2 bg-gray-200 p-4 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <header className='flex justify-end px-3 p-2 bg-slate-300'>
            <button onClick={()=>setIsSidePanelOpen(!isSidePanelOpen)}className="p-2">
            <i className="ri-close-fill"></i></button> 
          </header>
          <div className="users flex flex-col ">
            <div className="user cursor-pointer hover:bg-slate-300 p-2 flex gap-2 items-center">
              <div className='aspect-square rounded-full p-2 w-9 text-white h-9 bg-slate-400 flex items-center justify-center'>
                <i className='ri-user-fill'></i>
              </div>
              <h1 className='font-semibold text-sm'>Username</h1>
            </div>
          </div>
          
        </div>
      </section>

    </main>
  )
}

export default Project