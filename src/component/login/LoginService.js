import axios from "axios";
import Urls from "../../url";

export class LoginService {

    authorize = (authorizationCode) => {
        return axios.post(Urls.BASE_V1_URL + '/social/signin/google',
            {authCode: authorizationCode, redirectUri: Urls.ROOT_URL});
    };

}
