
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Module Federation Remote App on different domain
        </h1>
        <p>React Version: {React.version}</p>
        <p className="text-xl text-gray-600">
          {isAuthenticated
            ? "You're signed in! Check out your profile."
            : "Sign in to get started with our amazing features."}
        </p>
        {!isAuthenticated && (
          <div className="mt-8">
            <Button size="lg" onClick={() => loginWithRedirect()}>
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;