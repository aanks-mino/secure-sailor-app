
import { Link, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const Layout = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
              YourApp
            </Link>
            <div className="flex items-center gap-4">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              ) : isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile">
                    <Avatar>
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button onClick={() => loginWithRedirect()}>Sign In</Button>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
