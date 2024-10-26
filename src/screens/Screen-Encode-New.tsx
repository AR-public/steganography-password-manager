import React, { useState } from 'react';
import ImageUploaderComponent from '../components/image-uploader.tsx';
import DisplayUserImage from '../components/image-display.tsx';
import ExistingCredentialForms from '../components/edit-existing-credentials.tsx';
import { ImageListType } from 'react-images-uploading';
import AddNewCredentialsForm from '../components/submit-new-credentials.tsx';

export default function EncodeNewScreen({ onScreenChange }) {
  interface SingleCredentialRecord {
    CredentialID?: number; //make mandatory once testing is complete
    DateAdded?: Date; //make mandatory once testing is complete
    DateAddedMilliseconds: number;
    DateUpdated?: Date | null;
    DateUpdatedMilliseconds?: number | null;
    Service: string;
    Username: string;
    Password: string;
    DisplayOrder?: number;
    childID?: number;
  }

  type AllCredentialsRecord = SingleCredentialRecord[];

  let allCredentials: AllCredentialsRecord = [
    {
      CredentialID: 1,
      DateAddedMilliseconds: 1727677736118,
      Service: 'Testflix +',
      Username: 'agnon',
      Password: 'Testflix_Password123',
      DisplayOrder: 1
    },
    {
      CredentialID: 2,
      DateAddedMilliseconds: 1727677736118,
      Service: 'YToob Premium',
      Username: 'agnon',
      Password: 'YToob_Password123',
      DisplayOrder: 2
    },
    {
      CredentialID: 5,
      DateAddedMilliseconds: 1727677736118,
      Service: 'YToob Basic',
      Username: 'agnon',
      Password: 'YToob_Password123'
    }
  ];

  // One Thing Functions:
  function compileExistingIDs(array) {
    return array.map((credential) => credential.CredentialID);
  }

  function getNextID(arr: any[]) {
    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    // Iterate from 1 onward and check each position for the expected number
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i + 1) {
        return i + 1; // Return the next missing number in the sequence
      }
    }

    // If no gap was found, return the next number in the sequence
    return arr.length + 1;
  }

  function addNewIDToAllIDs(newID: number) {
    allIDs.push(newID);
  }

  // Initialise State Variables
  const [currentUploadedImage, setCurrentUploadedImage] = useState<ImageListType>([]);
  const [singleCredentialEntry, setSingleCredentialEntry] = useState<SingleCredentialRecord>(
    allCredentials[0] //allCredentials[0] is being used to initialise singleCredentialEntry so the type doesn't fall back to 'undefined'
  );
  const [isNewCredentialFormVisible, setNewCredentialFormVisible] = useState(false);

  //Initialise Global Variables
  let allIDs: [number];

  let credentialQueue: AllCredentialsRecord;

  function handleImageChange(image: ImageListType) {
    setCurrentUploadedImage(image);
  }

  function addToCredentialQueue(receivedCredential) {
    // rewrite any existing ID's
    const allQueueIDs = compileExistingIDs(credentialQueue);
    if (allQueueIDs.includes(receivedCredential)) {
    } else {
      credentialQueue = credentialQueue.concat(singleCredentialEntry);
    }
  }

  function assignCredentialID() {
    if (!singleCredentialEntry.CredentialID) {
      const allExistingIDs = compileExistingIDs(allCredentials);
      const nextAvailableID = getNextID(allExistingIDs);
      singleCredentialEntry.CredentialID = nextAvailableID;
    } else return;
  }

  function receiveSingleCredential(data: {
    childID: number | undefined;
    credential: SingleCredentialRecord;
  }) {
    const { childID, credential } = data;
    console.log('This is the submitted new credential:', credential);
    setSingleCredentialEntry(credential);
  }

  function showNewCredentialForm() {
    setNewCredentialFormVisible(true);
  }

  function hideNewCredentialForm() {
    setNewCredentialFormVisible(false);
  }

  return (
    <div>
      <h1>You must be new here. Welcome</h1>
      <div className="ImageEncoder">
        <button onClick={() => onScreenChange('home')}>Home</button>
        <ImageUploaderComponent latestUploadedImage={handleImageChange} />
        {currentUploadedImage[0] && (
          <>
            <DisplayUserImage currentUploadedImage={currentUploadedImage} />
            <h2>Login Credentials</h2>
            {allCredentials.map((existingCredential) => (
              <ExistingCredentialForms
                key={existingCredential.CredentialID}
                childID={existingCredential.CredentialID}
                existingCredential={existingCredential}
                sendSingleCredential={receiveSingleCredential}
              />
            ))}
            <button
              className="add-new-credential-button"
              onClick={showNewCredentialForm}
              disabled={isNewCredentialFormVisible}
            >
              Add New
            </button>
            <button className="save-button">Save</button>
            {isNewCredentialFormVisible && (
              <AddNewCredentialsForm
                key={1}
                childID={undefined}
                sendSingleCredential={receiveSingleCredential}
                enableAddNewButton={hideNewCredentialForm}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
