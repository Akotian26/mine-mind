import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blockchainAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Zap, ArrowRight } from "lucide-react";

export default function AddTransaction() {
  const [transaction, setTransaction] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transaction.trim()) {
      toast({
        title: "Invalid transaction",
        description: "Please enter a transaction description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await blockchainAPI.addTransaction(transaction.trim());
      
      if (response.success) {
        toast({
          title: "Transaction added successfully! 🎉",
          description: `Block is being mined: "${transaction}"`,
        });
        setTransaction("");
      } else {
        toast({
          title: "Failed to add transaction",
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

  const exampleTransactions = [
    "Alice pays Bob 5 BTC",
    "Charlie buys coffee for 0.001 ETH",
    "Dave transfers 100 USDC to Eve",
    "Smart contract deployment",
    "NFT minting transaction"
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
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Add New Transaction
          </h1>
          <p className="text-muted-foreground">
            Create a new transaction to be added to the blockchain
          </p>
        </div>

        {/* Transaction Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Transaction Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="transaction" className="text-base font-medium">
                    Transaction Description
                  </Label>
                  <Input
                    id="transaction"
                    type="text"
                    placeholder="e.g., Alice pays Bob 5 coins"
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                    className="h-12 text-base"
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-muted-foreground">
                    Describe what this transaction represents
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !transaction.trim()}
                  className="w-full crypto-button h-12 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mining Block...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Transaction
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Example Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="text-lg">Example Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exampleTransactions.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto p-4 text-left hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-300"
                      onClick={() => setTransaction(example)}
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{example}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="crypto-card border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">How it works</h3>
                  <p className="text-sm text-muted-foreground">
                    When you add a transaction, it gets included in a new block that will be mined 
                    according to the current difficulty setting. The mining process finds a valid 
                    nonce that makes the block hash start with the required number of zeros.
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