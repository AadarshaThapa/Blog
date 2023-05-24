import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

const Create = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [action, setAction] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = { name, description, action }
    axios
      .post('http://localhost:3000/data', data)
      .then((response) => {
        alert('Saved Scucesfully')
        console.log(response)
        navigate('/blog')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Action:
        <label>
          <input
            type="radio"
            value="active"
            checked={action === 'active'}
            onChange={() => setAction('active')}
          />
          Active
        </label>
        <label>
          <input
            type="radio"
            value="inactive"
            checked={action === 'inactive'}
            onChange={() => setAction('inactive')}
          />
          Inactive
        </label>
      </label>
      <br />
      <button type="submit" onClick={handleSubmit} className="submit">
        Submit
      </button>
    </form>
  )
}

export default Create
// <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-button" onClick={() => setShowForm(false)}>
//               X
//             </button>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 ID:
//                 <input type="text" name="id" value={formData.id} onChange={handleChange} />
//               </label>
//               <br /> <br />
//               <label>
//                 Status:
//                 <input type="text" name="status" value={formData.status} onChange={handleChange} />
//               </label>
//               <br /> <br />
//               <label>
//                 Description:
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                 ></textarea>
//                 <br /> <br />
//               </label>
//               <button type="submit">Add</button>
//               <button onClick={() => setShowForm(false)}>Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
