import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, Brain, Database, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
              Discover Exoplanets with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced machine learning system to predict exoplanet candidates from stellar and planetary parameters
            </p>
            <Link to="/predict">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg glow-border group">
                Start Prediction
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 glow-text">
            Powered by Advanced Technology
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card p-6 border-primary/30 card-glow hover:scale-105 transition-transform">
              <div className="mb-4">
                <Brain className="w-12 h-12 text-primary animate-pulse-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Machine Learning</h3>
              <p className="text-muted-foreground">
                Trained on thousands of confirmed exoplanets using state-of-the-art ML algorithms for accurate predictions
              </p>
            </Card>
            
            <Card className="bg-card p-6 border-primary/30 card-glow hover:scale-105 transition-transform">
              <div className="mb-4">
                <Database className="w-12 h-12 text-primary animate-pulse-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rich Datasets</h3>
              <p className="text-muted-foreground">
                Leverages data from KOI, TOI, and K2 catalogs containing extensive stellar and planetary characteristics
              </p>
            </Card>
            
            <Card className="bg-card p-6 border-primary/30 card-glow hover:scale-105 transition-transform">
              <div className="mb-4">
                <Rocket className="w-12 h-12 text-primary animate-pulse-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
              <p className="text-muted-foreground">
                Instant predictions with confidence scores to help identify promising exoplanet candidates
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 p-12 text-center border-primary/30 card-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Input your stellar parameters and let our AI predict if you've found an exoplanet candidate
            </p>
            <Link to="/predict">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg glow-border">
                Try It Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
