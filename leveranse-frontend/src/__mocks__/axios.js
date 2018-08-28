import { data as InformationProvider } from './InformationProvider.json';
import { data as Role } from './Role.json';
import { data as DescribedValueDomain } from './DescribedValueDomain.json';
import { data as UnitType } from './UnitType.json';
import { data as EnumeratedValueDomain } from './EnumeratedValueDomain.json';
import { data as SentinelValueDomain } from './SentinelValueDomain.json';
import { data as SubstantiveValueDomain } from './SubstantiveValueDomain.json';

const INFO_PROVIDER_BACKEND_ENDPOINT = 'http://localhost:9090/data/InformationProvider/';
const ROLE_BACKEND_ENDPOINT = 'http://localhost:9090/data/Role/';
const DESCRIBED_VALUE_DOMAIN_BACKEND_ENDPOINT = 'http://localhost:9090/data/DescribedValueDomain/';
const SENTINEL_VALUE_DOMAIN_BACKEND_ENDPOINT = 'http://localhost:9090/data/SentinelValueDomain/';
const ENUMERATED_VALUE_DOMAIN_BACKEND_ENDPOINT = 'http://localhost:9090/data/EnumeratedValueDomain/';
const SUBSTANTIVE_VALUE_DOMAIN_BACKEND_ENDPOINT = 'http://localhost:9090/data/SubstantiveValueDomain/';
const UNIT_TYPE_BACKEND_ENDPOINT = 'http://localhost:9090/data/UnitType/';


module.exports = {
  get: jest.fn((url) => {
    switch (url) {
      case INFO_PROVIDER_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (Info Provider): ", INFO_PROVIDER_BACKEND_ENDPOINT)
        return Promise.resolve({
          data: InformationProvider
        });
      }
      case ROLE_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (Role): ", ROLE_BACKEND_ENDPOINT)
        return Promise.resolve({
          data: Role
        });
      }
      case DESCRIBED_VALUE_DOMAIN_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (DescribedValueDomain): ", DESCRIBED_VALUE_DOMAIN_BACKEND_ENDPOINT)
        return Promise.resolve({
          status: 200,
          data: DescribedValueDomain
        });
      }
      case UNIT_TYPE_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (UnitType): ", UNIT_TYPE_BACKEND_ENDPOINT)
        return Promise.resolve({
          status: 200,
          data: UnitType
        });
      }
      case ENUMERATED_VALUE_DOMAIN_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (EnumeratedValueDomain): ", ENUMERATED_VALUE_DOMAIN_BACKEND_ENDPOINT)
        return Promise.resolve({
          status: 200,
          data: EnumeratedValueDomain
        });
      }
      case SENTINEL_VALUE_DOMAIN_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (SentinelValueDomain): ", SENTINEL_VALUE_DOMAIN_BACKEND_ENDPOINT)
        return Promise.resolve({
          status: 200,
          data: SentinelValueDomain
        });
      }
      case SUBSTANTIVE_VALUE_DOMAIN_BACKEND_ENDPOINT: {
        //console.log("Mock GET call for (SubstantiveValueDomain): ", SUBSTANTIVE_VALUE_DOMAIN_BACKEND_ENDPOINT)
        return Promise.resolve({
          status: 200,
          data: SubstantiveValueDomain
        });
      }
    }
  })
};
