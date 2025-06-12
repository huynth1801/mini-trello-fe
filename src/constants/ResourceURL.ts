import AppConstants from "./AppConstants";

const API_PATH = AppConstants.API_PATH

class ResourceURL {
    static SEND_TOKEN_SIGN_UP = API_PATH + "/auth/send-verification"
    static SIGN_UP = API_PATH + "/auth/sign-up"
    static SEND_TOKEN_SIGN_IN = API_PATH + "/auth/signin/send-token"
    static VERIFY_TOKEN_SIGN_IN = API_PATH + "/auth/signin"
    static VERIFY_TOKEN_SIGN_UP = API_PATH + "/auth/signup"
}

export default ResourceURL