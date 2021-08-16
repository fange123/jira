import Auth from "./Auth";
import UnAuth from "./un-auth";
import { useAuth } from "context/auth-context";
import { FullPageError } from "components/lib";
import { ErrorBoundary } from "./components/error-boundary";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallBack={FullPageError}>
        {user ? <Auth /> : <UnAuth />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
