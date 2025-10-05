import { Card } from "@/components/ui/card";
import { Database, Telescope, Cpu, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            About the System
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding our exoplanet prediction technology
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-card p-8 border-primary/30 card-glow">
            <div className="flex items-start gap-4 mb-4">
              <Telescope className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Project AVLK - 750 leverages machine learning to classify celestial objects as 
                  exoplanet candidates or false positives based on observational data from space telescopes. 
                  Our goal is to accelerate the discovery process by providing rapid, accurate predictions 
                  that help astronomers focus their efforts on the most promising candidates.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card p-8 border-primary/30 card-glow">
            <div className="flex items-start gap-4 mb-4">
              <Database className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-3">Dataset Sources</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our model is trained on comprehensive datasets from multiple space telescope missions:
                </p>
                <div className="space-y-3">
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-1">KOI (Kepler Objects of Interest)</h3>
                    <p className="text-sm text-muted-foreground">
                      Data from NASA's Kepler mission, containing thousands of potential exoplanet detections 
                      with detailed stellar and planetary parameters.
                    </p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-1">TOI (TESS Objects of Interest)</h3>
                    <p className="text-sm text-muted-foreground">
                      Observations from the Transiting Exoplanet Survey Satellite (TESS), providing 
                      all-sky coverage and discovering new exoplanet candidates.
                    </p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-1">K2 Mission Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Extended Kepler mission observations covering diverse stellar fields and 
                      contributing additional confirmed exoplanets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-card p-8 border-primary/30 card-glow">
            <div className="flex items-start gap-4 mb-4">
              <Cpu className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-3">Machine Learning Model</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our system employs advanced machine learning algorithms trained on verified exoplanet data. 
                  The model analyzes multiple parameters:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Orbital period and transit characteristics
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Planet and stellar radii measurements
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Stellar temperature and flux values
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Signal quality and noise characteristics
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center border-primary/30 card-glow">
            <h2 className="text-2xl font-bold mb-3 glow-text">Accuracy & Performance</h2>
            <p className="text-muted-foreground mb-4">
              Our model achieves high accuracy rates in distinguishing genuine exoplanet candidates 
              from false positives, with continuous improvements as new data becomes available.
            </p>
            <div className="flex justify-center gap-8 mt-6">
              <div>
                <div className="text-3xl font-bold text-primary glow-text">92%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary glow-text">&lt;1s</div>
                <div className="text-sm text-muted-foreground">Prediction Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary glow-text">10k+</div>
                <div className="text-sm text-muted-foreground">Training Samples</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
