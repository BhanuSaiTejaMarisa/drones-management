import "./Drones.scss"
import { instance } from "../../utils/axios/axios"
import React, { useEffect, useState } from 'react'
import useUser from '../../utils/auth/useUser';
import DroneIcon from "../../assets/drone.png"

import Modal from "../../components/drones/modal/Modal";
import PageTemplate from "../../components/page-template/PageTemplate";

export default function Drones() {
  const { user } = useUser();
  const [drones, setDrones] = useState([]);
 
  const [showModal, setShowModal] = useState(false);
  const [updatedDroneId, setUpdatedDroneId] = useState("");
  useEffect(() => {
    getAllUserDrones()
  }, [])

  async function getAllUserDrones() {
    try {
      const drones = await instance.get(`/users/${user.id}/drones`)
      setDrones(drones.data)
    }
    catch (err) {
      console.log(err);
    }
  }


  async function addDrones(name) {
    try {
      const newDrone = await instance.post(`/drones?userId=${user.id}`, {
        name
      });
      setDrones([...drones, newDrone.data])
    }
    catch (error) {
      console.log(error);
    }
  }

  function handleShowModal(droneId) {
    return () => {
      setUpdatedDroneId(droneId)
      setShowModal(prev => !prev)
    }
  }
  async function deleteDrone(droneId) {
    try {
      await instance.delete(`/drones/${droneId}`);
      getAllUserDrones()
    }
    catch (err) {

    }
  }
  return (
    <>
      <PageTemplate title={"Drones"} documents={drones} addDocument={addDrones} docIcon={DroneIcon} handleShowModal={handleShowModal} deleteDoc={deleteDrone} />
      <Modal showModal={showModal} setShowModal={setShowModal} droneId={updatedDroneId} userId={user.id} />
    </>
  )
}
