export default class Errors {

    static getErrorMessage(error) {
        if (error.response) {
            return error.response.data.message;
        } else return error.toString();
    }
}
