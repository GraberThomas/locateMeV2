import './App.css'
import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl'
import { FaMapMarkerAlt } from "react-icons/fa"
import { MarkerType, CoordinateObject } from './types/types';
import Contacts_contenair from './components/Contacts_contenair';
import PopUpInfo from './components/PopUpInfo';
import mapboxgl from 'mapbox-gl';
import PopUpAddContact from './components/PopUpAddContact';
import {token} from '../../token_mapbox';


function App() {
  const [markersData, setMarkersData]: [MarkerType[], Function] = useState([]);
  const [popUpInfoIsvisible, setpopUpInfoIsvisible] = useState(false);
  const [infoPopUp, setInfoPopup]: [string, Function] = useState("");
  const [popUpAddContactIsvisible, setpopUpAddContactIsvisible] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates]: [CoordinateObject | null, Function] = useState(null)


  const effect = useEffect(() => {
    getMarkers();
  }, [])

  const getMarkers = () => {
    console.log("test")
    let data = fetch("http://localhost:8080/markers").then((res: Response) => {
      res.json().then(data => {
        setMarkersData(data.data)
      });
    })
  }

  const addMarkers = () => {
    return markersData.map((value: MarkerType) => {
      return (<Marker key={value.id} longitude={value.longitude} latitude={value.lattitude} anchor="bottom">
        <FaMapMarkerAlt className='cursor-pointer' size={"2em"} onClick={(e: React.MouseEvent) => { e.stopPropagation(); openPopUpInfo(value.name) }} />
      </Marker>)
    })
  }

  const addNewContact = async (mark: MarkerType) => {
    let response = await fetch("http://localhost:8080/markers", {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(mark)
    })

    if (response.status == 200) {
      let ret = await response.json();
      if (ret.status == 200) {
        getMarkers();
      }
    } else {
      alert("Addition could not be completed: Server error");
    }
  }

  const removeContact = async (id: number) => {
    let response = await fetch("http://localhost:8080/markers/" + id, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (response.status == 200) {
      let ret = await response.json();
      if (ret.status != 200) {
        console.log(ret.status)
        alert("La suppression n'a pas pu être effectuée.");
      } else {
        getMarkers();
      }
    } else {
      alert("La suppression n'a pas pu être effectuée. Erreur du serveur");
    }
  }

  const openPopUpInfo = (name: string) => {
    setpopUpInfoIsvisible(true);
    setInfoPopup(name);
  }

  const closePopUpInfo = () => {
    setpopUpInfoIsvisible(false);
  }

  const openPopUpAddContact = () => {
    setpopUpAddContactIsvisible(true);
  }

  const closePopUpAddContact = () => {
    setpopUpAddContactIsvisible(false);
    setSelectedCoordinates(null);
  }

  return (
    <div className="App flex absolute w-full font-barlow text-[1.2rem] h-[100vh]">
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: 6.0240539,
          latitude: 47.237829,
          zoom: 13
        }}
        style={{ width: '70vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e: mapboxgl.MapMouseEvent) => {
          setSelectedCoordinates(e.lngLat)
          setpopUpAddContactIsvisible(true);
        }}
      >
        {addMarkers()}
        <NavigationControl />
      </Map>
      <Contacts_contenair openPopUp={openPopUpInfo} markersData={markersData} openPopUpAddContact={openPopUpAddContact} removeContact={removeContact} />
      <PopUpInfo visible={popUpInfoIsvisible} marksData={markersData} infoPopUp={infoPopUp} closePopUp={closePopUpInfo} />
      <PopUpAddContact coordinates={selectedCoordinates} visible={popUpAddContactIsvisible} closePopUp={closePopUpAddContact} fctAdd={addNewContact} />
    </div >
  )
}

export default App
