let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let imgData;

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
