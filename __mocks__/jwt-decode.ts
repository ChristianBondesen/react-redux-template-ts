import { decodedToken } from './../src/state/ducks/user/__mocks__/userTestData';

// const decode = jest.genMockFromModule('jwt-decode');

// tslint:disable-next-line:variable-name
const jwt_decode = jest.fn(() => {
  return decodedToken;
});

export default jwt_decode;
