const backendDomain = "http://localhost:5000";
const SummaryApi = {
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
    }
}

export default SummaryApi