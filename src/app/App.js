import WorkOrders from "./workorders/workorders";
import Tasks from "./tasks/tasks";
import { environment } from "../config";

import AuthProvider from "./auth/auth-provider/auth-provider.tsx"
import LoginRedirect from "./auth/login-redirect/login-redirect.tsx";
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import LoginCallback from "./auth/login-callback/login-callback";
import RequireAuth from "./auth/require-auth/require-auth";

function App() {

  function home(){
    return(
      <>
        <WorkOrders/>
        <hr></hr> 
        <Tasks/>
      </>
    )
  }

  return (
    <>
      <div className="App">

        {environment.useAuth &&
        <>  
          <div className="loginbanner">
            User authenticated. Loading details for project id {environment.projectId}
          </div>
          <AuthProvider>
            <BrowserRouter basename="" >
                <Routes>
                    <Route path="login/redirect" element={<LoginRedirect />} />
                    <Route path="login/callback" element={<LoginCallback />} />
                    <Route path="*" element={
                      <RequireAuth>
                        {home()}
                      </RequireAuth>} 
                    />
                </Routes>
            </BrowserRouter>
          </AuthProvider>
        </> 
        }
        {!environment.useAuth &&  
        <>
          <div className="loginbanner">
            You are not authenticated. Mocked API responses will be shown below. Please note, these are static implementations and may no longer be accurate.
          </div> 
          {home()}
        </>
          
        }
      </div>

    </>
  );
}

export default App;
