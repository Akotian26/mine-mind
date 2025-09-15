import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BlockCard } from "@/components/BlockCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blockchainAPI, Block } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, TrendingUp, Blocks, Clock } from "lucide-react";

export default function Dashboard() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchBlockchain = async () => {
    setRefreshing(true);
    const response = await blockchainAPI.getBlockchain();
    
    if (response.success && response.data) {
      setBlocks(response.data);
    } else {
      toast({
        title: "Error fetching blockchain",
        description: response.message || "Failed to load blockchain data",
        variant: "destructive",
      });
    }
    setRefreshing(false);
    setLoading(false);
  };

  const verifyBlockchain = async () => {
    const response = await blockchainAPI.verifyChain();
    
    if (response.success && response.data) {
      setIsValid(response.data.valid);
    }
  };

  useEffect(() => {
    fetchBlockchain();
    verifyBlockchain();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchBlockchain();
      verifyBlockchain();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalBlocks: blocks.length,
    totalTransactions: blocks.reduce((acc, block) => acc + block.data.length, 0),
    latestBlock: blocks[blocks.length - 1],
    avgNonce: blocks.length > 0 
      ? Math.round(blocks.reduce((acc, block) => acc + block.nonce, 0) / blocks.length)
      : 0
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Blockchain Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your blockchain network in real-time
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className={isValid ? "status-valid" : "status-invalid"}>
            {isValid ? "✅ Chain Valid" : "❌ Chain Compromised"}
          </Badge>
          
          <Button 
            onClick={fetchBlockchain}
            disabled={refreshing}
            className="crypto-button"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
            <Blocks className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlocks}</div>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Block</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{stats.latestBlock?.index || 0}</div>
          </CardContent>
        </Card>

        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Nonce</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgNonce.toLocaleString()}</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Blocks Grid */}
      <div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-6"
        >
          Blockchain Blocks
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block, index) => (
            <BlockCard 
              key={block.index} 
              block={block} 
              index={index}
              isValid={isValid}
            />
          ))}
        </div>
        
        {blocks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Blocks className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No blocks found</h3>
            <p className="text-muted-foreground">
              Start by adding your first transaction to create a block.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}