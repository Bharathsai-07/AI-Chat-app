import { Link, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from '../config/axios.js'
import { UserContext } from '../context/user.context'

const Login = () => {

    const {setUser} = useContext(UserContext)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios
      .post('/users/login', {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        console.log(res.data)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.response?.data || err.message)
      })
  }

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 text-slate-100'>
      <div className='pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl' />

      <section className='w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-900/65 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300'>Welcome back</p>
        <h1 className='mt-3 text-4xl font-bold tracking-tight text-white'>Sign In</h1>
        <p className='mt-2 text-sm text-slate-300'>Access your account with email and password.</p>

        <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
          <div>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-slate-300'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              placeholder='name@example.com'
              required
              className='w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30'
            />
          </div>

          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-slate-300'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
              placeholder='Enter your password'
              required
              className='w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-blue-400'
          >
            Login
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-300'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='font-semibold text-cyan-300 transition hover:text-cyan-200'>
            Create one
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Login