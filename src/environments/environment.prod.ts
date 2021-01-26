export const environment = {
  production: true,
  // baseUrl: 'http://localhost:3000/',
    baseUrl: 'http://13.233.112.57:3000/',
  cloudFunctions : {
    createOrder: 'https://us-central1-winpowerllc.cloudfunctions.net/createOrder',
    capturePayment: 'https://us-central1-winpowerllc.cloudfunctions.net/capturePayments'
  },
  RAZORPAY_KEY_ID: 'rzp_test_CGbO2pLW9aFgFk'
};

