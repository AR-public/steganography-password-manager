type Credential = {
  CredentialID: number;
  DateAddedMilliseconds: number;
  Service: string;
  Username: string;
  Password: string;
};

// Helper function to convert a string to a bit array
function stringToBits(str: string): number[] {
  return str.split('').flatMap((char) => {
    const charCode = char.charCodeAt(0);
    return Array.from({ length: 8 }, (_, i) => (charCode >> (7 - i)) & 1);
  });
}

// Helper function to convert a bit array back to a string
function bitsToString(bits: number[]): string {
  let str = '';
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.slice(i, i + 8).reduce((acc, bit, j) => acc | (bit << (7 - j)), 0);
    str += String.fromCharCode(byte);
  }
  return str;
}

// Function to load image data from a data URL using Canvas
function loadImageDataFromDataURL(dataURL: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataURL;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };
    img.onerror = reject;
  });
}

// Function to convert ImageData back to a data URL
function imageDataToDataURL(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }
  throw new Error('Failed to get canvas context');
}

// Function to encode data with LSB
export async function encodeImageWithLSB(
  imageDataURL: string,
  credentials: Credential[],
  password: string
): Promise<string> {
  const imageData = await loadImageDataFromDataURL(imageDataURL);

  // Prepare the data to encode (stringify credentials + password)
  const data = JSON.stringify({ credentials, password });
  const bits = stringToBits(data);

  let bitIndex = 0;
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (bitIndex >= bits.length) break;

    // Use the blue channel (imageData.data[i + 2]) for LSB encoding
    imageData.data[i + 2] = (imageData.data[i + 2] & 0xfe) | bits[bitIndex];
    bitIndex++;
  }

  // Convert modified ImageData back to a data URL
  return imageDataToDataURL(imageData);
}

// Function to decode data from LSB
export async function decodeImageWithLSB(
  encodedImageDataURL: string,
  password: string
): Promise<Credential[] | null> {
  const imageData = await loadImageDataFromDataURL(encodedImageDataURL);

  const bits: number[] = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Extract the least significant bit of the blue channel
    bits.push(imageData.data[i + 2] & 1);
  }

  const decodedData = bitsToString(bits);

  try {
    const parsedData = JSON.parse(decodedData);

    // Verify password
    if (parsedData.password === password) {
      return parsedData.credentials;
    } else {
      console.log('Incorrect password.');
      return null;
    }
  } catch (error) {
    console.error('Error decoding data:', error);
    return null;
  }
}
