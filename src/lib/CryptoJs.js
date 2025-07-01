/**PACKAGE */
import CryptoJS from 'crypto-js';

export const encryptObject = (encryptValue, SecretKey) => {
    try {
        // console.log("encryptValue : ", encryptValue, "Secret key : ", SecretKey)
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encryptValue), SecretKey).toString();
        console.log("ciphertext : ", ciphertext)
        return ciphertext
    }
    catch (err) {
        return ''
    }
}

export const decryptObject = (decryptValue, SecretKey) => {
    try {
        console.log(`${SecretKey}decryptObject`)
        let bytes = CryptoJS.AES.decrypt(decryptValue, SecretKey);
        console.log(bytes, 'decryptObject')
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData, 'decryptObject', bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    }
    catch (err) {
        console.log(err, 'decryptObject__err')
        return ''
    }
}


//Example payload : 

// jFqC7cZ3Ul -- This is a secretkey of  manashkumar1216@gmail.com

// STEP 1 : check your Bearer token 
// STEP 2 : check your payload values and its datatypes.
