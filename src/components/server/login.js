import axios from "axios";

import config from "../../config";



export async function loginResponse(formValues) {
    const response = await axios.post(`${config.dashboardlogin}`, formValues);
    return response.data;
}
