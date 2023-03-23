import "./PageTemplate.scss";
import React, { useState } from 'react'
import EditIcon from "../../assets/edit.png"
import TrashIcon from "../../assets/trash.png"

export default function PageTemplate({ title, addDocument, documents, docIcon, deleteDoc, handleShowModal }) {
  const [name, setName] = useState("");

  return (
    <div className="DocumentPage">
      <h2>{title + "s"}</h2>
      <input type="text" placeholder={`${title} Name`} value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => addDocument(name)}>Add {title + "s"}</button>
      <div>
        {documents?.map((docs, index) => (
          <div key={index} className="document-container">
            <img src={docIcon} alt="drone" />
            <p>{docs.name}</p>
            <div className="edit-icons-container">
              {handleShowModal && <img src={EditIcon} alt="edit-icon" className="edit-icon" onClick={handleShowModal(docs._id)} />}
              <img src={TrashIcon} alt="trash-icon" className="edit-icon" onClick={() => deleteDoc(docs._id)} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
