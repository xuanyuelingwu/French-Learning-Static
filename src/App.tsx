import { Toaster } from "@/components/ui/sonner";

import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";
import Verbs from "./pages/Verbs";
import Texts from "./pages/Texts";

import PartOfSpeech from "./pages/PartOfSpeech";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/vocabulary"} component={Vocabulary} />
      <Route path={"/part-of-speech"} component={PartOfSpeech} />
      <Route path={"/grammar"} component={Grammar} />
      <Route path={"/verbs"} component={Verbs} />
      <Route path={"/texts"} component={Texts} />

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
          <Toaster />
          <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
