// import React, { useRef, useState } from 'react';
// import ImageUploader from '../components/image-uploader.tsx';
// import { decodeImageWithLSB } from '../utils/lsb-functions.ts';
// import { AllCredentialsRecord } from './Screen-Encode-New.tsx';

// export default function DecodeExistingScreen({ onScreenChange }) {
//   // State Variables
//   const [currentUploadedImageDataURL, setCurrentUploadedImageDataURL] = useState<string>('');
//   const [decodedData, setDecodedData] = useState<AllCredentialsRecord>();
//   const [showDecodedData, setShowDecodedData] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // One Thing Functions
//   async function submitMasterPassword(masterPassword: string) {
//     let LsbDecoderResult = await decodeImageWithLSB(currentUploadedImageDataURL, masterPassword);
//     console.log('LsbDecoderResult:', LsbDecoderResult);
//     if (LsbDecoderResult) {
//       setDecodedData(LsbDecoderResult);
//       setShowDecodedData(true);
//     }
//   }

//   // handle functions
//   function handleImageChange(imageURL: string) {
//     setCurrentUploadedImageDataURL(imageURL);
//   }

//   const handleSubmit = () => {
//     const password = inputRef.current?.value || '';
//     submitMasterPassword(password);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, friend.</h1>
//       <button
//         className="home-button mb-5 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
//         onClick={() => onScreenChange('home')}
//       >
//         Home
//       </button>

//       <div className="w-full max-w-md mx-auto">
//         <ImageUploader onImageUpload={handleImageChange} />
//         {currentUploadedImageDataURL && (
//           <div className="mt-6">
//             <label
//               htmlFor="master-password"
//               className="block text-lg font-medium text-gray-700 mb-2"
//             >
//               Master Password:
//             </label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 id="confirm-master-password"
//                 ref={inputRef}
//                 name="master-password"
//                 className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 focus:ring-blue-400 focus:border-blue-400"
//                 placeholder="Enter your password"
//               />
//               <button
//                 className="ml-2 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
//                 onClick={handleSubmit}
//               >
//                 Decode
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {showDecodedData && decodedData && (
//         <div className="decoded-credentials-container mt-10 w-full max-w-2xl mx-auto">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Decoded Credentials</h1>
//           {decodedData.map((decodedCredential) => (
//             <div
//               key={decodedCredential.CredentialID}
//               className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
//             >
//               <p className="text-lg service font-semibold text-blue-600">
//                 {decodedCredential.Service}
//               </p>
//               <p className="text-lg username text-gray-700">
//                 Username: {decodedCredential.Username}
//               </p>
//               <p className="text-lg password text-gray-700">
//                 Password: {decodedCredential.Password}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useRef, useState } from 'react';
import ImageUploader from '../components/image-uploader.tsx';
import { decodeImageWithLSB } from '../utils/lsb-functions.ts';
import { AllCredentialsRecord } from './Screen-Encode-New.tsx';

export default function DecodeExistingScreen({ onScreenChange }) {
  const [currentUploadedImageDataURL, setCurrentUploadedImageDataURL] = useState<string>('');
  const [decodedData, setDecodedData] = useState<AllCredentialsRecord>();
  const [filteredData, setFilteredData] = useState<AllCredentialsRecord>();
  const [showDecodedData, setShowDecodedData] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function submitMasterPassword(masterPassword: string) {
    let LsbDecoderResult = await decodeImageWithLSB(currentUploadedImageDataURL, masterPassword);
    if (LsbDecoderResult) {
      setDecodedData(LsbDecoderResult);
      setFilteredData(LsbDecoderResult);
      setShowDecodedData(true);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filteredResults = decodedData?.filter((credential) =>
      credential.Service.toLowerCase().includes(query)
    );
    setFilteredData(filteredResults);
  };

  const handleImageChange = (imageURL: string) => {
    setCurrentUploadedImageDataURL(imageURL);
  };

  const handleSubmit = () => {
    const password = inputRef.current?.value || '';
    submitMasterPassword(password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, friend.</h1>
      <button
        className="home-button mb-5 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
        onClick={() => onScreenChange('home')}
      >
        Home
      </button>

      <div className="w-full max-w-md mx-auto">
        <ImageUploader onImageUpload={handleImageChange} />

        {/* Master Password Section */}
        {currentUploadedImageDataURL && !showDecodedData && (
          <div className="mt-6">
            <label
              htmlFor="master-password"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Master Password:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="confirm-master-password"
                ref={inputRef}
                name="master-password"
                className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter your password"
              />
              <button
                className="ml-2 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
                onClick={handleSubmit}
              >
                Decode
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Decoded Credentials Section */}
      {showDecodedData && filteredData && (
        <div className="decoded-credentials-container mt-10 w-full max-w-2xl mx-auto">
          <div
            className={`flex items-center justify-between mb-4 transition-all duration-300 ${
              isSearchFocused ? 'justify-start' : 'justify-center'
            }`}
          >
            <h1
              className={`text-2xl font-bold text-gray-800 transition-all duration-300 ${
                isSearchFocused ? 'translate-x-4' : 'translate-x-0'
              }`}
            >
              Decoded Credentials
            </h1>

            {/* Search Bar */}
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? 'w-64' : 'w-10'
              }`}
              onClick={() => setIsSearchFocused(true)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            >
              <div
                className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                  isSearchFocused ? 'hidden' : ''
                }`}
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-400 focus:border-blue-400 ${
                  isSearchFocused ? '' : 'opacity-0'
                } transition-opacity duration-300`}
                onChange={handleSearch}
                onBlur={() => setIsSearchFocused(false)}
                onFocus={() => setIsSearchFocused(true)}
              />
            </div>
          </div>

          {filteredData.map((decodedCredential) => (
            <div
              key={decodedCredential.CredentialID}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
            >
              <p className="text-lg service font-semibold text-blue-600">
                {decodedCredential.Service}
              </p>
              <p className="text-lg username text-gray-700">
                Username: {decodedCredential.Username}
              </p>
              <p className="text-lg password text-gray-700">
                Password: {decodedCredential.Password}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
