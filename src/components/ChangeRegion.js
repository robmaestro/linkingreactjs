import React from "react";

export default function CreateRegion({ regionID, setRegionID, regionName, setRegionName, setRegion }) {
    function editRegion() {
        let newUrl = "http://localhost:9000/region/"

        fetch(newUrl, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ region_id: regionID, region_name: regionName })
        })
            .then((response) => response.json())
            .then((json) => setRegion(json['results']))
            .catch((error) => console.log(error))

        setRegionName("");
        setRegionID("");
    }

    return (
        <>
            <span className="change-region">
                <input className="change-region-textbox" type="text" value={regionID} onChange={(val) => { setRegionID(val.target.value) }} placeholder="ID" />
                <input className="change-region-textbox" type="text" value={regionName} onChange={(val) => { setRegionName(val.target.value); }} placeholder="New Name" />
                <button onClick={editRegion}>Edit Region</button>
            </span>
        </>
    );
}
