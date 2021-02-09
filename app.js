var frontCamera = false;
var track = null;
var currentStream;

// Define constants
// Get the element in the document with id="camera-view", "camera-device", "photo-display", "take-photo-button"
const
    cameraView = document.querySelector("#camera-view"),
    cameraDevice = document.querySelector("#camera-device"),
    photoDisplay = document.querySelector("#photo-display"),
    takePhotoButton = document.querySelector("#take-photo-button");
    frontCameraButton = document.querySelector("#front-camera-button");

// Access the device camera and stream to cameraView
function cameraStart() {
// Set constraints for the video stream
// "user" => Front camera
// "environment" => Back camera

    if (typeof currentStream !== 'undefined') {
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
    }

//    var constraints = { video: { facingMode: (frontCamera? "user" : "environment") }, audio: false };
    var constraints = { video: { facingMode: ("environment") }, audio: false };
    
/*
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            currentStream = stream;
            
            const track = stream.getVideoTracks()[0];

            imageCapture = new ImageCapture(track);
            
            imageCapture.takePhoto()
            .then(blob => createImageBitmap(blob))
            .then(imageBitmap => {
                drawCanvas(photoDisplay, imageBitmap);
            });
   
        })
        .catch(function(error) {
            console.error("Error happened.", error);
        });
*/
navigator.mediaDevices.getUserMedia({video: { facingMode: ("environment") }})
  .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;

      videoDevice = mediaStream.getVideoTracks()[0];
  // Check if this device supports a picture mode...
  let captureDevice = new ImageCapture(videoDevice);
  if (captureDevice) {
    captureDevice.grabFrame().then(processFrame).catch();
  }

    
    
    })
  .catch();
}
function processFrame(imageBitmap) {
  photoDisplay.width = imageBitmap.width;
  photoDisplay.height = imageBitmap.height;
  photoDisplay.getContext('2d').drawImage(imageBitmap, 0, 0);
}



// Take a photo when takePhotoButton is clicked
takePhotoButton.onclick = function() {
    cameraDevice.width = cameraView.videoWidth;
    cameraDevice.height = cameraView.videoHeight;
    cameraDevice.getContext("2d").drawImage(cameraView, 0, 0);
    photoDisplay.src = cameraDevice.toDataURL("image/png");
//    photoDisplay.src = cameraDevice.toDataURL("image/webp");
    
      // here is the most important part because if you dont replace you will get a DOM 18 exception.
//var image = cameraDevice.toDataURL("image/webp").replace("image/webp", "image/octet-stream");
//photoDisplay.src(cameraDevice.toDataURL("image/webp").replace("image/webp", "image/octet-stream"));




/*
        var link = document.createElement('a');
        link.download = 'test.png';
        link.href = cameraDevice.toDataURL("image/png");
        link.style.display = "none";
        link.click();
*/




/*
    dataurl = photoDisplay.src = cameraDevice.toDataURL("image/png");
canvas2image.saveAsPNG(cameraDevice);
*/  
/*
cameraDevice.toBlob(function(blob) {
      FileSaver.saveAs(blob, 'mypng.png');
    });
*/
    photoDisplay.classList.add("photo-taken");

};

frontCameraButton.onclick = function() { 
    frontCamera = !frontCamera;
    if (frontCamera) {
        frontCameraButton.textContent = "Back Camera";
    }
    else {
        frontCameraButton.textContent = "Front Camera";
    }
    cameraStart();
};

// Start the camera and video streaming when the window loads
// 1st parameter: Event type
// 2nd parameter:Function to be called when the event occurs
window.addEventListener("load", cameraStart);

