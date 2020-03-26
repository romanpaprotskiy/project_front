import axios from "axios";
import Urls from "../../url";

export class ManagementService {

    getStudents = async (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/students?page=" + page + '&size=' + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    getGroups = async (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/groups?page=" + page + '&size=' + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    getRootGroups = async () => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/groups/root", {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    createGroup = async (request) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.post(Urls.BASE_V1_URL + "/groups",request,{
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };

    getTeachers = async () => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/teacher/all", {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };

    getTeachersPage = async (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/teacher?page=" + page + "&size=" + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };
}
