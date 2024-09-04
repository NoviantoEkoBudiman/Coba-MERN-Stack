import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  })

  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    axios.post("/add_user", values)
    .then((res) => {
      navigate('/')
      console.log(res)
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="container vh-100 vw-100 bg-primary">
      <div className="row">
        <h3>Add Student</h3>
        <div className='d-flex justify-content-end'>
          <Link to='/' class='btn btn-md btn-success'>Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-7">
              <input type="text" name="name" className="form-control" onChange={(e) => { setValues({...values, name: e.target.value}) }}/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">E-mail</label>
            <div className="col-sm-7">
              <input type="email" name="email" className="form-control" onChange={(e)=> setValues({...values, email: e.target.value}) }/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="age" className='col-sm-2 col-form-label'>Age</label>
            <div className="col-sm-7">
              <input type="number" name="age" className="form-control" onChange={(e) => setValues({...values, age: e.target.value })}/>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="gender" className='col-sm-2 col-form-label'>Gender</label>
            <div className="col-sm-7">
              <input type="text" name="gender" className='form-control' onChange={(e) => setValues({...values, gender: e.target.value})}/>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-2">
              <button className='btn btn-md btn-success'>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create