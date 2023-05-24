import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilItalic } from '@coreui/icons'

const Blog = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    status: '',
    description: '',
  })

  const data = [
    {
      id: 1,
      status: 'Pending',
      description:
        'Task 1 description is a long description that needs to be truncated...Task 1 description is a long description that needs to be truncated Task 1 description is a long description that needs to be truncated  if it exceeds 100 characters.',
      action: '',
    },
    { id: 2, status: 'In Progress', description: 'Task 2 description', action: 'Edit' },
    { id: 3, status: 'Completed', description: 'Task 3 description', action: 'Delete' },
    // Add more data rows as needed
  ]

  const truncateDescription = (description) => {
    if (description.length <= 100) {
      return description
    }
    return description.substring(0, 100) + '...'
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newData = {
      id: data.length + 1,
      ...formData,
      action: 'Edit',
    }

    data.push(newData)
    setFormData({
      id: '',
      status: '',
      description: '',
    })
    setShowForm(false)
  }

  return (
    <div className="table-container">
      <h3>BLOG</h3>
      <button onClick={() => setShowForm(true)}>Add Blog +</button>
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.status}</td>
              <td>
                {item.description.length > 100 ? (
                  <textarea value={truncateDescription(item.description)} readOnly />
                ) : (
                  item.description
                )}
              </td>
              <td>
                <CIcon
                  icon={cilPencil}
                  customClassName="a"
                  style={{ height: '1em', width: '1em' }}
                />
                <br />
                <CIcon
                  icon={cilTrash}
                  customClassName="b"
                  style={{ height: '1em', width: '1em' }}
                />
                <br />
                <CIcon
                  icon={cilItalic}
                  customClassName="c"
                  style={{ height: '1em', width: '1em' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              X
            </button>
            <form onSubmit={handleSubmit}>
              <label>
                ID:
                <input type="text" name="id" value={formData.id} onChange={handleChange} />
              </label>
              <br /> <br />
              <label>
                Status:
                <input type="text" name="status" value={formData.status} onChange={handleChange} />
              </label>
              <br /> <br />
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                <br /> <br />
              </label>
              <button type="submit">Add</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
