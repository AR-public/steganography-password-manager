document.getElementById('fileInput').addEventListener('change', loadImage);
document.getElementById('encodeButton').addEventListener('click', encodeMessage);
document.getElementById('decodeInput').addEventListener('change', loadDecodeImage);
document.getElementById('decodeButton').addEventListener('click', decodeMessage);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let imgData;

let decodeCanvas = document.getElementById('decodeCanvas');
let decodeCtx = decodeCanvas.getContext('2d');
let decodeImgData;

// Load the image for encoding
function loadImage(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Encode the message into the image
function encodeMessage() {
  let message = document.getElementById('secretMessage').value;
  let binaryMessage = toBinary(message);
  let data = imgData.data;

  if (binaryMessage.length > data.length - 32) {
    // Reserve 32 bits for the message length
    alert('Message is too long to encode in this image.');
    return;
  }

  // Encode the length of the message in the first 32 bits
  for (let i = 0; i < 32; i++) {
    data[i] = (data[i] & 254) | ((binaryMessage.length >> i) & 1);
  }

  // Encode each bit of the message into the least significant bit of each pixel channel
  for (let i = 0; i < binaryMessage.length; i++) {
    data[32 + i] = (data[32 + i] & 254) | parseInt(binaryMessage[i]);
  }

  // Update canvas and image
  ctx.putImageData(imgData, 0, 0);
  let outputImage = document.getElementById('outputImage');
  outputImage.src = canvas.toDataURL();
}

// Convert the message to a binary string
function toBinary(message) {
  let binary = '';
  for (let i = 0; i < message.length; i++) {
    let binChar = message[i].charCodeAt(0).toString(2);
    binary += '00000000'.slice(binChar.length) + binChar; // Pad to 8 bits
  }
  return binary;
}

// Convert a binary string back to text
function fromBinary(binary) {
  let message = '';
  for (let i = 0; i < binary.length; i += 8) {
    let byte = binary.slice(i, i + 8);
    message += String.fromCharCode(parseInt(byte, 2));
  }
  return message;
}

// Load the image for decoding
function loadDecodeImage(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let img = new Image();
    img.onload = function () {
      decodeCanvas.width = img.width;
      decodeCanvas.height = img.height;
      decodeCtx.drawImage(img, 0, 0);
      decodeImgData = decodeCtx.getImageData(0, 0, decodeCanvas.width, decodeCanvas.height);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Decode the message from the image
function decodeMessage() {
  let data = decodeImgData.data;

  // Extract the message length from the first 32 bits
  let messageLength = 0;
  for (let i = 0; i < 32; i++) {
    messageLength |= (data[i] & 1) << i;
  }

  // Extract the message bits
  let binaryMessage = '';
  for (let i = 0; i < messageLength; i++) {
    binaryMessage += (data[32 + i] & 1).toString();
  }

  // Convert the binary string back to a readable message
  let decodedMessage = fromBinary(binaryMessage);
  document.getElementById('decodedMessage').textContent = decodedMessage;
}
