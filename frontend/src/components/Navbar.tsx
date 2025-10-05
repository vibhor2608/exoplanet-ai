import { Link, useLocation } from "react-router-dom";
import { Telescope, Home, Orbit, Info } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Telescope className="w-8 h-8 text-primary animate-pulse-glow" />
            <span className="text-xl font-bold glow-text">PROJECT AVLK - 750</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-primary/20 text-primary glow-border"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/predict"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/predict")
                  ? "bg-primary/20 text-primary glow-border"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span className="hidden sm:inline">Predict</span>
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/about")
                  ? "bg-primary/20 text-primary glow-border"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
