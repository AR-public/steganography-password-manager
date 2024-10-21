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
    setSingleCredentialEntry(credential);
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
            <AddNewCredentialsForm
              key={1}
              sendSingleCredential={receiveSingleCredential}
              childID={undefined}
            />

            <button className="save-button">Save</button>
          </>
        )}
      </div>
    </div>
  );
}

// onSubmit ->

// 0.5 stamp the credential with the child form it came from ✅

// 1. Send temp credential to parent ✅

// 2. Add credential to queue
// Check if credential with same child stamp exists in queue
// If no: concat with queue
// If yes: re-write queue entry

// onSave ->

// 1. Assign ID to all queue items
// Checks for ID ✅
// If yes: nothing ✅
// If no: Assign ID ✅

// 2. .map the queue items and add them to allCredentials

// 2. For each, check if the ID exists already
// If yes: re-write that entry
// If no:  concat with allCredentials

//-----------------------------------------------------------------------

// *** Display order is out of scope for now ***

// function assignDisplayOrderToCredentialQueue() {}

// function orderCredentialQueueByDisplayOrder() {
//   credentialQueue.sort((a, b) => a.DisplayOrder - b.DisplayOrder);
// }

// <AddNewCredentialsForm/> - "This will pass up a new list of credentials"
// If we provide an ID to each form, this will allow each new credential
// to be added to the same queue as existing credentials

// Write a function that checks allCredentials and puts all the ID's in an array called allIDs
// ExistingCredentials will not have any use for allIDs
// NewCredentials will use allIDs to check for the next available ID
// Once a new credential form is created, the next available ID will be assigned to it and added to allIDs
// When 'save' is pressed, allIDs[] will be reset
