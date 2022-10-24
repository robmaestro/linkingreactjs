import React from "react";
import { useState, useEffect } from "react";
import CreateRegion from "./CreateRegion";

function List() {
    const [isLoading, setIsLoading] = useState(true);
    const [region, setRegion] = useState([]);
    const [name, setName] = useState("");

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
            <h1>Region List</h1>
            <ul>
                {isLoading ?
                    (<h1>Loading</h1>)
                    :
                    (
                        region.map((region) => (
                            <li key={region.region_id}>
                                {region.region_name} <button type="button">Edit</button> <button type="button" onClick={Remove}>Delete</button>
                            </li>
                        ))
                    )
                }
            </ul>
            <button onClick={Reload}>Reload</button>
            <CreateRegion region={region} setRegion={setRegion} name={name} setName={setName}/>
            <button onClick={()=>alert(region)}>test</button>
        </>
    )

    function Remove() {

    }

    function Reload() {
        alert("working")
        window.location.reload();
    }
}

export default List;
