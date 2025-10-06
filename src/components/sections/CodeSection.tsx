import { Code2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CodeSection() {
  const [copied, setCopied] = useState(false);

  const pythonCode = `import hashlib
import time
from flask import Flask, jsonify, request
from flask_cors import CORS

class Block:
    """Represents a single block in the blockchain"""
    def __init__(self, index, timestamp, data, prev_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data   # list of transactions
        self.prev_hash = prev_hash
        self.nonce = 0
        self.hash = self.compute_hash()

    def compute_hash(self):
        """Compute SHA-256 hash of block contents"""
        block_string = f"{self.index}{self.timestamp}{self.data}{self.prev_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, difficulty):
        """Find nonce that produces hash with required leading zeros"""
        target = "0" * difficulty
        while not self.hash.startswith(target):
            self.nonce += 1
            self.hash = self.compute_hash()

    def to_dict(self):
        """Convert block to dictionary for JSON serialization"""
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "prev_hash": self.prev_hash,
            "hash": self.hash,
            "nonce": self.nonce
        }


class Blockchain:
    """Manages the chain of blocks"""
    def __init__(self, difficulty=3):
        self.chain = [self.create_genesis_block()]
        self.difficulty = difficulty

    def create_genesis_block(self):
        """Create the first block in the chain"""
        return Block(0, time.time(), ["Genesis Block"], "0")

    def get_latest_block(self):
        """Return the most recent block"""
        return self.chain[-1]

    def add_block(self, new_block):
        """Add a new block after mining it"""
        new_block.prev_hash = self.get_latest_block().hash
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)

    def is_chain_valid(self):
        """Verify integrity of entire blockchain"""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            prev = self.chain[i-1]
            # Check if hash is valid
            if current.hash != current.compute_hash():
                return False
            # Check if blocks are properly linked
            if current.prev_hash != prev.hash:
                return False
        return True

    def tamper_block(self, index, new_data):
        """Modify a block's data (for demonstration)"""
        if index < len(self.chain):
            self.chain[index].data = new_data
            self.chain[index].hash = self.chain[index].compute_hash()

    def set_difficulty(self, new_difficulty):
        """Update mining difficulty"""
        self.difficulty = new_difficulty


# Flask API
app = Flask(__name__)
CORS(app)
blockchain = Blockchain()

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    data = request.get_json()
    transaction = data.get('transaction', '')
    new_block = Block(len(blockchain.chain), time.time(), [transaction], blockchain.get_latest_block().hash)
    blockchain.add_block(new_block)
    return jsonify({"message": "Block added", "block": new_block.to_dict()})

@app.route('/view_chain', methods=['GET'])
def view_chain():
    return jsonify([block.to_dict() for block in blockchain.chain])

@app.route('/verify_chain', methods=['GET'])
def verify_chain():
    return jsonify({"valid": blockchain.is_chain_valid()})

if __name__ == '__main__':
    app.run(debug=True, port=8000)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Implementation Code
            </h2>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Code
              </>
            )}
          </Button>
        </div>

        <div className="crypto-card">
          <div className="bg-[#0d1117] rounded-lg p-6 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
                <div className="w-3 h-3 rounded-full bg-valid-green"></div>
              </div>
              <span className="text-sm text-muted-foreground ml-2">crypto.py</span>
            </div>
            <pre className="text-sm">
              <code className="language-python text-foreground/90 leading-relaxed">
                {pythonCode}
              </code>
            </pre>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <h3 className="font-semibold text-primary mb-3">Key Functions Explained:</h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li><span className="text-accent font-mono">compute_hash()</span> - Generates SHA-256 hash from block data</li>
              <li><span className="text-accent font-mono">mine_block()</span> - Implements proof-of-work by finding valid nonce</li>
              <li><span className="text-accent font-mono">add_block()</span> - Links new block to chain and mines it</li>
              <li><span className="text-accent font-mono">is_chain_valid()</span> - Verifies integrity by checking all hashes and links</li>
              <li><span className="text-accent font-mono">tamper_block()</span> - Demonstrates what happens when data is modified</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
