import React from "react";
import { useState, useEffect } from "react";
import CreateRegion from "./CreateRegion";
import ChangeRegion from "./ChangeRegion"

function List() {
    const [isLoading, setIsLoading] = useState(true);
    const [region, setRegion] = useState([]);
    const [name, setName] = useState("");
    const [regionName, setRegionName] = useState("");
    const [regionID, setRegionID] = useState("");

    useEffect(() => {
        const url = "http://localhost:9000/region/";
        fetch(url)
            .then((response) => response.json())
            .then((json) => setRegion(json['results']))
            .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        if (region.length !== 0) {
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }, [region])
    return (
        <>
            <span className="list-container">
                <h1>Region List</h1>
                <i type="button" onClick={Reload} className="bi bi-arrow-clockwise"></i>
                <ul>
                    {isLoading ?
                        (<h1>Loading</h1>)
                        :
                        (
                            region.map((regions) => (
                                <li key={regions.region_id} className="item-list">
                                    <span>{regions.region_id} {regions.region_name}</span>
                                    <span><i type="button" class="bi bi-trash3-fill" onClick={() => delRegion(regions.region_id)}></i></span>
                                </li>
                            ))
                        )
                    }
                </ul>
                <span className="button-collection">
                    <ChangeRegion setRegion={setRegion} regionID={regionID} setRegionID={setRegionID} regionName={regionName} setRegionName={setRegionName} />
                    <CreateRegion setRegion={setRegion} name={name} setName={setName} />
                </span>
            </span>
        </>
    )

    // function editRegion(region_id) {
    //     let newUrl = "http://localhost:9000/region/"

    //     const foundRegion = region.find(regions => regions.region_id === region_id);
    //     console.log(foundRegion)

    //     fetch(newUrl, {
    //         method: "PUT",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ region_id: regionID, region_name: regionName })
    //     })
    //         .then((response) => response.json())
    //         .then((json) => setRegion(json['results']))
    //         .catch((error) => console.log(error))
    // }

    function delRegion(region_id) {
        let newUrl = "http://localhost:9000/region/"

        const foundRegion = region.find(regions => regions.region_id === region_id);
        console.log(foundRegion)

        fetch(newUrl, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ region_id: region_id })
        })
            .then((response) => response.json())
            .then((json) => setRegion(json['results']))
            .catch((error) => console.log(error))
    }

    function Reload() {
        const url = "http://localhost:9000/region/";
        fetch(url)
            .then((response) => response.json())
            .then((json) => setRegion(json['results']))
            .catch((error) => console.log(error))

        console.log('Refreshed')
    }

}

export default List;
