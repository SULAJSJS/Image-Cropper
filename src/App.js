import { Photo } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import Crop from './components/Crop';

function App() {
  const [openCrop, setOpenCrop] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.file) {
      return;
    }
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setOpenCrop(true);
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '40px',
      }}>
      {!openCrop ? (
        <>
          <input
            id="file"
            style={{ display: 'none' }}
            type="file"
            accept="images/*"
            onChange={handleChange}
          />
          <Box
            sx={{
              outline: image !== null ? '' : '8px solid blue',
              offset: image !== null ? '' : '-20px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              textAlign: 'center',
            }}>
            {image === null ? (
              <Photo
                sx={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mt: '45px',
                  opacity: 0.2,
                }}
              />
            ) : (
              <img
                style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover' }}
                src={image}
                alt="Your avatar"
              />
            )}
          </Box>
          <Button variant="contained" style={{zIndex: 2}}>
            <label htmlFor="file">Выбрать фото</label>
          </Button>
        </>
      ) : (
        <>
          <div
            style={{
              content: '',
              background: '#000',
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0.6,
              zIndex: -1,
            }}></div>
          <Crop {...{ image, setOpenCrop, setImage }} />
        </>
      )}
    </div>
  );
}

export default App;
