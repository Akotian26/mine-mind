import { Play, Plus, AlertTriangle, CheckCircle2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { BlockCard } from "@/components/BlockCard";
import { api, Block } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function SimulationSection() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState("");
  const [tamperIndex, setTamperIndex] = useState("");
  const [tamperData, setTamperData] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const { toast } = useToast();

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    setLoading(true);
    const result = await api.viewChain();
    if (result.success && result.data) {
      setBlocks(result.data);
    } else {
      toast({
        title: "Connection Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const addTransaction = async () => {
    if (!transaction.trim()) {
      toast({ title: "Error", description: "Please enter a transaction", variant: "destructive" });
      return;
    }
    setLoading(true);
    const result = await api.addTransaction(transaction);
    if (result.success) {
      toast({ title: "Success", description: "Block mined and added to chain!" });
      setTransaction("");
      await loadBlockchain();
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const tamperBlock = async () => {
    const index = parseInt(tamperIndex);
    if (isNaN(index) || !tamperData.trim()) {
      toast({ title: "Error", description: "Enter valid index and data", variant: "destructive" });
      return;
    }
    setLoading(true);
    const result = await api.tamperBlock(index, tamperData);
    if (result.success) {
      toast({ title: "Block Tampered", description: "Chain integrity compromised!", variant: "destructive" });
      setTamperIndex("");
      setTamperData("");
      await loadBlockchain();
      await verifyChain();
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const verifyChain = async () => {
    const result = await api.verifyChain();
    if (result.success && result.data !== undefined) {
      setIsValid(result.data);
      toast({
        title: result.data ? "Chain Valid ✓" : "Chain Invalid ✗",
        description: result.data ? "All blocks properly linked" : "Tampering detected!",
        variant: result.data ? "default" : "destructive",
      });
    }
  };

  const setDiff = async () => {
    const result = await api.setDifficulty(difficulty);
    if (result.success) {
      toast({ title: "Difficulty Updated", description: `Mining difficulty set to ${difficulty}` });
    }
  };

  return (
    <section id="simulation" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Play className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Interactive Simulation
          </h2>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Add Transaction */}
          <div className="crypto-card">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-primary">Add Transaction</h3>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="e.g., Alice pays Bob 5 coins"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTransaction()}
              />
              <Button onClick={addTransaction} disabled={loading} className="w-full bg-gradient-primary">
                Mine Block
              </Button>
            </div>
          </div>

          {/* Tamper Block */}
          <div className="crypto-card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Tamper Block</h3>
            </div>
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Block index"
                value={tamperIndex}
                onChange={(e) => setTamperIndex(e.target.value)}
              />
              <Input
                placeholder="Fake data"
                value={tamperData}
                onChange={(e) => setTamperData(e.target.value)}
              />
              <Button onClick={tamperBlock} disabled={loading} variant="destructive" className="w-full">
                Tamper
              </Button>
            </div>
          </div>

          {/* Verify & Settings */}
          <div className="crypto-card">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-primary">Controls</h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Mining Difficulty</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="6"
                    value={difficulty}
                    onChange={(e) => setDifficulty(parseInt(e.target.value) || 3)}
                  />
                  <Button onClick={setDiff} variant="outline" size="sm">Set</Button>
                </div>
              </div>
              <Button onClick={verifyChain} disabled={loading} variant="outline" className="w-full">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Verify Chain
              </Button>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`mb-8 p-4 rounded-lg border-2 ${isValid ? 'border-valid-green bg-valid-green/10' : 'border-invalid-red bg-invalid-red/10'}`}>
          <div className="flex items-center justify-center gap-3">
            {isValid ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-valid-green" />
                <span className="text-lg font-semibold" style={{ color: 'hsl(var(--valid-green))' }}>
                  Blockchain is Valid ✓
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-6 h-6 text-invalid-red" />
                <span className="text-lg font-semibold" style={{ color: 'hsl(var(--invalid-red))' }}>
                  Blockchain Tampered ✗
                </span>
              </>
            )}
          </div>
        </div>

        {/* Blockchain Visualization */}
        {loading && blocks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Loading blockchain...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block, idx) => (
              <BlockCard key={idx} block={block} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
