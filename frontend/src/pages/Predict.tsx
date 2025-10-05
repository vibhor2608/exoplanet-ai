import { useState } from "react";
import PredictionForm from "@/components/PredictionForm";
import ResultCard from "@/components/ResultCard";
import { Orbit } from "lucide-react";

interface PredictionResult {
  prediction: string;
  confidence: number;
  details?: any;
}

const Predict = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-4">
            <Orbit className="w-16 h-16 text-primary animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Exoplanet Prediction
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter stellar and planetary parameters below to determine if your system contains an exoplanet candidate
          </p>
        </div>

        <div className="space-y-8">
          <PredictionForm onResult={setResult} />
          
          {result && (
            <ResultCard
              prediction={result.prediction}
              confidence={result.confidence}
              details={result.details}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
