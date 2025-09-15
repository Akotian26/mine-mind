import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Block } from "@/lib/api";
import { Clock, Hash, Link2, Zap } from "lucide-react";

interface BlockCardProps {
  block: Block;
  index: number;
  isValid?: boolean;
}

export function BlockCard({ block, index, isValid = true }: BlockCardProps) {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const truncateHash = (hash: string, length: number = 12) => {
    return `${hash.slice(0, length)}...${hash.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="crypto-card group relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {block.index}
                </span>
              </div>
              <span className="text-lg">Block #{block.index}</span>
            </CardTitle>
            
            <Badge 
              className={isValid ? "status-valid" : "status-invalid"}
            >
              {isValid ? "✅ Valid" : "❌ Invalid"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Timestamp */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatTimestamp(block.timestamp)}</span>
          </div>

          {/* Transactions */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-medium">Transactions:</span>
            </div>
            <div className="pl-6 space-y-1">
              {block.data.map((transaction, i) => (
                <div 
                  key={i} 
                  className="text-sm bg-muted/30 rounded-md p-2 border border-border/50"
                >
                  {transaction}
                </div>
              ))}
            </div>
          </div>

          {/* Previous Hash */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Link2 className="w-4 h-4 text-secondary" />
              <span className="font-medium">Previous Hash:</span>
            </div>
            <div className="block-hash pl-6">
              {truncateHash(block.prev_hash)}
            </div>
          </div>

          {/* Current Hash */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-accent" />
              <span className="font-medium">Hash:</span>
            </div>
            <div className="block-hash pl-6">
              {truncateHash(block.hash)}
            </div>
          </div>

          {/* Nonce */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-sm font-medium">Nonce:</span>
            <Badge variant="outline" className="font-mono">
              {block.nonce.toLocaleString()}
            </Badge>
          </div>
        </CardContent>

        {/* Hover effect indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Card>
    </motion.div>
  );
}