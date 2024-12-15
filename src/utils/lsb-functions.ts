type Credential = {
  CredentialID: number;
  DateAddedMilliseconds: number;
  Service: string;
  Username: string;
  Password: string;
};

// // Helper function to convert a string to a bit array
// function stringToBits(str: string): number[] {
//   return str.split('').flatMap((char) => {
//     const charCode = char.charCodeAt(0);
//     return Array.from({ length: 8 }, (_, i) => (charCode >> (7 - i)) & 1);
//   });
// }

// // Helper function to convert a bit array back to a string
// function bitsToString(bits: number[]): string {
//   let str = '';
//   for (let i = 0; i < bits.length; i += 8) {
//     const byte = bits.slice(i, i + 8).reduce((acc, bit, j) => acc | (bit << (7 - j)), 0);
//     str += String.fromCharCode(byte);
//   }
//   return str;
// }

// // Function to load image data from a data URL using Canvas
// function loadImageDataFromDataURL(dataURL: string): Promise<ImageData> {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = dataURL;
//     img.crossOrigin = 'Anonymous';
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.drawImage(img, 0, 0);
//         resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
//       } else {
//         reject(new Error('Failed to get canvas context'));
//       }
//     };
//     img.onerror = reject;
//   });
// }

// // Function to convert ImageData back to a data URL
// function imageDataToDataURL(imageData: ImageData): string {
//   const canvas = document.createElement('canvas');
//   canvas.width = imageData.width;
//   canvas.height = imageData.height;
//   const ctx = canvas.getContext('2d');
//   if (ctx) {
//     ctx.putImageData(imageData, 0, 0);
//     return canvas.toDataURL();
//   }
//   throw new Error('Failed to get canvas context');
// }

// // Function to encode data with LSB
// export async function encodeImageWithLSB(
//   imageDataURL: string,
//   credentials: Credential[],
//   password: string
// ): Promise<string> {
//   const imageData = await loadImageDataFromDataURL(imageDataURL);

//   // Prepare the data to encode (stringify credentials + password)
//   const data = JSON.stringify({ credentials, password });
//   const bits = stringToBits(data);

//   let bitIndex = 0;
//   for (let i = 0; i < imageData.data.length; i += 4) {
//     if (bitIndex >= bits.length) break;

//     // Use the blue channel (imageData.data[i + 2]) for LSB encoding
//     imageData.data[i + 2] = (imageData.data[i + 2] & 0xfe) | bits[bitIndex];
//     bitIndex++;
//   }

//   // Convert modified ImageData back to a data URL
//   return imageDataToDataURL(imageData);
// }

// // Function to decode data from LSB
// export async function decodeImageWithLSB(
//   encodedImageDataURL: string,
//   password: string
// ): Promise<Credential[] | null> {
//   const imageData = await loadImageDataFromDataURL(encodedImageDataURL);
//   // console.log('imageData:', imageData);
//   const bits: number[] = [];
//   for (let i = 0; i < imageData.data.length; i += 4) {
//     // Extract the least significant bit of the blue channel
//     bits.push(imageData.data[i + 2] & 1);
//   }
//   console.log('bits:', bits);
//   const decodedData = bitsToString(bits);
//   console.log('decodedData:', decodedData);

//   try {
//     const parsedData = JSON.parse(decodedData);

//     // Verify password
//     if (parsedData.password === password) {
//       return parsedData.credentials;
//     } else {
//       console.log('Incorrect password.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error decoding data:', error);
//     return null;
//   }
// }

// Helper function to convert a string to a bit array
function stringToBits(str: string): number[] {
  // Convert the string to Base64 for safe encoding
  const base64 = btoa(str); // `btoa` encodes a string into Base64
  return base64.split('').flatMap((char) => {
    const charCode = char.charCodeAt(0);
    return Array.from({ length: 8 }, (_, i) => (charCode >> (7 - i)) & 1);
  });
}

// Helper function to convert a bit array back to a string
function bitsToString(bits: number[]): string {
  // Group bits into 8-bit chunks and convert them to bytes
  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.slice(i, i + 8).reduce((acc, bit, j) => acc | (bit << (7 - j)), 0);
    bytes.push(byte);
  }

  // Decode bytes to Base64 string, then back to the original string
  const base64String = String.fromCharCode(...bytes);
  return atob(base64String); // `atob` decodes a Base64 string
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

  // Add the length of the data (in bits) as a 32-bit prefix
  const lengthBits = Array.from({ length: 32 }, (_, i) => (bits.length >> (31 - i)) & 1);
  const fullBits = lengthBits.concat(bits);

  let bitIndex = 0;
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (bitIndex >= fullBits.length) break;

    // Use the blue channel (imageData.data[i + 2]) for LSB encoding
    imageData.data[i + 2] = (imageData.data[i + 2] & 0xfe) | fullBits[bitIndex];
    bitIndex++;
  }

  // Convert modified ImageData back to a data URL
  return imageDataToDataURL(imageData);
}

// Function to decode data from LSB
export async function decodeImageWithLSB(
  encodedImageDataURL: string,
  password: string
): Promise<Credential[] | null | string> {
  try {
    const imageData = await loadImageDataFromDataURL(encodedImageDataURL);

    const bits: number[] = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Extract the least significant bit of the blue channel
      bits.push(imageData.data[i + 2] & 1);
    }

    // Check if there are enough bits to extract the length
    if (bits.length < 32) {
      console.error('Insufficient data for decoding.');
      return 'Insufficient data for decoding.';
    }

    // Decode the first 32 bits to determine the length of the data
    const length = bits.slice(0, 32).reduce((acc, bit, i) => acc | (bit << (31 - i)), 0);

    // Add a reasonable maximum limit to prevent processing excessive data
    const MAX_BITS = imageData.data.length / 4; // Number of pixels available
    if (length > MAX_BITS) {
      console.error('Decoded length exceeds available data. Possible corruption.');
      return 'Possible data corruption';
    }

    // Extract only the necessary bits
    const dataBits = bits.slice(32, 32 + length);

    // Check if there are enough bits for the specified length
    if (dataBits.length < length) {
      console.error('Data length mismatch. Possible corruption.');
      return 'possible corruption';
    }

    const decodedData = bitsToString(dataBits); // Decode bits to JSON string

    const parsedData = JSON.parse(decodedData); // Parse JSON data

    // Verify password
    if (parsedData.password === password) {
      return parsedData.credentials;
    } else {
      console.error('Incorrect password.');
      return 'incorrect password';
    }
  } catch (error) {
    console.error('Error during decoding:', error);
    return 'no password found';
  }
}
