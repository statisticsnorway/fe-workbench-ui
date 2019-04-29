import { getData } from '../utilities/fetch/Fetch'

class LdsServiceImpl {

  static getRoles = () =>
  {
    return getData(process.env.REACT_APP_ROLES)
  }
}

export default LdsServiceImpl
