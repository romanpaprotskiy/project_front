import axios from "axios";
import Urls from "../../url";

export class SubjectService{

    getSubjects = async (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/subjects?page=" + page + "&size=" + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };
}
