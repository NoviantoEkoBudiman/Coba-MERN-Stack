import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function Read() {
    const [data, setData] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get(`/student/${id}`)
        .then((res) => {
            setData(res.data.data[0])
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])
    
    return (
        <div>
            <Link to='/' className='btn btn-md btn-success'>Home</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ data.name }</td>
                        <td>{ data.email }</td>
                        <td>{ data.age }</td>
                        <td>{ data.gender }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Read