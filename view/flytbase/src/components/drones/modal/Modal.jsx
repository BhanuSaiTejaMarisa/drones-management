import "./Modal.scss"
import React, { useEffect, useState } from 'react'
import { instance } from '../../../utils/axios/axios';
import CloseIcon from "../../../assets/close.png"
export default function Modal({ showModal, setShowModal, droneId, userId }) {

  const [allSites, setAllSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("")
  const [drone, setDrone] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function getAllSites() {
      try {
        const sites = await instance.get(`/sites/users/${userId}`);
        setAllSites(sites.data)

      }
      catch (error) {
        console.log(error);
      }
    }
    getAllSites();
  }, [])

  useEffect(() => {
    if (showModal && droneId) {
      async function getDroneById() {
        try {
          setIsLoading(true)
          const response = await instance.get(`/drones/${droneId}`);
          setDrone(response.data);
          setSelectedSite(response.data.siteId);
          setIsLoading(false)
        }
        catch (err) {
          console.log(err);
        }
      }
      getDroneById()
    }
  }, [showModal, droneId])


  async function handleAddSite() {
    try {
      if (!selectedSite) {
        alert("Please select a site")
      }
      const response = await instance.patch(`/sites/${selectedSite}/drones`, {
        droneId
      })

    }
    catch (err) {
      console.log(err);
    }
  }
  function handleSelectedSite(e) {

    setSelectedSite(e.target.value);
  }
  return (
    showModal && <div className='DronesModal'>
      <div className='modal-overlay'></div>
      <div className="modal">
        <div className="modal-header">
          <h3>Add Site to a Drone<span className="drone-title">{drone.name}</span></h3>
          <img src={CloseIcon} alt="" className="edit-icon" onClick={() => setShowModal(false)} />
        </div>
        <div className="modal-content">
          {allSites.map((site, index) => (
            <div className="site-radio-buttons" key={"sites" + index}>
              <input type="radio" name="sites" onChange={handleSelectedSite} value={site._id} checked={selectedSite === site._id} disabled={isLoading} />
              <label>{site.name}</label>
            </div>
          ))}
        </div>
        <button onClick={handleAddSite} disabled={isLoading}>Add Site</button>
      </div></div>
  )
}
