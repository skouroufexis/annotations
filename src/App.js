import logo from './logo.svg';
import './App.css';

import  { useState,useEffect } from 'react';



import * as markerjs2 from 'markerjs2';




function App() {

  //determines which view is displayed. Default is 1 (<NewImage /> view is shown)
  const [menuOption, setMenuOption] = useState(1); 
  
  // the selected file to be uploaded
  const[selectedFile,setSelectedFile]=useState('');

  //displayed when file upload fails
  const [uploadError,setUploadError]=useState('');

  //displayed when file upload succeeds
  const [uploadSuccess,setUploadSuccess]=useState('');

  const [retrieveError, setRetrieveError] = useState('');

  //populated by the images records of the database
  const [uploadedImages,setUploadedImages]=useState('');

  //displayed when file delete fails
  const [deleteError,setDeleteError]=useState('');

  // the image selected by the user to be edited
  const [selectedImage,setSelectedImage]= useState('');

  //displayed when file update fails
  const [updateError, setUpdateError]=useState('');

  



  return (
    <div className="App">
      <header id='topMenu' className='container'>
        <div className='row mt-1'>
            <a href='/'>
              <button className='btn '><i class="fas fa-home"></i></button>
            </a>
        </div>

      
        
        

        {/* top menu */}
        <div className='row mt-2'>
          {menuOption==1 &&

            <div>
              <button className='btn col selected shadow' onClick={()=>{setMenuOption(1)}} >Add new image</button>
              <button className='btn col' onClick={()=>{setMenuOption(2);loadImages()}}>My uploaded images</button>
            </div>
          }
          

          {menuOption==2 &&
            <div>
              <button className='btn  col' onClick={()=>{setMenuOption(1)}} >Add new image</button>
              <button className='btn col selected shadow ' onClick={()=>{setMenuOption(2)}} >My uploaded images</button>
            </div>
          }


        {menuOption==1 &&
            <div>
              <NewImage />
            </div>
          }                  
        </div>
        
      </header>

      {menuOption==2 &&
            <div>
              <DisplayImages />
            </div>
      }   

      {menuOption==3 &&
            <div>
              <EditImages />
            </div>
      }    


    

    </div>
  );


  function NewImage(){
    return(
      <div className='container'>

        { uploadSuccess!=''&&
          <div className='row mt-2'>
            <div className='col p-1 errorSuccess'>{uploadSuccess}</div>
          </div>

        }

        {(uploadError!='' && uploadError!='success') &&

        <div className='row mt-2'>
          <div className='col p-1 errorFail'>{uploadError}</div>
        </div>

        }
        
        {uploadSuccess=='' &&
          <div className='row mt-2'>
            <label for='input_file' className='btn btn-light  col-6'><i class="far fa-image"></i> +</label>
            <input type='file' id='input_file' onChange={()=>{selectFile()}}></input>                           
          </div>
        }
        

        {(selectedFile!='' && uploadError=='' && uploadSuccess=='') &&
        <div className='row mt-1'>
          <div className='col grey'><small>Click "upload image" or select a new one to replace the image shown below</small></div> 
        </div>
        }

        {selectedFile!=''&&
        <div className='row mt-2'>

          

          <div className='col-12'>
              <img src={selectedFile.url} className='previewImage img-fluid'></img>             
           </div>

           

           
           <div className='col-6 margin-v-auto grey  textContainer'> {selectedFile.name} </div>  

          {uploadSuccess=='' &&
            <div className='col-6'>
             <button className='btn black mt-2  text-center' onClick={()=>{removeFile()}}><i class="fas fa-times"></i></button>
           </div>
          }

          {(selectedFile!='' && uploadError=='' && uploadSuccess=='') &&
          <div className='col-12'><button className='col-6 btn btn-primary mt-2' onClick={()=>{uploadFile()}}>Upload image</button></div>
          }
          
          {uploadSuccess!="" &&
            <div className='row'>
              <a className='col-12' href='/'><button className='btn btn-primary mt-2  text-center'>OK</button></a>
             </div>
          }
          
        </div>
        }
    
      </div>
    )
  }

  function DisplayImages(){
    return(
      <div className='container'>

        {retrieveError!='' &&
          <div className='errorFail'>
            {retrieveError}
          </div>
          
        }
        
        {uploadedImages=='' &&
         <div>No images found</div>
        }  
      
        {deleteError!='' &&
          <div className='container mt-3 d-flex errorFail'> 
          <div className='col-11'>{deleteError}</div>
          <button className='col-1 border text-center btn btn-error' onClick={()=>{setDeleteError('')}}>x</button>          
        </div>  
        }
        
        {uploadedImages!='' &&
        <div className='container  mt-2'>   
          {uploadedImages.map((image, index) => (
          <div className='row record p-2 mt-1'>
            <div className='col-6'>             
              <div className='col-6 grey' key={index}>{image.imageName}</div>
              <div className='col-6'><img className='previewImg' src={image.imagePath} alt='image'></img>  </div>              
            </div>   
            <div className='col-6 margin-v-auto'>
                <button className='col-12 btn btn-danger' onClick={()=>{deleteFile(image.id,image.imageName)}}><i class="fas fa-trash-alt"></i></button>
                <button className='col-12 btn btn-primary2 mt-1' onClick={()=>{editFile(image.id,image.imageName,image.imagePath,image.imageState)}} ><i class="far fa-edit"></i></button>
            </div>       
          </div>                        
          ))}
        </div>
        }
      </div>
    )
    
  }

  function EditImages(){
    return(
      <div className='container'>
        <div className='row'>
          <button className='btn col  text-start grey' onClick={()=>{setMenuOption(2); loadImages()}}> <i class="fas fa-caret-left"></i> close editor</button>
        </div>

        {updateError!='' &&
          <div className='container mt-3 d-flex errorFail'> 
          <div className='col-11'>{updateError}</div>
          <button className='col-1 border text-center btn btn-error' onClick={()=>{setUpdateError('')}}>x</button>          
        </div>  
        }

        <div className='row'>
          <button className='btn col text-start'>click on the image to add/edit annotations</button>
        </div>

          {selectedImage!='' &&
          
          
          <div className='row'>                       
            <img src={selectedImage[0].imagePath} id='editorImage' className='button' onClick={()=>{loadEditor()}}></img>                        
          </div>

          }
        
                          
      </div>
    )
  }

  //selects file to be uploaded
  function selectFile(){  
    setSelectedFile('');
    let f=document.getElementById('input_file').files[0];
    console.log(f);
    //populate selectedFile variable
    setSelectedFile(f);

    // create url for previewing file before uploading
    f.url=URL.createObjectURL(f);    
    validateFile();  

  }
  
  //validates filetype
  function validateFile(){
    let url = 'http://127.0.0.1:8000/fileType/';
    let data = new FormData();
    
    
    let newFile= document.getElementById('input_file').files[0]
    data.append('data',newFile)
    data.append('name', newFile.name);    
    data.append('size', newFile.size);
    
      
    fetch(url,{
      enctype:"multipart/form-data",
      method:'POST',                
      body: data
    })
    .then(x => x.json())
    .then(y => {
      if(y.status==400){
        //file type not accepted
        setUploadError(y.error)      
        
      }
      else{
        // file type accepted
        setUploadError('');                
        console.log(document.getElementById('input_file').files)
      }
      
      console.log(y.error);
      })
          
    .catch((error)=>{
      console.log(error);
    }) 

  }

  //removes selected file from the <input> field
  function removeFile(){
    document.getElementById('input_file').files[0]='';
    setSelectedFile('');
    setUploadError('')
  }

  //uploads selected image file
  function uploadFile(){

    let url = 'http://127.0.0.1:8000/uploadFile/';
    let data = new FormData();      
    
    data.append('data',selectedFile)
    data.append('name', selectedFile.name);    
    data.append('size', selectedFile.size);    
    data.append('type', selectedFile.type);

    //post request to database to add file
    fetch(url,{
      method:'POST',                
      body: data
    })
    .then(x => x.json())
    .then(y => {
      if(y.status==400){
        setUploadError(y.error);
        setUploadSuccess('');
        
      }
      else{
        setUploadSuccess(y.error);    
        setUploadError('')
        console.log(y);        
      }
      
      
      })
          
    .catch((error)=>{
      console.log(error);
    }) 
    
  }

  //retrieves all images stored in the database
  function loadImages(){
    //reset variables in the <NewImage /> view
    setUploadError('');
    setUploadSuccess('')
    setSelectedFile('');

    

    // fetch request to retrieve images from Database

    let url = 'http://127.0.0.1:8000/getFiles/';
    fetch(url)
    .then(x => x.json())
    .then(y => {
      console.log(y)
      if(y.status==400){
        setRetrieveError(y.error);        
      }
      else{
        setRetrieveError('');            
        
        //populate uploadedImages array
        
          console.log(y.response)
          setUploadedImages(y.response);  
          console.log(uploadedImages);
      }
      })          
    .catch((error)=>{
      console.log(error);
    }) 

  }

  //deletes file from the database
  function deleteFile(imageId,imageName){
    if(window.confirm('Are you sure you want to delete this image?')){
      
      let url = 'http://127.0.0.1:8000/deleteFile/';
      let data = new FormData();
      data.append('imageId',imageId)
      
      data.append('imageName',imageName)


      fetch(url,{
        enctype:"multipart/form-data",
        method:'POST',                
        body: data
      })
      .then(x => x.json())
      .then(y => {
        if(y.status==400){
          //error deleting file
          setDeleteError(y.error)                
        }
        else{
          // file deleted
          setDeleteError('');  
          console.log(y.error); 
          loadImages();
                       
          
        }
        
        
        })
            
      .catch((error)=>{
        console.log(error);
      })



    }
    



  }


  //opens the view for editing the selected image
  function editFile(imageId,imageName,imagePath,imageState){
    
    setSelectedImage('')
    if(imageState!=''){
      imageState=JSON.parse(imageState)
    }
    setSelectedImage([{imageId:imageId,imagePath:imagePath,imageState:imageState}])

    setMenuOption(3)
    
  }

 
  //loads the image editor component (marker.js)
  function loadEditor(){
     //  create an blob image that can be annotated           
     fetch(selectedImage[0].imagePath)
    .then(response => response.blob())
    .then(blob => {
     const url = URL.createObjectURL(blob);
     document.getElementById('editorImage').src = url;
     console.log(selectedImage)
    }); 



     //define a marker area for the markerjs component 
     let markerArea = new markerjs2.MarkerArea(document.getElementById('editorImage'));
     
    //settings for the markerjs component
      markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
            
    // register an event listener for when user clicks OK/save in the marker.js UI
    markerArea.addEventListener('render', event => {
    // we are setting the markup result to replace our original image on the page
    // but you can set a different image or upload it to your server
      
    let target=document.getElementById('editorImage');
    target.src = event.dataUrl;

    let targetState= event.state; 
    console.log(targetState)

    // updating selected image
    let imageToSave=[{"imageId": selectedImage[0].imageId, "imagePath": selectedImage[0].imagePath, "imageState": targetState}]
    
    //update the selectedImage (the one currently editing) with annotation data
    setSelectedImage(imageToSave);   

    console.log(selectedImage)
          
      
    console.log(selectedImage[0])
    console.log(selectedImage[0].imageState)
    let url = 'http://127.0.0.1:8000/updateFile/';
    let data = new FormData();      
    let imageState=JSON.stringify(targetState)
    console.log(imageState)
    data.append('imageId',selectedImage[0].imageId)
    data.append('imagePath', selectedImage[0].imagePath);    
    data.append('imageState',imageState);    

    fetch(url,{
      method:'POST',                
      body: data
    })
    .then(x => x.json())
    .then(y => {
      if(y.status==400){
        console.log(y.error)
        setUpdateError(y.error);                
      }
      else{
        setUpdateError('');            
        console.log(y);        
      }          
      })
          
    .catch((error)=>{
      console.log(error);
    }) 

    
    
  });

  
  //displays the markerjs component
  markerArea.show();   
  
    //display annotations if present  
    if(selectedImage[0].imageState!=''){
        markerArea.restoreState(selectedImage[0].imageState)
    }

  }

  
}

export default App;
