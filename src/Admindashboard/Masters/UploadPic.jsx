import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {MdOutlinePhotoCameraFront} from 'react-icons/md';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button' ;
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2';

const UploadPic = () => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const handlePhotoChange = (event) => {
      const files = Array.from(event.target.files);
      setSelectedPhotos(files);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
  
      selectedPhotos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
  
      fetch('https://www.santhoshavidhyalaya.com/SVS/api/upload-photos', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
            Swal.fire({
                icon: 'success',
                title: 'Update successfully !',
                showConfirmButton: false,
                timer: 1800
              })
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return (
    <div>
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
   <Header/>

   <div className='p-4' >
     <Paper elevation={2} className="pb-5" style={{backgroundColor:'rgb(244 244 244)'}}>
       <h3 className='p-3' style={{fontFamily: 'fangsong'}} ><MdOutlinePhotoCameraFront size={45} className='pe-2' />Upload Student Photo Master</h3>

       <div className='container'>

        <div className='pt-2 pb-4' >
            <h5 className='text-primary'>Instructions for uploading image</h5>
            <li>The image should be in the <u><span style={{color:'red'}}>JBG format</span></u></li>
            <li>The size of the image should be <u><span style={{color:'red'}}>less than 1MB (megabyte).</span></u> </li>
            <li>The file name should strictly consist of the <u><span style={{color:'red',fontWeight: '700'}}>Admission number only.</span></u></li>
            <li>Example : <u><i style={{color:'green'}}>AdmissionNo.jpg (0001.jpg)</i></u></li>
        </div>

       <InputGroup className="mb-3" style={{width: '45%'}}>
        <Form.Control onChange={handlePhotoChange} accept='.jbg' maxFileSize={1 * 1024 * 1024}  multiple type='file'/>
      </InputGroup>

         <div>
            <Button className='bg-success' onClick={handleUpload}>Upload Image</Button>
        </div>

       </div>
   </Paper>
</div>
 </div>
 </div>
  )
}

export default UploadPic
