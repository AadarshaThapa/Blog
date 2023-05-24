import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
  const [name, setname] = useState('')
  const [description, setDescription] = useState('')
  const [action, setaction] = useState('inactive')
  const { id } = useParams()

  const navigate = useNavigate()

  const handlenameChange = (event) => {
    setname(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleactionChange = (event) => {
    setaction(event.target.value)
  }

  const handleUpdate = (event) => {
    event.preventDefault()

    const data = { name, description, action }
    axios
      .put('http://localhost:3000/data/' + id, data)
      .then((response) => {
        console.log(response)
        navigate('/blog')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/data/' + id)
      .then((response) => {
        const { name, description, action } = response.data
        setname(name)
        setDescription(description)
        setaction(action)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <h1>Update the blog</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={handlenameChange} />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      <div className="action-btn">
        <label>Action:</label>
        <label>
          <input
            type="radio"
            value="inactive"
            checked={action === 'inactive'}
            onChange={handleactionChange}
          />
          Inactive
        </label>
        <label>
          <input
            type="radio"
            value="active"
            checked={action === 'active'}
            onChange={handleactionChange}
          />
          Active
        </label>
      </div>

      <button type="submit" onClick={handleUpdate}>
        Update
      </button>
    </form>
  )
}

export default Edit
