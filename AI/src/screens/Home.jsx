import React,{useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../context/user.context.jsx'
import axios from '../config/axios.js'
export const Home = () => {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [projectName, setProjectName] = useState('')
  const [project, setProject] = useState([])

  async function createProject(e){
    e.preventDefault()

    try {
      const res = await axios.post('/projects/create', {
        name: projectName.trim(),
      })

      console.log(res)
      setProjectName('')
      setIsModalOpen(false)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(()=>{
    axios.get('/projects/all').then((res)=>{
      setProject(res.data.projects || []);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  function handleSubmit(e){
    e.preventDefault()
    console.log('Project name:', projectName)
    setProjectName('')
    setIsModalOpen(false)
  }

  return (
    <main className='p-4'>
      <div className="projects flex flex-wrap gap-3">
        <button className="project p-4 border rounded-md" onClick={() => setIsModalOpen(true)}>
          New Project <i className="ri-link"></i>
        </button>
        {project?.map((project) => (
          <div key={project._id} 
          onClick={()=>{
            navigate('/project',{
              state:{project}
            })
          }}
          className="project flex flex-col gap-2 cursor-pointer p-4 border rounded-md min-w-50">
            <h2 className="font-semibold">{project.name}</h2>
            <div className="flex gap-2">
              <p><i className="ri-user-line"></i>Collaborators: {project.users?.length || 0}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
