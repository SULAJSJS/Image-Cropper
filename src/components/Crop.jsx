import { Box, Button, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import CloseIcon from '@mui/icons-material/Close';
import getCroppedImg from './CropTest';
import styles from './crop.module.scss';

const Crop = ({ image, setOpenCrop, setImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { url } = await getCroppedImg(image, croppedAreaPixels);
      setImage(url);
      setOpenCrop(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Box className={styles.icons}>
        <CloseIcon
          className={styles.icon}
          sx={{ fontSize: 30 }}
          onClick={() => setOpenCrop(false)}
        />
      </Box>
      <DialogContent
        className={styles.root}
        dividers
        sx={{
          background: 'none',
          position: 'relative',
          height: 400,
          width: 'auto',
          minWidth: { sm: 500 },
        }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          zoomSpeed={4}
          maxZoom={10}
          minZoom={3}
          zoomWithScroll={true}
          showGrid={true}
          aspect={3 / 3}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
          onZoomChange={setZoom}
          cropShape="round"
          className={styles.crop}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', mx: 3 }}>
        <Box sx={{ width: '100%', mb: 1, display: 'flex', gap: '40px' }}>
          <Button onClick={cropImage} variant="contained" sx={{ fontSize: '15px' }}>
            Подтвердить
          </Button>
          <Box className={styles.cancel}>
            <Button
              onClick={() => setOpenCrop(false)}
              variant="contained"
              color="error"
              sx={{ fontSize: '15px' }}>
              Отменить
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </>
  );
};

export default Crop;
