import stega, { vercelStegaCombine, vercelStegaDecode } from '@vercel/stega';

const string1 = 'Worm Regards';
const string2 = 'Worm Regards';

const encodedString = vercelStegaCombine(string1, { foo: 'bar' });
// console.log(encodedString);

const decodedString1 = vercelStegaDecode(string1);
// console.log(`This is string1, raw: ${decodedString1}`); // Hoping for: undefined

const decodedString2 = vercelStegaDecode(string2);
// console.log(`This is string2, raw: ${decodedString2}`); // Hoping for: undefined

const decodedTrueStringHiddenJSON = vercelStegaDecode(encodedString);
// console.log(`This is the encoded string1, decoded: ${decodedTrueStringHiddenJSON}`); // Hoping for: JSON

// ##########################
// ##########################
// ##########################

const oneHundredJson = {
  Account1: {
    Username: '1',
    Password: 'Pass1'
  },
  Account2: {
    Username: '2',
    Password: 'Pass2'
  },
  Account3: {
    Username: '3',
    Password: 'Pass3'
  },
  Account4: {
    Username: '4',
    Password: 'Pass4'
  },
  Account5: {
    Username: '5',
    Password: 'Pass5'
  },
  Account6: {
    Username: '6',
    Password: 'Pass6'
  },
  Account7: {
    Username: '7',
    Password: 'Pass7'
  },
  Account8: {
    Username: '8',
    Password: 'Pass8'
  },
  Account9: {
    Username: '9',
    Password: 'Pass9'
  },
  Account10: {
    Username: '10',
    Password: 'Pass10'
  },
  Account11: {
    Username: '11',
    Password: 'Pass11'
  },
  Account12: {
    Username: '12',
    Password: 'Pass12'
  },
  Account13: {
    Username: '13',
    Password: 'Pass13'
  },
  Account14: {
    Username: '14',
    Password: 'Pass14'
  },
  Account15: {
    Username: '15',
    Password: 'Pass15'
  },
  Account16: {
    Username: '16',
    Password: 'Pass16'
  },
  Account17: {
    Username: '17',
    Password: 'Pass17'
  },
  Account18: {
    Username: '18',
    Password: 'Pass18'
  },
  Account19: {
    Username: '19',
    Password: 'Pass19'
  },
  Account20: {
    Username: '20',
    Password: 'Pass20'
  },
  Account21: {
    Username: '21',
    Password: 'Pass21'
  },
  Account22: {
    Username: '22',
    Password: 'Pass22'
  },
  Account23: {
    Username: '23',
    Password: 'Pass23'
  },
  Account24: {
    Username: '24',
    Password: 'Pass24'
  },
  Account25: {
    Username: '25',
    Password: 'Pass25'
  },
  Account26: {
    Username: '26',
    Password: 'Pass26'
  },
  Account27: {
    Username: '27',
    Password: 'Pass27'
  },
  Account28: {
    Username: '28',
    Password: 'Pass28'
  },
  Account29: {
    Username: '29',
    Password: 'Pass29'
  },
  Account30: {
    Username: '30',
    Password: 'Pass30'
  },
  Account31: {
    Username: '31',
    Password: 'Pass31'
  },
  Account32: {
    Username: '32',
    Password: 'Pass32'
  },
  Account33: {
    Username: '33',
    Password: 'Pass33'
  },
  Account34: {
    Username: '34',
    Password: 'Pass34'
  },
  Account35: {
    Username: '35',
    Password: 'Pass35'
  },
  Account36: {
    Username: '36',
    Password: 'Pass36'
  },
  Account37: {
    Username: '37',
    Password: 'Pass37'
  },
  Account38: {
    Username: '38',
    Password: 'Pass38'
  },
  Account39: {
    Username: '39',
    Password: 'Pass39'
  },
  Account40: {
    Username: '40',
    Password: 'Pass40'
  },
  Account41: {
    Username: '41',
    Password: 'Pass41'
  },
  Account42: {
    Username: '42',
    Password: 'Pass42'
  },
  Account43: {
    Username: '43',
    Password: 'Pass43'
  },
  Account44: {
    Username: '44',
    Password: 'Pass44'
  },
  Account45: {
    Username: '45',
    Password: 'Pass45'
  },
  Account46: {
    Username: '46',
    Password: 'Pass46'
  },
  Account47: {
    Username: '47',
    Password: 'Pass47'
  },
  Account48: {
    Username: '48',
    Password: 'Pass48'
  },
  Account49: {
    Username: '49',
    Password: 'Pass49'
  },
  Account50: {
    Username: '50',
    Password: 'Pass50'
  },
  Account51: {
    Username: '51',
    Password: 'Pass51'
  },
  Account52: {
    Username: '52',
    Password: 'Pass52'
  },
  Account53: {
    Username: '53',
    Password: 'Pass53'
  },
  Account54: {
    Username: '54',
    Password: 'Pass54'
  },
  Account55: {
    Username: '55',
    Password: 'Pass55'
  },
  Account56: {
    Username: '56',
    Password: 'Pass56'
  },
  Account57: {
    Username: '57',
    Password: 'Pass57'
  },
  Account58: {
    Username: '58',
    Password: 'Pass58'
  },
  Account59: {
    Username: '59',
    Password: 'Pass59'
  },
  Account60: {
    Username: '60',
    Password: 'Pass60'
  },
  Account61: {
    Username: '61',
    Password: 'Pass61'
  },
  Account62: {
    Username: '62',
    Password: 'Pass62'
  },
  Account63: {
    Username: '63',
    Password: 'Pass63'
  },
  Account64: {
    Username: '64',
    Password: 'Pass64'
  },
  Account65: {
    Username: '65',
    Password: 'Pass65'
  },
  Account66: {
    Username: '66',
    Password: 'Pass66'
  },
  Account67: {
    Username: '67',
    Password: 'Pass67'
  },
  Account68: {
    Username: '68',
    Password: 'Pass68'
  },
  Account69: {
    Username: '69',
    Password: 'Pass69'
  },
  Account70: {
    Username: '70',
    Password: 'Pass70'
  },
  Account71: {
    Username: '71',
    Password: 'Pass71'
  },
  Account72: {
    Username: '72',
    Password: 'Pass72'
  }
};

const blackBase64 =
  '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';

const encodedblackBase64 = vercelStegaCombine(blackBase64, oneHundredJson);
console.log('encoded string: "' + encodedblackBase64 + '"');

const decodedblackBase64 = vercelStegaDecode(encodedblackBase64);
console.log(decodedblackBase64);
