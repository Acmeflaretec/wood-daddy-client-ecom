import React, { useEffect } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';
import { Alert, Typography } from '@mui/material';
import PropTypes from "prop-types";

const DropZone = ({ dispatch }) => {
  let myDropzone;

  useEffect(() => {
    // Initialize Dropzone with options
    myDropzone = new Dropzone('#my-dropzone', {
      url: `${process.env.REACT_APP_API_URL}/api/v1/`,
      paramName: 'file',
      acceptedFiles: 'image/*',
      addRemoveLinks: true,
      accept: function (file, done) {
        if (file.size === 0) {
          done('Folder uploads are not allowed. Please select individual files.');
        } else {
          dispatch(prev => [...prev, file]);
          done();
        }
      },
    });

    myDropzone.on('addedfile', (file) => {
      console.log(`${file}`);
    });

    myDropzone.on('removedfile', (file) => {
      dispatch(prev => prev.filter(f => f.name !== file.name));
    });

    return () => {
      myDropzone.destroy();
    };
  }, [dispatch]);

  return (
    <div style={{ marginLeft: 18 }}>
      <Alert severity="info">
        <Typography variant='caption'>
          Click here to select files or Drag files and drop here
        </Typography>
      </Alert>
      <form action="/file-upload" className="dropzone" id="my-dropzone"></form>
    </div>
  );
};

DropZone.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default DropZone;
