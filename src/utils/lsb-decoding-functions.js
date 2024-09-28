let decodeCanvas = document.getElementById('decodeCanvas');
let decodeCtx = decodeCanvas.getContext('2d');
let decodeImgData;

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
