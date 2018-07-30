import {data as InformationProvider} from './InformationProvider.json';
import {data as Role} from './Role.json';

const INFO_PROVIDER_BACKEND_ENDPOINT = 'http://localhost:9090/data/InformationProvider/';
const ROLE_BACKEND_ENDPOINT = 'http://localhost:9090/data/Role/';

module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case INFO_PROVIDER_BACKEND_ENDPOINT: {
        console.log("Mock GET call for (Info Provider): ", INFO_PROVIDER_BACKEND_ENDPOINT)
        return Promise.resolve({
          data: InformationProvider
        });
      }

      case ROLE_BACKEND_ENDPOINT: {
        console.log("Mock GET call for (Role): ", ROLE_BACKEND_ENDPOINT)
        return Promise.resolve({
          data: Role
        });
      }
    }
  })
};