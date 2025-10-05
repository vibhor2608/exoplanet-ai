import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Sparkles } from "lucide-react";

interface ResultCardProps {
  prediction: string;
  confidence: number;
  details?: any;
}

const ResultCard = ({ prediction, confidence }: ResultCardProps) => {
  const isExoplanet = prediction.toLowerCase().includes("candidate") || 
                      prediction.toLowerCase().includes("exoplanet");
  
  return (
    <Card className="bg-card p-8 border-primary/30 card-glow animate-slide-up">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          {isExoplanet ? (
            <CheckCircle className="w-20 h-20 text-primary animate-pulse-glow" />
          ) : (
            <XCircle className="w-20 h-20 text-destructive" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold mb-4 glow-text">
          {prediction}
        </h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Confidence Score</span>
          </div>
          <div className="text-5xl font-bold text-primary glow-text">
            {(confidence * 100).toFixed(1)}%
          </div>
        </div>
        
        <div className="space-y-3">
          <Badge 
            variant={isExoplanet ? "default" : "destructive"}
            className="text-lg px-6 py-2"
          >
            {isExoplanet ? "Likely Exoplanet" : "False Positive"}
          </Badge>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            {isExoplanet
              ? "The system parameters suggest this is a promising exoplanet candidate worthy of further investigation."
              : "The system parameters indicate this is likely a false positive rather than a genuine exoplanet."}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;
