const backendDomain = "http://localhost:5000";
const SummaryApi = {
    // Auth
    signUp : {
        url: `${backendDomain}/api/v1/auth/register`,
        method: "post"
    },
    login : {
        url: `${backendDomain}/api/v1/auth/login`,
        method: "post"
    },
    forgotPassword : {
        url: `${backendDomain}/api/v1/auth/forget-password`,
        method: "post"
    },
    verifyCode : {
        url: `${backendDomain}/api/v1/auth/verify-code`,
        method: "post"
    },
    getMe : {
        url: `${backendDomain}/api/v1/auth/me`,
        method: "get"
    },
    logout : {
        url: `${backendDomain}/api/v1/auth/logout`,
        method: "post"
    },

    // User
    userlist : {
        url: `${backendDomain}/api/v1/user`,
        method: "get"
    },
    deleteUser : {
        url: `${backendDomain}/api/v1/user`,
        method: "delete"
    },
    updateUser : {
        url: `${backendDomain}/api/v1/user`,
        method: "put"
    },
}

export default SummaryApi