import { useState, useEffect } from 'react'
import axios from '../config/axios'
import { useLocation } from 'react-router-dom'

const Project = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedCollaborators, setSelectedCollaborators] = useState([])
  const location = useLocation()
  const [project,setProject]=useState(location.state?.project)
  const [users, setUsers]=useState([])

  const getUserId = (user) => user?._id ?? user?.id
  const collaborators = project?.users || []
  const availableUsers = users.filter((user) => !collaborators.some(
    (collaborator) => getUserId(collaborator) === getUserId(user)
  ))

  const openCollaboratorsModal = () => {
    setSelectedCollaborators([])
    setIsUsersModalOpen(true)
  }

  const selectUser = (user) => {
    setSelectedUser(user)
    setIsUsersModalOpen(false)
  }

  useEffect(()=>{
    if (project?._id) {
      axios.get(`/projects/get-project/${project._id}`).then((res) => {
        setProject(res.data.project)
      }).catch((err) => {
        console.log(err)
      })
    }  
    axios.get('/users/all').then((res)=>{
      setUsers(res.data. users);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])

  const toggleCollaborator = (user) => {
    const userId = getUserId(user)
    setSelectedCollaborators((current) => current.some((item) => getUserId(item) === userId)
      ? current.filter((item) => getUserId(item) !== userId)
      : [...current, user])
  }

  const addCollaborators = async () => {
    if (!project?._id || selectedCollaborators.length === 0) {
      return
    }

    try {
      await axios.put('/projects/add-user', {
        projectId: project._id,
        users: selectedCollaborators.map(getUserId)
      })
      const refreshedProject = await axios.get(`/projects/get-project/${project._id}`)
      setProject(refreshedProject.data.project)
      setSelectedUser(selectedCollaborators[0])
      setSelectedCollaborators([])
      setIsUsersModalOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const removeCollaborator = async (user) => {
    try {
      const response = await axios.put('/projects/remove-user', {
        projectId: project._id,
        userToRemoveId: getUserId(user)
      })
      setProject(response.data.project)
      if (getUserId(selectedUser) === getUserId(user)) {
        setSelectedUser(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-72 bg-gray-100">
        <header className="flex justify-between items-center p-4 w-full bg-slate-200">
          <h1 className="font-semibold text-lg">{project?.name || 'Project'}</h1>
          <button
            className='flex items-center gap-1 text-sm sm:text-base'
            onClick={openCollaboratorsModal}
          >
            <i className='ri-add-fill'></i>
            <span>Add Collaborators</span>
          </button>
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
          <div className="users flex flex-col">
            {collaborators.map((user) => <div
              key={getUserId(user)}
              className={`user flex items-center gap-2 p-2 hover:bg-slate-300 ${getUserId(selectedUser) === getUserId(user) ? 'bg-slate-300' : ''}`}
            >
              <button className='flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left' onClick={() => selectUser(user)}>
              <div className='aspect-square rounded-full p-2 w-9 text-white h-9 bg-slate-400 flex items-center justify-center'>
                <i className='ri-user-fill'></i>
              </div>
              <div className='min-w-0'>
                <h1 className='truncate font-semibold text-sm'>{user.name}</h1>
                <p className='truncate text-xs opacity-60'>{user.email}</p>
              </div>
              </button>
              <button
                className='shrink-0 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-100'
                onClick={() => removeCollaborator(user)}
              >Remove</button>
            </div>)}
          </div>
          
        </div>
      </section>
      {isUsersModalOpen && <div
        className='fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4'
        onClick={() => setIsUsersModalOpen(false)}
      >
        <div
          className='w-full max-w-md rounded-lg bg-white p-4 shadow-xl'
          onClick={(event) => event.stopPropagation()}
        >
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Select a collaborator</h2>
            <button
              className='rounded-full p-2 hover:bg-slate-100'
              onClick={() => setIsUsersModalOpen(false)}
              aria-label='Close users list'
            >
              <i className='ri-close-fill'></i>
            </button>
          </div>
          <div className='max-h-72 space-y-1 overflow-y-auto'>
            {availableUsers.map((user) => <button
              key={getUserId(user)}
              className={`flex w-full items-center gap-3 rounded-md p-3 text-left hover:bg-slate-100 ${selectedCollaborators.some((item) => getUserId(item) === getUserId(user)) ? 'bg-slate-100' : ''}`}
              onClick={() => toggleCollaborator(user)}
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-400 text-white'>
                <i className='ri-user-fill'></i>
              </span>
              <span className='min-w-0'>
                <span className='block truncate font-semibold'>{user.name}</span>
                <span className='block truncate text-sm text-slate-500'>{user.email}</span>
              </span>
              <span className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded border ${selectedCollaborators.some((item) => getUserId(item) === getUserId(user)) ? 'border-slate-500 bg-slate-500 text-white' : 'border-slate-300'}`}>
                {selectedCollaborators.some((item) => getUserId(item) === getUserId(user)) && <i className='ri-check-line text-sm'></i>}
              </span>
            </button>)}
          </div>
          <div className='mt-4 flex justify-end gap-2 border-t pt-3'>
            <button
              className='rounded-md px-4 py-2 text-sm hover:bg-slate-100'
              onClick={() => { setSelectedCollaborators([]); setIsUsersModalOpen(false) }}
            >Cancel</button>
            <button
              className='rounded-md bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
              onClick={addCollaborators}
              disabled={selectedCollaborators.length === 0}
            >Add {selectedCollaborators.length > 0 ? `(${selectedCollaborators.length})` : ''}</button>
          </div>
        </div>
      </div>}
      
    </main>
  )
}

export default Project