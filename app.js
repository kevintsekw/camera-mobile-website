var frontCamera = true;
// // Set constraints for the video stream
// "user" => Front camera
// "environment" => Back camera
var constraints = { video: (frontCamera? "user" : "environment"), audio: false };
var track = null;

// Define constants
// Get the element in the document with id="camera-view", "camera-device", "photo-display", "take-photo-button"
const
    cameraView = document.querySelector("#camera-view"),
    cameraDevice = document.querySelector("#camera-device"),
    cameraDisplay = document.querySelector("#photo-display"),
    takePhotoButton = document.querySelector("#take-photo-button");
    frontCameraButton = document.querySelector("#front-camera-button");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error happened.", error);
        });
}

// Take a photo when takePhotoButton is clicked
takePhotoButton.onclick = function() {
    cameraDevice.width = cameraView.videoWidth;
    cameraDevice.height = cameraView.videoHeight;
    cameraDevice.getContext("2d").drawImage(cameraView, 0, 0);
    cameraDisplay.src = cameraDevice.toDataURL("image/webp");
    cameraDisplay.classList.add("photo-taken");
};

frontCameraButton.onclick = function() { 
    frontCamera = !frontCamera;
    if (frontCamera) {
        frontCameraButton.value = "Back Camera";
    }
    else {
        frontCameraButton.value = "Front Camera";
    }
};

// Start the camera and video streaming when the window loads
// 1st parameter: Event type
// 2nd parameter:Function to be called when the event occurs
window.addEventListener("load", cameraStart);
