import React, { useEffect, useState } from 'react'
import PageTemplate from '../../components/page-template/PageTemplate';
import SiteIcon from "../../assets/destination.png"
import { instance } from '../../utils/axios/axios';
import useUser from '../../utils/auth/useUser';

export default function Sites() {

  const [siteName, setSiteName] = useState("");
  const [sites, setSites] = useState([]);
  const { user } = useUser();


  useEffect(() => {
    getallUserSites()
  }, [])
  async function getallUserSites() {
    try {
      const sites = await instance.get(`/sites/users/${user.id}`)
      setSites(sites.data)
    }
    catch (err) {
      console.log(err);
    }
  }
  async function addSites(name) {
    try {
      const newSite = await instance.post(`/sites?userId=${user.id}`, {
        name
      });
      setSites([...sites, newSite.data])
    }
    catch (error) {
      console.log(error);
    }
  }
  async function deleteSite(droneId) {
    try {
      await instance.delete(`/sites/${droneId}`);
      getallUserSites()
    }
    catch (err) {

    }
  }

  return (
    <PageTemplate title={"Site"} addDocument={addSites} documents={sites} docIcon={SiteIcon} deleteDoc={deleteSite} />
  )
}
