import axios from "axios";
import Urls from "../../url";

export class ProfileService {

    getCurrentUserProfile = () => {
        const accessToken = localStorage.getItem("accessToken");
        return axios.get(Urls.BASE_V1_URL + '/profile/current', {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        });
    };
}
