import React, { useEffect, useRef, useState } from 'react';
import ImageUploader from '../components/image-uploader.tsx';
import ExistingCredentialForms from '../components/edit-existing-credentials.tsx';
import AddNewCredentialsForm from '../components/submit-new-credential.tsx';
import { NewCredentialRecord } from '../components/submit-new-credential.tsx';
import MasterPasswordModal from '../components/master-password-scrim.tsx';
import { encodeImageWithLSB } from '../utils/lsb-functions.ts';
import EncodedScreen from './Encoded-Screen.tsx';
export interface SingleCredentialRecord {
  CredentialID: number;
  DateAdded?: Date; //make mandatory once testing is complete
  DateAddedMilliseconds: number;
  Service: string;
  Username: string;
  Password: string;
}
export type AllCredentialsRecord = SingleCredentialRecord[];

export default function EncodeNewScreen({ onScreenChange }) {
  //Global Variables
  let allCredentials: AllCredentialsRecord = [];

  // State Variables
  const [currentUploadedImageDataURL, setCurrentUploadedImageDataURL] = useState<string>('');
  const [credentialQueue, setCredentialQueue] = useState<AllCredentialsRecord>(allCredentials);
  const [isEncodeButtonEnabled, setIsEncodeButtonEnabled] = useState(false);
  const [isNewCredentialFormVisible, setIsNewCredentialFormVisible] = useState(false);
  const [isMasterPasswordModalOpen, setIsMasterPasswordModalOpen] = useState(false);
  const [encodedImageDataURL, setEncodedImageDataURL] = useState<string>(
    currentUploadedImageDataURL
  );
  const [showEncodedScreen, setShowEncodedScreen] = useState(false);

  // Ref to store the initial credentialQueue value
  const initialCredentialQueue = useRef(allCredentials);

  // Effect to detect changes in credentialQueue
  useEffect(() => {
    // Check if the current credentialQueue is different from the initial one
    const hasQueueChanged =
      JSON.stringify(credentialQueue) !== JSON.stringify(initialCredentialQueue.current);
    setIsEncodeButtonEnabled(hasQueueChanged);
  }, [credentialQueue]);

  // One Thing Functions:

  function showNewCredentialForm() {
    setIsNewCredentialFormVisible(true);
  }

  function hideNewCredentialForm() {
    setIsNewCredentialFormVisible(false);
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

  // function onSave() {
  //   writeCredentialQueueToDatabase();
  //   console.log('This is allCredentials after the Queue has updated them:', allCredentials);
  // }

  function onEcode() {
    setIsMasterPasswordModalOpen(true);
  }

  // handle functions
  function handleImageChange(imageURL: string) {
    setCurrentUploadedImageDataURL(imageURL);
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
    writeCredentialQueueToDatabase();
    console.log('This is allCredentials after the Queue has updated them:', allCredentials);
  }

  function handleDeleteCredential(credentialID: number) {
    setCredentialQueue(
      credentialQueue.filter((credential) => credential.CredentialID !== credentialID) //remove any credentials with this ID
    );
  }

  async function handleMasterPasswordModalSubmit(masterPassword: string) {
    console.log('Master password submitted:', masterPassword);
    try {
      const LSBOutput = await encodeImageWithLSB(
        currentUploadedImageDataURL,
        credentialQueue,
        masterPassword
      );
      setEncodedImageDataURL(LSBOutput);
      setShowEncodedScreen(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {showEncodedScreen || (
        <h1 className="text-3xl font-bold text-gray-800 mb-6">You must be new here. Welcome</h1>
      )}
      <button
        className="mb-5 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
        onClick={() => onScreenChange('home')}
      >
        Home
      </button>

      <div className="ImageEncoder w-full max-w-md mx-auto">
        <ImageUploader onImageUpload={handleImageChange} />
        {currentUploadedImageDataURL && (
          <>
            <h2 className="block text-3xl font-medium text-gray-700 mt-8 mb-8 ">
              Login Credentials
            </h2>
            {credentialQueue.map((existingCredential) => (
              <ExistingCredentialForms
                key={existingCredential.CredentialID}
                childID={existingCredential.CredentialID}
                existingCredential={existingCredential}
                sendSingleCredential={handleEditedCredential}
                deleteSingleCredential={handleDeleteCredential}
              />
            ))}
            <button
              className={
                isNewCredentialFormVisible
                  ? 'add-new-credential-button mr-2 bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg shadow cursor-not-allowed'
                  : 'add-new-credential-button mr-2 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300'
              }
              onClick={showNewCredentialForm}
              disabled={isNewCredentialFormVisible}
            >
              Add Credential
            </button>
            {/* <button
              className="save-button bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
              onClick={onSave}
            >
              Save
            </button> */}
            {credentialQueue.length > 0 && (
              <button
                className="encode-button ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
                onClick={onEcode}
                disabled={!isEncodeButtonEnabled}
              >
                Encode Credentials to Image
              </button>
            )}

            {isNewCredentialFormVisible && (
              <AddNewCredentialsForm
                sendSingleCredential={handleNewCredential}
                enableAddNewButton={hideNewCredentialForm}
                onCancel={hideNewCredentialForm}
              />
            )}
          </>
        )}
        {isMasterPasswordModalOpen && (
          <MasterPasswordModal
            onClose={() => setIsMasterPasswordModalOpen(false)}
            onSubmit={handleMasterPasswordModalSubmit}
          />
        )}
      </div>
      {showEncodedScreen && <EncodedScreen encodedImageDataURL={encodedImageDataURL} />}
    </div>
  );
}
