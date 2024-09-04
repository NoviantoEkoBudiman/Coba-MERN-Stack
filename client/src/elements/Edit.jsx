import React,{ useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Edit() {
  const [data, setData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`/student/${id}`)
    .then((res)=>{
      setData(res.data.data[0])
      console.log(res.data.data[0])
    })
    .catch((err) => {
      console.log(err)
    })
  }, [id])

  function handleUpdate(e){
    e.preventDefault()
    axios.post(`/update_student/${id}`, data)
    .then((res) => {
      navigate("/")
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
      <div className="container">
        <Link to='/' className='btn btn-md btn-success'>Home</Link>
        <form onSubmit={handleUpdate}>
          <table className='table'>
            <thead>
              <tr>
                <th>Key</th>
                <th>Data</th>
              </tr>
              <tr>
                <td>Nama</td>
                <td>
                  <div className="col-sm-3">
                    <input type="text" className='form-control col-sm-3' name="name" value={ data.name } onChange={(e) => setData({ ...data, name: e.target.value}) } />
                  </div>
                </td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>
                  <div className="col-sm-3">
                    <input type="text" className='form-control' name="email" value={ data.email } onChange={(e) => setData({...data, email: e.target.value}) } />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Age</td>
                <td>
                  <div className="col-sm-3">
                    <input type="text" className='form-control' name="age" value={ data.age } onChange={(e) => setData({...data, age: e.target.value}) } />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <div className="col-sm-3">
                    <input type="text" className='form-control' name="gender" value={ data.gender } onChange={(e) => setData({ ...data, gender: e.target.value }) } />
                  </div>
                </td>
              </tr>
            </thead>
          </table>
          <button type='submit' className='btn btn-md btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Edit