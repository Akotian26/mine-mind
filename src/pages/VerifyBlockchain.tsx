import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { blockchainAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2, Shield, AlertCircle } from "lucide-react";

export default function VerifyBlockchain() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [lastVerified, setLastVerified] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleVerify = async () => {
    setIsVerifying(true);
    
    try {
      const response = await blockchainAPI.verifyChain();
      
      if (response.success && response.data) {
        setVerificationResult(response.data.valid);
        setLastVerified(new Date());
        
        toast({
          title: response.data.valid ? "Blockchain is valid! ✅" : "Blockchain is compromised! ❌",
          description: response.data.valid 
            ? "All blocks are properly linked and untampered"
            : "One or more blocks have been tampered with",
          variant: response.data.valid ? "default" : "destructive",
        });
      } else {
        toast({
          title: "Verification failed",
          description: response.message || "Unable to verify blockchain integrity",
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
      setIsVerifying(false);
    }
  };

  const getStatusIcon = () => {
    if (verificationResult === null) return Shield;
    return verificationResult ? CheckCircle : XCircle;
  };

  const getStatusColor = () => {
    if (verificationResult === null) return "text-muted-foreground";
    return verificationResult ? "text-crypto-valid" : "text-crypto-invalid";
  };

  const getStatusText = () => {
    if (verificationResult === null) return "Ready to verify";
    return verificationResult ? "Blockchain Valid" : "Blockchain Compromised";
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
            verificationResult === null 
              ? "bg-gradient-primary animate-float" 
              : verificationResult 
                ? "bg-gradient-success animate-pulse-glow" 
                : "bg-gradient-danger animate-pulse"
          }`}>
            <StatusIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Verify Blockchain
          </h1>
          <p className="text-muted-foreground">
            Check the integrity and validity of the entire blockchain
          </p>
        </div>

        {/* Verification Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="crypto-card relative overflow-hidden">
            {verificationResult !== null && (
              <div className={`absolute inset-0 opacity-10 ${
                verificationResult ? "bg-gradient-success" : "bg-gradient-danger"
              }`} />
            )}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`w-6 h-6 ${getStatusColor()}`} />
                  <span>Blockchain Status</span>
                </div>
                {lastVerified && (
                  <span className="text-sm text-muted-foreground font-normal">
                    Last verified: {lastVerified.toLocaleTimeString()}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className={`text-4xl font-bold ${getStatusColor()}`}>
                  {getStatusText()}
                </div>
                
                <Button 
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="crypto-button h-12 px-8"
                  size="lg"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying Blockchain...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Verify Blockchain Integrity
                    </>
                  )}
                </Button>
              </div>

              {verificationResult !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Alert className={verificationResult ? "border-crypto-valid/50 bg-crypto-valid/10" : "border-crypto-invalid/50 bg-crypto-invalid/10"}>
                    {verificationResult ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      {verificationResult ? (
                        <span>
                          <strong>Verification Successful:</strong> All blocks are properly linked, 
                          hashes are valid, and no tampering has been detected. The blockchain 
                          maintains its integrity.
                        </span>
                      ) : (
                        <span>
                          <strong>Tampering Detected:</strong> One or more blocks have been modified 
                          after creation. The blockchain has been compromised and should not be trusted.
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Verification Process Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="text-lg">How Verification Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Hash Validation</h4>
                    <p className="text-sm text-muted-foreground">
                      Each block's hash is recalculated and compared with the stored hash
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Chain Linkage</h4>
                    <p className="text-sm text-muted-foreground">
                      Verifies that each block's previous hash matches the previous block's hash
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Integrity Check</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensures no data has been modified since the block was created and mined
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="crypto-card border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Cryptographic Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Blockchain verification relies on cryptographic hashing (SHA-256) to detect any 
                    unauthorized changes. Even a single character modification in any block will 
                    cause the entire verification to fail, demonstrating the tamper-evident nature 
                    of blockchain technology.
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