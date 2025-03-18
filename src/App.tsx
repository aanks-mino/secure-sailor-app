
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { federationEvents } from "./utils/federationEvents";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Example of subscribing to an event from the host
    const unsubscribe = federationEvents.subscribe("hostEvent", (data) => {
      console.log("Received event from host:", data);
    });

    // Example of sending an event to the host
    setTimeout(() => {
      federationEvents.emit("remoteEvent", { message: "Hello from remote app!" });
    }, 2000);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Auth0Provider
      domain="tetrifox.eu.auth0.com"
      clientId="JdOGTLfu3iQSU0m9LdT6BeWCfWp54ZUL"
      authorizationParams={{
        redirect_uri:  window.location.origin + '/wonderkind-flux-think'
      }}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
