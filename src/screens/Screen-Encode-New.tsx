import React, { useState } from 'react';
import ImageUploaderComponent from '../components/image-uploader.tsx';
import DisplayUserImage from '../components/image-display.tsx';
import ExistingCredentialForms from '../components/edit-existing-credentials.tsx';
import { ImageListType } from 'react-images-uploading';
import AddNewCredentialsForm from '../components/submit-new-credentials.tsx';
import { NewCredentialRecord } from '../components/submit-new-credentials.tsx';
export interface SingleCredentialRecord {
  CredentialID: number;
  DateAdded?: Date; //make mandatory once testing is complete
  DateAddedMilliseconds: number;
  Service: string;
  Username: string;
  Password: string;
}

export default function EncodeNewScreen({ onScreenChange }) {
  type AllCredentialsRecord = SingleCredentialRecord[];

  //Global Variables
  let allCredentials: AllCredentialsRecord = [
    {
      CredentialID: 1,
      DateAddedMilliseconds: 1727677736118,
      Service: 'Testflix +',
      Username: 'agnon',
      Password: 'Testflix_Password123'
    },
    {
      CredentialID: 2,
      DateAddedMilliseconds: 1727677736118,
      Service: 'YToob Premium',
      Username: 'agnon',
      Password: 'YToob_Password123'
    },
    {
      CredentialID: 5,
      DateAddedMilliseconds: 1727677736118,
      Service: 'YToob Basic',
      Username: 'agnon',
      Password: 'YToob_Password123'
    }
  ];

  // State Variables
  const [currentUploadedImage, setCurrentUploadedImage] = useState<ImageListType>([]);
  const [credentialQueue, setCredentialQueue] = useState<AllCredentialsRecord>(allCredentials);
  const [isNewCredentialFormVisible, setNewCredentialFormVisible] = useState(false);

  // One Thing Functions:

  function showNewCredentialForm() {
    setNewCredentialFormVisible(true);
  }

  function hideNewCredentialForm() {
    setNewCredentialFormVisible(false);
  }

  function idExistsInQueue(id: number): boolean {
    return credentialQueue.some((credential) => credential.CredentialID === id);
  }

  function overwriteCredentialInQueue(newCredential: SingleCredentialRecord): void {
    setCredentialQueue((prevQueue) => {
      // Find the index of the item with the matching CredentialID
      const index = prevQueue.findIndex(
        (credential) => credential.CredentialID === newCredential.CredentialID
      );

      // If an item with the matching ID is found, create a new array with the updated credential
      if (index !== -1) {
        // Create a shallow copy of the previous queue array
        const updatedQueue = [...prevQueue];
        // Replace the item at the found index with the new credential
        updatedQueue[index] = newCredential;

        return updatedQueue;
      }

      // If no matching ID is found, return the previous state unchanged
      return prevQueue;
    });
  }

  function findNextAvailableID(credentials: AllCredentialsRecord): number {
    // Sort the array by CredentialID to ensure it’s in ascending order
    const sortedCredentials = credentials.sort((a, b) => a.CredentialID - b.CredentialID);

    // Start checking from ID = 1
    let expectedID = 1;

    for (const credential of sortedCredentials) {
      // If there’s a gap in the sequence, return the expected ID
      if (credential.CredentialID !== expectedID) {
        return expectedID;
      }
      // Otherwise, increment expectedID to check the next in sequence
      expectedID++;
    }

    // If no gaps were found, return the next ID after the highest one
    return expectedID;
  }

  function assignIDToNewCredential(newCredential: NewCredentialRecord | SingleCredentialRecord) {
    //newCredential switches structure from one interface to another
    const newID = findNextAvailableID(credentialQueue);
    const newCredentialWithID = {
      CredentialID: newID,
      ...newCredential
    };
    return newCredentialWithID;
  }

  function concatNewCredentialToQueue(newCredential: SingleCredentialRecord) {
    setCredentialQueue(credentialQueue.concat(newCredential));
  }

  function writeCredentialQueueToDatabase() {
    allCredentials = credentialQueue;
  }

  function onSave() {
    writeCredentialQueueToDatabase();
    console.log('This is allCredentials after the Queue has updated them:', allCredentials);
  }

  // handle functions
  function handleImageChange(image: ImageListType) {
    setCurrentUploadedImage(image);
  }

  function handleEditedCredential(editedCredential: SingleCredentialRecord) {
    if (idExistsInQueue(editedCredential.CredentialID)) {
      console.log('Success! This ID exists in the Queue and can be overwritten');
      overwriteCredentialInQueue(editedCredential);
    } else {
      throw new Error("ERR: Edited credential doesn't exist in database. Logic has failed");
    }
  }

  function handleNewCredential(newCredential: NewCredentialRecord) {
    let newCredentialWithID: SingleCredentialRecord = assignIDToNewCredential(newCredential);
    concatNewCredentialToQueue(newCredentialWithID);
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
            {credentialQueue.map((existingCredential) => (
              <ExistingCredentialForms
                key={existingCredential.CredentialID}
                childID={existingCredential.CredentialID}
                existingCredential={existingCredential}
                sendSingleCredential={handleEditedCredential}
              />
            ))}
            <button
              className="add-new-credential-button"
              onClick={showNewCredentialForm}
              disabled={isNewCredentialFormVisible}
            >
              Add New
            </button>
            <button className="save-button" onClick={onSave}>
              Save
            </button>
            {isNewCredentialFormVisible && (
              <AddNewCredentialsForm
                sendSingleCredential={handleNewCredential}
                enableAddNewButton={hideNewCredentialForm}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
