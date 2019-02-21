// 'use strict';

// // On this codelab, you will be streaming only video (video: true).
// const mediaStreamConstraints = {
//     video: true,
// };

// // Video element where stream will be placed.
// const localVideo = document.querySelector('video');

// // Local stream that will be reproduced on the video.
// let localStream;

// // Handles success by adding the MediaStream to the video element.
// function gotLocalMediaStream(mediaStream) {
//     localStream = mediaStream;
//     localVideo.srcObject = mediaStream;
// }

// // Handles error by logging a message to the console with the error message.
// function handleLocalMediaStreamError(error) {
//     console.log('navigator.getUserMedia error: ', error);
// }

// // Initializes media stream.
// navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
//     .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);

'use strict';

var isInitiator;

window.room = prompt("Enter room name:");

var socket = io.connect();

if (room !== "") {
  console.log('Message from client: Asking to join room ' + room);
  socket.emit('create or join', room);
}

socket.on('created', function(room, clientId) {
  isInitiator = true;
});

socket.on('full', function(room) {
  console.log('Message from client: Room ' + room + ' is full :^(');
});

socket.on('ipaddr', function(ipaddr) {
  console.log('Message from client: Server IP address is ' + ipaddr);
});

socket.on('joined', function(room, clientId) {
  isInitiator = false;
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});