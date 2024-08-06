import { exec } from 'child_process';
import * as fs from 'fs';

// Example input image stored as a JavaScript variable (base64 encoded string)
const inputImage: string = 'data:image/png;base64,...'; // Your image data here

// Decode the base64 image and save it to a file
const base64Data: string = inputImage.replace(/^data:image\/png;base64,/, "");
const inputFilePath: string = 'input.png';
const outputFilePath: string = 'output.png';

fs.writeFileSync(inputFilePath, base64Data, 'base64');

// Run the stegjs command line tool
exec(`stegjs hide -i ${inputFilePath} -o ${outputFilePath} -m "Your hidden message"`, (error: Error | null, stdout: string, stderr: string) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  // Read the output image
  const outputImage: string = fs.readFileSync(outputFilePath, { encoding: 'base64' });

  // Convert the output image to a data URL
  const outputImageDataURL: string = `data:image/png;base64,${outputImage}`;

  console.log('Output Image Data URL:', outputImageDataURL);
  // Now you can use `outputImageDataURL` as a JavaScript variable
});
