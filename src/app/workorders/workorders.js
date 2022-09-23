import { useEffect } from "react";
import { useState } from "react";
import { apiDocs,  demoQueryString, demoQueryString2} from "../common/commonProperties";
import "../common/styles.css";

import { getWorkOrders, createWorkOrder } from "./services/services";
import { environment } from "../../config";

function WorkOrders() {

  const [workOrders, setworkOrders] = useState();
  const [newWorkOrder, setNewWorkorder] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await getWorkOrders(environment.projectId);
      setworkOrders(data);
    }
    fetchData();
  }, []);


  function handleQueryString(){
    //Re-fetch the data, using the provided query, set it to the state
    const fetchQueryData = async(queryString) => {
      const data = await getWorkOrders(environment.projectId, queryString);
      setworkOrders(data);
    }

    //Gets the query string from the form, if the user has submitted one.
    const addQueryString = (e) => {
        e.preventDefault();
        fetchQueryData(e.target.form[0].value)
    }
    
    //Returns the form.
    return(
      <form >
          <input type="text" name="qs" placeholder={`q=details.projectId: ${environment.projectId}`} />
          <input type="submit" value="Apply query" onClick={addQueryString}/>
      </form>
    )
  }

  function createWorkOrderForm(){

    //Handle the submission of the create wo form.
    const submitForm = async(e) => {
      e.preventDefault();
      //Construct the body for our new workorder!
      const body = {
        "workOrderDetails": {
          "name": e.target.form[0].value,
          "projectId": e.target.form[1].value,
          "notes" : e.target.form[2].value,
          "externalId": e.target.form[3].value,
          "sourceSystemId": e.target.form[4].value,
        }
      }
      //Create the new Work Order via an api call.
      let newWo = await createWorkOrder(environment.projectId, body)
      //We can store the response too! In this case we are only doing so to display it on screen.
      setNewWorkorder(newWo)

      //Refresh the wo table.
      const data = await getWorkOrders(environment.projectId);
      setworkOrders(data);

    }

    return(
      <form>
          <label><span>Work Order Name: </span><input type="text"  name="woName"/></label> 
          <label><span>Project Id: </span><input type="text" value={environment.projectId} disabled={true} name="projectId"/></label> 
          <label><span>Notes: </span><input type="text" name="notes"/> </label> 
          <label><span>External Id: </span><input type="text" name="externalId"/></label> 
          <label><span>System source Id: </span><input type="text" value={1} disabled={true} name="sysId"/></label> 
          <input type="submit" value="Submit" onClick={submitForm}/>
      </form>
    )
  }


  //Builds a basic HTML table from the data fetched from the API.
  function getWorkOrdersTable() {
    return (
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>status</th>
                <th>notes</th>
                <th>project</th>
                <th>work order id</th>
              </tr>
            </thead>
            {workOrders?.items?.map((wo) => {
              return (
                <tbody key={wo.workOrderId}>
                  <tr>
                    <td>{wo.details.name}</td>
                    <td>{wo.status}</td>
                    <td>{wo.details.notes}</td>
                    <td>{wo.details.projectId}</td>
                    <td>{wo.workOrderId}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
    );
  }
  
  /*
  *  Basic react return, display the api results in the table, and also the data object returned.
  */
  return (
    <div className="WorkOrders">
      <h2> Work Orders </h2>

      {environment.useAuth &&
        <div className="flex-container">
          <div className="left">
            <h3> Create Work Order </h3> 
            {createWorkOrderForm()}
          </div>
          <div className="example-code">
            <h3>Example usage:</h3>
            <code>
              {environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/projects/{environment.projectId}/workorders
            </code>              
            <p>Creates a Work Order for a project to which the authorized user has access. Implemented via workorders/services/services.js</p>
            <a href={apiDocs}>Click here to view the API docs.</a>
            <h3>Payload response:</h3>
            <pre className="fetchedData">
              {JSON.stringify(newWorkOrder, undefined, 2)}
            </pre>
          </div>
        </div>
      }
      
      {environment.useAuth && 
      <hr className="divider"></hr>}

      <div className="flex-container">
        <div className="left">
          <h3> Get Work Orders </h3> 
          {getWorkOrdersTable()}
          {environment.useAuth && handleQueryString()}
        </div>
        <div className="example-code">
          <h3>Example usage:</h3>
          <code>
            {environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/workorders?q=details.projectId:{environment.projectId}
          </code>
          <p>Return a list of WorkOrders for a project to which the authorized user has access. Implemented via workorders/services/services.js</p>
          <p>Must contain at least one details.projectId, e.g. q=details.projectId:VNw2rUazVzc</p>
          <p>Query strings may also be appended to the API request, to filter or sort the data. E.g. {demoQueryString} or {demoQueryString2}</p>
          <a href={apiDocs}>Click here to view the API docs.</a>
          <h3>Payload response:</h3>
          <pre className="fetchedData">
              {JSON.stringify(workOrders, undefined, 2)}
          </pre>
        </div>
      </div>

    </div>
  );
}

export default WorkOrders;
