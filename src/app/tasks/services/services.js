import { environment } from "../../../config";
import { getTasksMockResponse } from "./mocks";
import { getToken } from "../../auth/services/auth.service";


/**
 * This is an example of how you can implement an API calling using Javascript.
 * Below, if the user is authenticated, we return a list of tasks.
 * 
 * The function also allows for the specification of a query string. An example query string may be seen above.
 */


export const getTasks = async(projectId, queryString) => {

    const qs = queryString? queryString : "";
    const url = new URL(`${environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/projects/${projectId}/tasks?${qs}`);

    if(environment.useAuth){
        const response = await fetch(url.href, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data
    }
    else{
        return getTasksMockResponse;
    }
}

export const createTask = async(projectId, body) => {
    const url = `${environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/projects/${projectId}/tasks`;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
    });
  
    const jsonResponse = await response.json();
    return jsonResponse;

}