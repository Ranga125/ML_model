import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cap_diameter, setCapDiameter] = useState('');
  const [cap_shape, setCapShape] = useState('');
  const [cap_surface, setCapSurface] = useState('');
  const [cap_color, setCapColor] = useState('');
  const [does_bruise_or_bleed, setDoesBruiseOrBleed] = useState('');
  const [gill_attachment, setGillAttachment] = useState('');
  const [gill_color, setGillColor] = useState('');
  const [stem_height, setStemHeight] = useState('');
  const [stem_width, setStemWidth] = useState('');
  const [stem_color, setStemColor] = useState('');
  const [has_ring, setHasRing] = useState('');
  const [ring_type, setRingType] = useState('');
  const [habitat, setHabitat] = useState('');
  const [season, setSeason] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e, setInputFunction) => {
    setInputFunction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/', {
        cap_diameter,
        cap_shape,
        cap_surface,
        cap_color,
        does_bruise_or_bleed,
        gill_attachment,
        gill_color,
        stem_height,
        stem_width,
        stem_color,
        has_ring,
        ring_type,
        habitat,
        season
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#00704A', // Starbucks green color
      color: 'white', // Text color
      padding: '20px' // Padding for content
    }}>
      <h1>Class Prediction</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>cap_diameter:</label>
          <input type="text" value={cap_diameter} onChange={(e) => handleInputChange(e, setCapDiameter)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>cap_shape:</label>
          <input type="text" value={cap_shape} onChange={(e) => handleInputChange(e, setCapShape)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>cap_surface:</label>
          <input type="text" value={cap_surface} onChange={(e) => handleInputChange(e, setCapSurface)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>cap_color:</label>
          <input type="text" value={cap_color} onChange={(e) => handleInputChange(e, setCapColor)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>does_bruise_or_bleed:</label>
          <input type="text" value={does_bruise_or_bleed} onChange={(e) => handleInputChange(e, setDoesBruiseOrBleed)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>gill_attachment:</label>
          <input type="text" value={gill_attachment} onChange={(e) => handleInputChange(e, setGillAttachment)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>gill_color:</label>
          <input type="text" value={gill_color} onChange={(e) => handleInputChange(e, setGillColor)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>stem_height:</label>
          <input type="text" value={stem_height} onChange={(e) => handleInputChange(e, setStemHeight)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>stem_width:</label>
          <input type="text" value={stem_width} onChange={(e) => handleInputChange(e, setStemWidth)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>stem_color:</label>
          <input type="text" value={stem_color} onChange={(e) => handleInputChange(e, setStemColor)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>has_ring:</label>
          <input type="text" value={has_ring} onChange={(e) => handleInputChange(e, setHasRing)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>ring_type:</label>
          <input type="text" value={ring_type} onChange={(e) => handleInputChange(e, setRingType)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>habitat:</label>
          <input type="text" value={habitat} onChange={(e) => handleInputChange(e, setHabitat)} style={{ marginLeft: '10px' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>season:</label>
          <input type="text" value={season} onChange={(e) => handleInputChange(e, setSeason)} style={{ marginLeft: '10px' }} />
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
      </form>
      {output && <div style={{ marginTop: '20px' }}>{output}</div>}
    </div>
  );
}

export default App;
