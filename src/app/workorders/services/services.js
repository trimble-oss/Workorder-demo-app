
import { environment } from "../../../config";
import { getWorkOrdersMockResponse } from "./mocks";
import { getToken } from "../../auth/services/auth.service";


/**
 * This is an example of how you can implement an API calling using Javascript.
 * Below, if the user is authenticated, we return a list of workorders.
 * 
 * The function also allows for the specification of a query string. An example query string may be seen above.
 */

export const getWorkOrders = async(projectId, queryString) => {

    const qs = queryString ? queryString : `q=details.projectId:${projectId}`;

    const url = new URL(`${environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/workorders?${qs}`);

    //Returns mocked data in the event that the user is not authenticated. In a real usage scenario this would be ommitted.
    if(!environment.useAuth){
        return getWorkOrdersMockResponse;
    }

    const response = await fetch(url.href, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const data = await response.json();
    return data

}


export const createWorkOrder = async(projectId, body) => {
    const url = new URL(`${environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/workorders`)

    
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