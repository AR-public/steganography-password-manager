import stega, { vercelStegaCombine, vercelStegaDecode } from '@vercel/stega';

const string1 = 'Worm Regards';
const string2 = 'Worm Regards';

const encodedString = vercelStegaCombine(string1, { foo: 'bar' });
console.log(encodedString);

const decodedString1 = vercelStegaDecode(string1);
console.log(`This is string1, raw: ${decodedString1}`); // Hoping for: undefined

const decodedString2 = vercelStegaDecode(string2);
console.log(`This is string2, raw: ${decodedString2}`); // Hoping for: undefined

const decodedTrueStringHiddenJSON = vercelStegaDecode(encodedString);
console.log(`This is the encoded string1, decoded: ${decodedTrueStringHiddenJSON}`); // Hoping for: JSON
