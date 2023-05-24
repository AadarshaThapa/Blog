import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash } from '@coreui/icons'

const Read = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  console.log(id)

  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      alert('NO IDDDDDDDDDDDDDD') // If id is not available or undefined, exit the useEffect
    }

    fetch(`http://localhost:3000/data/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Error: ' + response.status)
      })
      .then((data) => {
        console.log(data)
        setData(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <div className="card-read">
      <div className="card-read-content">
        <div>
          <h1>Details of the user</h1>
        </div>
        <div>
          <p>
            <b>Name: </b>
            {data.name}
          </p>
        </div>
        <div>
          <b>Description: </b>
          {data.description}
        </div>
        <div>
          <strong>Action: </strong> {data.action}
        </div>
      </div>
    </div>
  )
}

export default Read
