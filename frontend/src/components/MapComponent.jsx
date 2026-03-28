import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState, useEffect, useContext } from "react";
import { uploadIssue, getIssues } from "../api/issueApi";
import { AuthContext } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";

function ClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

export default function MapComponent() {
  const { token } = useContext(AuthContext);
  const [position, setPosition] = useState(null);
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getIssues().then(res => setIssues(res.data));
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", "pothole");
    formData.append("lat", position.lat);
    formData.append("lng", position.lng);
    formData.append("image", image);

    await uploadIssue(formData, token);
    alert("Issue submitted!");
  };

  return (
    <div>
      <MapContainer center={[30.3165, 78.0322]} zoom={13} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler setPosition={setPosition} />

        {position && <Marker position={position} />}

        {issues.map(issue => (
          <Marker
            key={issue._id}
            position={[
              issue.location.coordinates[1],
              issue.location.coordinates[0]
            ]}
          >
            <Popup>
              <h4>{issue.title}</h4>
              <img
                src={`http://localhost:8000/${issue.image_url}`}
                width="100"
              />
              <p>Reports: {issue.reports}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}