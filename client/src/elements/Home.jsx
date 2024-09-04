import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

function Home() {
    const [data, setData] = useState([])

    useEffect(()=>{
        fetchData()
    }, [])

    function fetchData(){
        axios.get("students")
        .then((res)=>{
            setData(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    function handleDelete(id){
        Swal.fire({
            title: "Hapus data?",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `Hapus`,
            cancelButtonText: `Batal`,
        })
        .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              axios.delete(`/delete_student/${id}`)
                .then((res) => {
                    setData(data.filter(student => student.id !== id))
                    Swal.fire("Success!", "Data berhasil dihapus", "");
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        });
    }

    function sweeAlert(){
        Swal.fire("SweetAlert2 is working!");
    }

    return (
        <div>
            <Link to={"/create"} className='btn btn-md btn-success'>Create Data</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student, index) => {
                            return (
                                <tr key={ student.id }>
                                    <td>{ index + 1 }</td>
                                    <td>{ student.name }</td>
                                    <td>{ student.email }</td>
                                    <td>{ student.age }</td>
                                    <td>{ student.gender }</td>
                                    <td>
                                        <Link to={`/read/${student.id}`} className='btn btn-info btn-md mx-1'>Detail</Link>
                                        <Link to={`/edit/${student.id}`} className='btn btn-warning btn-md mx-1'>Edit</Link>
                                        <button className='btn btn-danger btn-md mx-1' onClick={(e)=> handleDelete(student.id) }>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Home