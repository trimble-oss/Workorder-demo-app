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

    const qs = queryString? queryString : `q=projectId:${projectId}`;
    const url = new URL(`${environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/tasks?${qs}`);

    //Returns mocked data in the event that the user is not authenticated. In a real usage scenario this would be ommitted.
    if(!environment.useAuth){
        return getTasksMockResponse;
    }
    
    const response = await fetch(url.href, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const data = await response.json();
    return data

}

export const createTask = async(projectId, body) => {
    const url = `${environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/tasks`;

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