import axios from "axios";
import Urls from "../../url";

export class SubjectService {

    getSubjects = async (page, size) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/subjects?page=" + page + "&size=" + size, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };

    getSubjectDetails = async (subjectId) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.get(Urls.BASE_V1_URL + "/schedule/subject/" + subjectId, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });
    };

    createSubject = async (request) => {
        const accessToken = localStorage.getItem("accessToken");
        return await axios.post(Urls.BASE_V1_URL + "/subjects", request, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
    };
}
