import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { blockchainAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Shield, Loader2, AlertTriangle, Skull } from "lucide-react";

export default function TamperBlock() {
  const [blockIndex, setBlockIndex] = useState("");
  const [newData, setNewData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const index = parseInt(blockIndex);
    
    if (isNaN(index) || index < 0) {
      toast({
        title: "Invalid block index",
        description: "Please enter a valid block number (0 or greater)",
        variant: "destructive",
      });
      return;
    }

    if (!newData.trim()) {
      toast({
        title: "Invalid data",
        description: "Please enter the new data to replace",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await blockchainAPI.tamperBlock(index, newData.trim());
      
      if (response.success) {
        toast({
          title: "Block tampered successfully! ⚠️",
          description: `Block #${index} has been modified. The blockchain is now invalid.`,
          variant: "destructive",
        });
        setBlockIndex("");
        setNewData("");
      } else {
        toast({
          title: "Failed to tamper block",
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

  const tamperExamples = [
    { index: "1", data: "Fake transaction: Alice pays Eve 1000 BTC" },
    { index: "2", data: "Modified: Charlie steals from Bob" },
    { index: "0", data: "Genesis block compromised" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-danger rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-danger bg-clip-text text-transparent">
            Tamper with Blockchain
          </h1>
          <p className="text-muted-foreground">
            Demonstrate blockchain security by modifying block data
          </p>
        </div>

        {/* Warning Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Warning:</strong> Tampering with a block will make the entire blockchain invalid. 
              This demonstrates how blockchain detects unauthorized changes to historical records.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Tamper Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="crypto-card border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-destructive">
                <Skull className="w-5 h-5" />
                <span>Tamper Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blockIndex" className="text-base font-medium">
                    Block Index
                  </Label>
                  <Input
                    id="blockIndex"
                    type="number"
                    placeholder="e.g., 1"
                    value={blockIndex}
                    onChange={(e) => setBlockIndex(e.target.value)}
                    className="h-12 text-base"
                    disabled={isSubmitting}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the index of the block you want to modify (0 = Genesis block)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newData" className="text-base font-medium">
                    New Transaction Data
                  </Label>
                  <Input
                    id="newData"
                    type="text"
                    placeholder="e.g., Fake transaction: Alice pays Eve 1000 BTC"
                    value={newData}
                    onChange={(e) => setNewData(e.target.value)}
                    className="h-12 text-base"
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the fake transaction data to replace the original
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !blockIndex.trim() || !newData.trim()}
                  variant="destructive"
                  className="w-full h-12 text-base bg-gradient-danger hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Tampering Block...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Tamper Block
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Example Tampers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="text-lg">Example Tampering Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tamperExamples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto p-4 text-left hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300"
                      onClick={() => {
                        setBlockIndex(example.index);
                        setNewData(example.data);
                      }}
                      disabled={isSubmitting}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">Block #{example.index}</div>
                          <div className="text-sm text-muted-foreground">{example.data}</div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Educational Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="crypto-card border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Security Demonstration</h3>
                  <p className="text-sm text-muted-foreground">
                    This feature demonstrates blockchain's immutability. When you tamper with a block, 
                    its hash changes, breaking the chain of trust. The verification process will detect 
                    this tampering and mark the entire blockchain as invalid. In a real blockchain 
                    network, such tampering would be rejected by the network consensus.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}