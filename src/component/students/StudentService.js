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
}
