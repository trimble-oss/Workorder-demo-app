import { useState } from "react";
import { useEffect } from "react";
import { environment } from "../../config";
import { apiDocs , demoQueryString, demoQueryString2} from "../common/commonProperties";
import "../common/styles.css";



import { getTasks, createTask } from "./services/services";

function Tasks() {

  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState();

  useEffect(() => {
      async function fetchData(){
          const data = await getTasks(environment.projectId)
          setTasks(data)
      }
      fetchData();
  },[])

  //In this demo we only display the query string textbox if the user is authenticated, as we can't query mocked data.
  function handleQueryString(){  
      //Re-fetch the data, using the provided query, set it to the state
      const fetchQueryData = async(queryString) => {
        const data = await getTasks(environment.projectId, queryString);
        setTasks(data);
      }

      //Gets the query string from the form, if the user has submitted one.
      const addQueryString = (e) => {
          e.preventDefault();
          fetchQueryData(e.target.form[0].value)
      }
      
      //Returns the form itself.
      return(
        <form >
            <input type="text" name="qs" placeholder={`q=projectId: ${environment.projectId}`} />
            <input type="submit" value="Apply query" onClick={addQueryString}/>
        </form>
      )
  }

  function createTaskForm(){
        //Handle the submission of the create wo form.
        const submitForm = async(e) => {
          e.preventDefault();
          //Construct the body for our new workorder!
          const body = {
            "taskDetails" : {
              "name" : e.target.form[0].value,
              "taskTypeName" : e.target.form[1].value,
              "workOrderId" : e.target.form[2].value,
              "projectId" : e.target.form[3].value,
            }
          }
          //Create the new Work Order via an api call.
          let newTask = await createTask(environment.projectId, body)
          //We can store the response too! In this case we are only doing so to display it on screen.
          setNewTask(newTask)
    
          //Refresh the wo table.
          const data = await getTasks(environment.projectId);
          setTasks(data);
    
        }
    
        //Return the form
        return(
          <form>
              <label><span>Task Name: </span><input type="text"  name="taskName"/></label> 
              <label><span>Task Type Name: </span><input type="text" disabled={true} value="BASIC_COMPACTION" name="taskType"/> </label> 
              <label><span>Work Order Id: </span><input type="text" name="woid"/> </label> 
              <label><span>Project Id: </span><input type="text" disabled={true} value={environment.projectId} name="projid"/> </label> 

              <input type="submit" value="Submit" onClick={submitForm}/>
          </form>
        )
  }

  //Renders a basic HTML table, if there is data (tasks) in the state. 
  function getTasksTable(){
    return(
      <>
        <p>
            Return a list of Tasks for a project to which the authorized user has access. Implemented via tasks/services/services.js
        </p>
        <table>
          <thead>
              <tr>
                  <th>name</th>
                  <th>status</th>
                  <th>resource name</th>
                  <th>work order name</th>
                  <th>task type name</th>
              </tr>
          </thead>
          {tasks?.items?.map((task) =>{
            return (
              <tbody key={task.taskId}>
                <tr>
                  <td> {task.details.name} </td>
                  <td> {task.status} </td>
                  <td> {task.details.assetName} </td>
                  <td> {task.details.workOrderName} </td>
                  <td> {task.details.taskTypeName} </td>
                </tr>
              </tbody>
            )
          })}
      </table>
      </>
    )
  }

  /*
  *  Basic react return, display the api results in the table, and also the data object returned.
  */
  return (
    <div className="Tasks">
      <h2> Tasks </h2>

      {environment.useAuth &&
        <div className="flex-container">
          <div className="left">
            <h3> Create Task </h3> 
            {createTaskForm()}
          </div>
          <div className="example-code">
            <h3>Example usage:</h3>
            <code>
              {environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/projects/{environment.projectId}/tasks
            </code>              
            <p>Creates a Task for a project to which the authorized user has access. Implemented via tasks/services/services.js</p>
            <p>Note: Additional properties such as boundaries, task parameters, and activities may also be added when creating a task (These have been omitted for simplicity's sake). For more info, refer to the API docs.</p>
            <a href={apiDocs}>Click here to view the API docs.</a>
            <h3>Payload response:</h3>
            <pre className="fetchedData">
              {JSON.stringify(newTask, undefined, 2)}
            </pre>
          </div>
        </div>
      }

      {environment.useAuth && 
      <hr className="divider"></hr>}

      <div className="flex-container">
        <div className="left">
          <h3> Get Tasks </h3> 
          {getTasksTable()}
          {environment.useAuth && handleQueryString()}
        </div>
        <div className="example-code">
          <h3>Example usage:</h3>
          <code>
            {environment.trimbleCloudApiUrl}/construction/field-factory/workorders/v1/projects/${environment.projectId}/tasks?{demoQueryString}
          </code>
          <p>Return a list of Tasks for a project to which the authorized user has access. Implemented via tasks/services/services.js</p>
          <p>Must contain at least one projectId, e.g. q=projectId:VNw2rUazVzc</p>
          <p>Query strings may also be appended to the API request, to filter or sort the data. E.g. {demoQueryString} or {demoQueryString2}</p>
          <a href={apiDocs}>Click here to view the API docs.</a>
          <h3>Payload response:</h3>
          <pre className="fetchedData">
              {JSON.stringify(tasks, undefined, 2)}
          </pre>
        </div>
      </div>


    </div>
    );
  }
  
  export default Tasks;