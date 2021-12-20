import { useAuth } from "context/auth-context";
import { FullPageError, FullPageLoading } from "components/lib";
import { ErrorBoundary } from "./components/error-boundary";
import React from "react";

function App() {
  const { user } = useAuth();
  //TODO:代码分割优化，lazy里面是promise函数,配合Suspense
  const AuthApp = React.lazy(() => import("Auth"));
  const UnAuthApp = React.lazy(() => import("un-auth"));

  return (
    <div className="App">
      <ErrorBoundary fallBack={FullPageError}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthApp /> : <UnAuthApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
