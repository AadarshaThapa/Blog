import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilItalic } from '@coreui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Blog = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios
      .get('http://localhost:3000/data')
      .then((response) => setData(response.data))
      .catch((error) => console.log(error.toJSON()))
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/data/${id}`)
      .then((response) => {
        console.log('Row deleted successfully!')
        fetchData() // Fetch updated data after deletion
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="table-container">
      <h3>BLOG</h3>
      <button id="Add">
        <Link to="../create">Add Blog +</Link>
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>
                {data.description.length > 100
                  ? data.description.substring(0, 100) + '...'
                  : data.description}
              </td>
              <td>
                {data.action}
                <Link to={`../Edit/${data.id}`}>
                  <button className="Edit-btn">
                    <CIcon
                      icon={cilPencil}
                      customClassName="a"
                      style={{ height: '1em', width: '1em' }}
                    />
                  </button>
                </Link>
                <br />
                <button
                  className="Delete-btn"
                  onClick={() => handleDelete(data.id)} // Pass the id of the row to delete
                >
                  <CIcon
                    icon={cilTrash}
                    customClassName="b"
                    style={{ height: '1em', width: '1em' }}
                  />
                </button>
                <br />
                <Link to={`../Read/${data.id}`}>
                  <button className="View">
                    <CIcon
                      icon={cilItalic}
                      customClassName="c"
                      style={{ height: '1em', width: '1em' }}
                    />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Blog
