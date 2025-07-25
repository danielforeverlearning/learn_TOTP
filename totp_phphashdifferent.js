//maybe do it in nodejs too tired can not think
/*******************************
const crypto = require('crypto');

function hashHmacJs(algo, data, key, raw_output = false) {
  const hmac = crypto.createHmac(algo, key);
  hmac.update(data);
  const digest = hmac.digest(raw_output ? 'binary' : 'hex');
  return digest;
}

// Example usage:
const key = 'mysecretkey';
const message = 'Hello, world!';
const algorithm = 'sha256';

// Equivalent to hash_hmac('sha256', 'Hello, world!', 'mysecretkey')
const hexOutput = hashHmacJs(algorithm, message, key);
console.log('Hex output:', hexOutput);

// Equivalent to base64_encode(hash_hmac('sha256', 'Hello, world!', 'mysecretkey', true))
const rawOutput = hashHmacJs(algorithm, message, key, true);
const base64Output = Buffer.from(rawOutput, 'binary').toString('base64');
console.log('Base64 output:', base64Output);
 ***********************************/


function arrayBufferToHex(buffer) {
  // Create a Uint8Array from the ArrayBuffer
  const uint8Array = new Uint8Array(buffer);
  let hexString = '';

  // Iterate over each byte in the Uint8Array
  for (let i = 0; i < uint8Array.length; i++) {
    // Convert the byte to its hexadecimal representation
    // toString(16) converts a number to a hex string
    // padStart(2, '0') ensures each hex value is two digits (e.g., '0A' instead of 'A')
    hexString += uint8Array[i].toString(16).padStart(2, '0');
  }
  return hexString;
}



function hex2bin(hexString) {
  let result = '';
  for (let i = 0; i < hexString.length; i += 2) {
    const hexByte = hexString.substring(i, i + 2);
    const decimalValue = parseInt(hexByte, 16);
    if (isNaN(decimalValue)) {
      // Handle invalid hex characters if necessary
      return false; // Or throw an error
    }
    result += String.fromCharCode(decimalValue);
  }
  return result;
}

function base32DecodeOneLowerChar(strsizeone) {
    if (strsizeone.toLowerCase().charAt(0) == "a")
    	return BigInt(0);
    else if (strsizeone.toLowerCase().charAt(0) == "b")
    	return BigInt(1);
    else if (strsizeone.toLowerCase().charAt(0) == "c")
    	return BigInt(2);
    else if (strsizeone.toLowerCase().charAt(0) == "d")
    	return BigInt(3);
    else if (strsizeone.toLowerCase().charAt(0) == "e")
    	return BigInt(4);
    else if (strsizeone.toLowerCase().charAt(0) == "f")
    	return BigInt(5);
    else if (strsizeone.toLowerCase().charAt(0) == "g")
    	return BigInt(6);
    else if (strsizeone.toLowerCase().charAt(0) == "h")
    	return BigInt(7);
    else if (strsizeone.toLowerCase().charAt(0) == "i")
    	return BigInt(8);
    else if (strsizeone.toLowerCase().charAt(0) == "j")
    	return BigInt(9);
    else if (strsizeone.toLowerCase().charAt(0) == "k")
    	return BigInt(10);
    else if (strsizeone.toLowerCase().charAt(0) == "l")
    	return BigInt(11);
    else if (strsizeone.toLowerCase().charAt(0) == "m")
    	return BigInt(12);
    else if (strsizeone.toLowerCase().charAt(0) == "n")
    	return BigInt(13);
    else if (strsizeone.toLowerCase().charAt(0) == "o")
    	return BigInt(14);
    else if (strsizeone.toLowerCase().charAt(0) == "p")
    	return BigInt(15);
    else if (strsizeone.toLowerCase().charAt(0) == "q")
    	return BigInt(16);
    else if (strsizeone.toLowerCase().charAt(0) == "r")
    	return BigInt(17);
    else if (strsizeone.toLowerCase().charAt(0) == "s")
    	return BigInt(18);
    else if (strsizeone.toLowerCase().charAt(0) == "t")
    	return BigInt(19);
    else if (strsizeone.toLowerCase().charAt(0) == "u")
    	return BigInt(20);
    else if (strsizeone.toLowerCase().charAt(0) == "v")
    	return BigInt(21);
    else if (strsizeone.toLowerCase().charAt(0) == "w")
    	return BigInt(22);
    else if (strsizeone.toLowerCase().charAt(0) == "x")
    	return BigInt(23);
    else if (strsizeone.toLowerCase().charAt(0) == "y")
    	return BigInt(24);
    else if (strsizeone.toLowerCase().charAt(0) == "z")
    	return BigInt(25);
    else if (strsizeone.toLowerCase().charAt(0) == "2")
    	return BigInt(26);
    else if (strsizeone.toLowerCase().charAt(0) == "3")
    	return BigInt(27);
    else if (strsizeone.toLowerCase().charAt(0) == "4")
    	return BigInt(28);
    else if (strsizeone.toLowerCase().charAt(0) == "5")
    	return BigInt(29);
    else if (strsizeone.toLowerCase().charAt(0) == "6")
    	return BigInt(30);
    else if (strsizeone.toLowerCase().charAt(0) == "7")
    	return BigInt(31);
    else
        throw("base32DecodeOneLowerChar not a thru z or 2 thru 7");
}


function savekey() {
     var SavedKey = document.getElementById("mykey").value;
     console.log(SavedKey);
     calculate(SavedKey);
}

//32 ascii-base32encoded-character x 5 bits per ascii-base32encoded-character ==
//160bits == 20 bytes
function getHexRepresentation(numbigint, symbols) {
    //4 byte-integer == 8 symbols
    //20 byte-integer == 40 symbols
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var result = '';
    while (symbols--) {
        result = hex[numbigint & BigInt(0xF)] + result;
        numbigint >>= BigInt(4);
    }
    
    return result;
}

function givemeunixepochtimechunks30seconds()
{
    const now = new Date();
    const myreturnint = Math.floor(now.getTime() / 30000);

    return myreturnint;
}

function convertBigIntToUTF8Str(myBigInt)
{
    const byteLength = Math.ceil(myBigInt.toString(16).length / 2);
    const uint8Array = new Uint8Array(byteLength);

    for (let i = 0; i < byteLength; i++) {
        uint8Array[byteLength - 1 - i] = Number((myBigInt >> BigInt(i * 8)) & 0xFFn);
    }

    const decoder = new TextDecoder('utf-8');
    const utf8String = decoder.decode(uint8Array);

    return utf8String;
}

//Browsers (Web Cryptography API):
//The Web Cryptography API provides the SubtleCrypto interface 
//for cryptographic operations, including HMAC generation.
async function js_hash_hmac_browser(algo, data, key, raw_output = false) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const dataData = encoder.encode(data);

    const importedKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: algo.toUpperCase() } },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        importedKey,
        dataData
    );

    if (raw_output) {
        // Return ArrayBuffer for raw output
        return signature;
    } else {
        // Convert ArrayBuffer to hex string
        return Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
}


async function calculate(key)
{
    var ii;
    var tempbigint;
    var n = BigInt(0);
    try {
        for (ii=0; ii < key.length; ii++) {
            n <<= BigInt(5);
            tempbigint = base32DecodeOneLowerChar(key.charAt(ii));
            n += tempbigint;
        }
        console.log("n = " + n);
        //var seedutf8str = convertBigIntToUTF8Str(n);
        //console.log("seedutf8str = " + seedutf8str);

        const keyseedBuffer = new ArrayBuffer(20);
        const keyseedview = new DataView(keyseedBuffer);
        //keyseedview.setUint32(0, Number(n), false);
        keyseedview.setUint32(0, Number(n), true);

        var seedhexstr = getHexRepresentation(n, 40);
        console.log("seedhexstr = " + seedhexstr);

        
        var testtime = givemeunixepochtimechunks30seconds();
        console.log("counter = " + testtime);
        var testtimehexstr = getHexRepresentation(BigInt(testtime), 16);
        var testtime2 = hex2bin(testtimehexstr);
        var testtimeutf8str = convertBigIntToUTF8Str(BigInt(testtime));
        /***********
        Encoding the Counter Value:
        The crypto.subtle.sign method expects the data to be signed
        as an ArrayBuffer or a TypedArray.
        The time-based moving factor, when calculated, will be an integer. 
        This integer needs to be converted into an ArrayBuffer of 8 bytes 
        (a 64-bit integer) in big-endian format.
        *************************************/
        // Get current time in seconds since epoch
//const epochSeconds = Math.floor(Date.now() / 1000); 

// Calculate the counter value (TOTP window typically 30 seconds)
//const timeStep = 30; // 30 seconds
//const counter = Math.floor(epochSeconds / timeStep);
//console.log("counter = " + counter);

// Encode the counter into an 8-byte buffer (big-endian)
//const dataBuffer = new ArrayBuffer(8);
//const view = new DataView(dataBuffer);
//view.setUint32(0, counter, false); // Set first 4 bytes
//view.setUint32(4, 0, false);       // Set last 4 bytes (for 64-bit counter)

//view.setUint32(0, 0, false);
//view.setUint32(4, counter, false); 

//view.setUint32(0, counter, true); 
//view.setUint32(4, 0, true); 

//view.setUint32(0, 0, true);
//view.setUint32(4, counter, true);


        // Example usage (in an async function or IIFE):
        //(async () => {

            //const hex_hmac = await js_hash_hmac_browser('SHA-1', dataBuffer, keyseedBuffer);
            //console.log('Hex HMAC (Browser):', hex_hmac);

            const rawsig = await js_hash_hmac_browser('SHA-1', testtimeutf8str, keyseedBuffer, true);
            const rawsighex = arrayBufferToHex(rawsig);
            console.log('rawsighex = ' + rawsighex);
            //const base64_hmac = btoa(String.fromCharCode(...new Uint8Array(raw_hmac)));
            //console.log('Base64 HMAC (Browser):', base64_hmac);
        //})();

    }
    catch(err) {
        console.log("ERROR: " + err);
    }
}

