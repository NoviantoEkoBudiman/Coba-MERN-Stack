import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Read() {
    const [data, setData] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get(`/student/${id}`)
        .then((res) => {
            console.log(res.data)
            setData(res.data)
        })
        .catch((err) => console.log(err))
    }, [id])
    
    return (
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
                    <td>{data[0].name}</td>
                    <td>{data[0].email}</td>
                    <td>{data[0].age}</td>
                    <td>{data[0].gender}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Read