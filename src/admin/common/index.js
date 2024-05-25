const backendDomain = "http://localhost:5000";
const SummaryApi = {
    signUp : {
        url: `${backendDomain}/api/v1/auth/register`,
        method: "post"
    },
    login : {
        url: `${backendDomain}/api/v1/auth/login`,
        method: "post"
    }
}

export default SummaryApi