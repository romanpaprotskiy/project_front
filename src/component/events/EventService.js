import axios from "axios";
import Urls from "../../url";

export class EventService {

    getTeachers = async () => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/users/teachers", {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };

    getStudents = async () => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/users/students", {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };

    getUsers = async (search) => {
        const accessToken = localStorage.getItem("accessToken");
        const request = {search: search};
        return await axios.post(Urls.BASE_V1_URL + "/users/all/search", request, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };

}

export default EventService;
