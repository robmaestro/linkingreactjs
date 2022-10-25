import React from "react";

export default function CreateRegion({ setRegion, name, setName }) {
    function addRegion() {
        let newUrl = "http://localhost:9000/region/"

        fetch(newUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ region_name: name })
        })
            .then((response) => response.json())
            .then((json) => setRegion(json['results']))
            .catch((error) => console.log(error))

        setName("");
    }

    return (
        <>
            <span className="change-region">
                <input className="change-region-textbox" type="text" value={name} onChange={(val) => {
                    setName(val.target.value);
                }
                } placeholder="New Region"/>
                <button onClick={addRegion}>Add region</button>
            </span>

        </>
    );
}
