import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  prediction: string;
  confidence: number;
  details?: any;
}

interface PredictionFormProps {
  onResult: (result: PredictionResult) => void;
}

const API_URL = "http://localhost:8000";

const PredictionForm = ({ onResult }: PredictionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orbital_period: "",
    planet_radius: "",
    stellar_temperature: "",
    stellar_radius: "",
    flux: "",
    signal_to_noise: "",
    transit_duration: "",
    transit_depth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orbital_period: parseFloat(formData.orbital_period),
          planet_radius: parseFloat(formData.planet_radius),
          stellar_temperature: parseFloat(formData.stellar_temperature),
          stellar_radius: parseFloat(formData.stellar_radius),
          flux: parseFloat(formData.flux),
          signal_to_noise: parseFloat(formData.signal_to_noise),
          transit_duration: parseFloat(formData.transit_duration),
          transit_depth: parseFloat(formData.transit_depth),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      onResult(result);
      toast.success("Prediction complete!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to get prediction. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card p-8 border-primary/30 card-glow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orbital_period" className="text-foreground">
              Orbital Period (days)
            </Label>
            <Input
              id="orbital_period"
              name="orbital_period"
              type="number"
              step="any"
              value={formData.orbital_period}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 3.52"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="planet_radius" className="text-foreground">
              Planet Radius (Earth radii)
            </Label>
            <Input
              id="planet_radius"
              name="planet_radius"
              type="number"
              step="any"
              value={formData.planet_radius}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 2.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stellar_temperature" className="text-foreground">
              Stellar Temperature (K)
            </Label>
            <Input
              id="stellar_temperature"
              name="stellar_temperature"
              type="number"
              step="any"
              value={formData.stellar_temperature}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 5778"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stellar_radius" className="text-foreground">
              Stellar Radius (Solar radii)
            </Label>
            <Input
              id="stellar_radius"
              name="stellar_radius"
              type="number"
              step="any"
              value={formData.stellar_radius}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 1.0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="flux" className="text-foreground">
              Stellar Flux (Earth flux)
            </Label>
            <Input
              id="flux"
              name="flux"
              type="number"
              step="any"
              value={formData.flux}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 1.2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signal_to_noise" className="text-foreground">
              Signal-to-Noise Ratio
            </Label>
            <Input
              id="signal_to_noise"
              name="signal_to_noise"
              type="number"
              step="any"
              value={formData.signal_to_noise}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 15.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transit_duration" className="text-foreground">
              Transit Duration (hours)
            </Label>
            <Input
              id="transit_duration"
              name="transit_duration"
              type="number"
              step="any"
              value={formData.transit_duration}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 3.2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transit_depth" className="text-foreground">
              Transit Depth (ppm)
            </Label>
            <Input
              id="transit_depth"
              name="transit_depth"
              type="number"
              step="any"
              value={formData.transit_depth}
              onChange={handleChange}
              required
              className="bg-secondary border-primary/30"
              placeholder="e.g., 500"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg glow-border"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Predict Exoplanet"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default PredictionForm;
