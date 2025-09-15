import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { blockchainAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Loader2, Zap, Info, Gauge } from "lucide-react";

export default function Settings() {
  const [difficulty, setDifficulty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load current difficulty from localStorage if available
    const saved = localStorage.getItem('blockchain-difficulty');
    if (saved) {
      const parsedDifficulty = parseInt(saved);
      setCurrentDifficulty(parsedDifficulty);
      setDifficulty(saved);
    } else {
      setDifficulty("3"); // Default difficulty
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const difficultyValue = parseInt(difficulty);
    
    if (isNaN(difficultyValue) || difficultyValue < 1 || difficultyValue > 6) {
      toast({
        title: "Invalid difficulty",
        description: "Please enter a difficulty between 1 and 6",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await blockchainAPI.setDifficulty(difficultyValue);
      
      if (response.success) {
        setCurrentDifficulty(difficultyValue);
        localStorage.setItem('blockchain-difficulty', difficultyValue.toString());
        
        toast({
          title: "Difficulty updated successfully! ⚡",
          description: `Mining difficulty is now set to ${difficultyValue}`,
        });
      } else {
        toast({
          title: "Failed to update difficulty",
          description: response.message || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to blockchain network",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const difficultyLevels = [
    { level: 1, desc: "Very Easy (1 zero)", time: "~seconds", color: "text-green-500" },
    { level: 2, desc: "Easy (2 zeros)", time: "~seconds", color: "text-green-400" },
    { level: 3, desc: "Medium (3 zeros)", time: "~1-10 seconds", color: "text-yellow-500" },
    { level: 4, desc: "Hard (4 zeros)", time: "~10-60 seconds", color: "text-orange-500" },
    { level: 5, desc: "Very Hard (5 zeros)", time: "~1-10 minutes", color: "text-red-500" },
    { level: 6, desc: "Extreme (6 zeros)", time: "~10+ minutes", color: "text-red-600" },
  ];

  const getDifficultyInfo = (level: number) => {
    const info = difficultyLevels.find(d => d.level === level);
    return info || difficultyLevels[2]; // Default to medium
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Blockchain Settings
          </h1>
          <p className="text-muted-foreground">
            Configure mining difficulty and network parameters
          </p>
        </div>

        {/* Current Status */}
        {currentDifficulty !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="crypto-card border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Gauge className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Current Mining Difficulty</h3>
                      <p className="text-sm text-muted-foreground">
                        {getDifficultyInfo(currentDifficulty).desc}
                      </p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getDifficultyInfo(currentDifficulty).color}`}>
                    {currentDifficulty}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Difficulty Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Mining Difficulty</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-base font-medium">
                    Difficulty Level (1-6)
                  </Label>
                  <Input
                    id="difficulty"
                    type="number"
                    placeholder="e.g., 3"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="h-12 text-base"
                    disabled={isSubmitting}
                    min="1"
                    max="6"
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher difficulty requires more computational work to mine blocks
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !difficulty.trim()}
                  className="w-full crypto-button h-12 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Updating Difficulty...
                    </>
                  ) : (
                    <>
                      <SettingsIcon className="w-5 h-5 mr-2" />
                      Set Mining Difficulty
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Difficulty Levels Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="text-lg">Difficulty Levels Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {difficultyLevels.map((level, index) => (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                      parseInt(difficulty) === level.level
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setDifficulty(level.level.toString())}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          parseInt(difficulty) === level.level ? "bg-primary" : "bg-muted"
                        }`}>
                          <span className={`text-sm font-bold ${
                            parseInt(difficulty) === level.level ? "text-white" : "text-foreground"
                          }`}>
                            {level.level}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{level.desc}</div>
                          <div className="text-sm text-muted-foreground">
                            Mining time: {level.time}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${level.color}`}>
                        {"0".repeat(level.level)}***
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Mining Difficulty:</strong> Determines how many leading zeros are required 
              in the block hash. Higher difficulty means more computational work is needed to mine 
              a block, which increases security but also increases mining time and energy consumption.
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    </div>
  );
}