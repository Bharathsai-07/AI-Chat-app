import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../config/axios.js'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const {setUser} = useContext(UserContext)
  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('/users/register', {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        setUser(res.data.user)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err.response?.data || err.message)
      })
  }

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12 text-slate-100'>
      <div className='pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-36 left-4 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl' />

      <section className='w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-900/65 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-300'>New here</p>
        <h1 className='mt-3 text-4xl font-bold tracking-tight text-white'>Create Account</h1>
        <p className='mt-2 text-sm text-slate-300'>Sign up and start using your workspace.</p>

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
              className='w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30'
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
              placeholder='Create a password'
              required
              className='w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-fuchsia-400 hover:to-pink-400'
          >
            Create Account
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-300'>
          Already have an account?{' '}
          <Link to='/login' className='font-semibold text-fuchsia-300 transition hover:text-fuchsia-200'>
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Register
