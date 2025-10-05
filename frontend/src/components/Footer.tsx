import { Telescope, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-primary/20 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Telescope className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">
              Project AVLK-750 © 2025
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@exoplanet.ai"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
