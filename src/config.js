const config = {
  appPinCode: process.env.REACT_APP_APP_PIN || "1111", // PIN za ulaz u aplikaciju (podrazumevano "1111")
  passwordManagerPinCodeHash: process.env.REACT_APP_PASSWORD_MANAGER_PIN_HASH || "6d22c0456ba026f42197ddb46a753f0e",
};

export default config;
