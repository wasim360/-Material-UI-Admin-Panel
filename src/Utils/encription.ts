import CryptoJS from 'crypto-js';

const EncriptData = (data: any) => {
  let encription = CryptoJS.AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_ENCRIPTION_KEY}`);
  return encription;
};

const DecriptionData = (data: any) => {
  let bytes = CryptoJS.AES.decrypt(data, `${process.env.REACT_APP_ENCRIPTION_KEY}`);
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

export { EncriptData, DecriptionData };
