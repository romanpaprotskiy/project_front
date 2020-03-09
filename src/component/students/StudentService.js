import axios from "axios";
import Urls from "../../url";

export class StudentService {

    getStudents = (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return axios.get(Urls.BASE_V1_URL + "/students?page=" + page + '&size=' + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    getGroups = (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return axios.get(Urls.BASE_V1_URL + "/groups?page=" + page + '&size=' + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    getRootGroups = () => {
        const accessToken = localStorage.getItem("accessToken");
        return axios.get(Urls.BASE_V1_URL + "/groups/root", {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    createGroup = (request) => {
        const accessToken = localStorage.getItem("accessToken");
        return axios.post(Urls.BASE_V1_URL + "/groups",request,{
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };
}
