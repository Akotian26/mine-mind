import { ListOrdered } from "lucide-react";

export function ProcedureSection() {
  const steps = [
    {
      title: "Initialize the Genesis Block",
      description: "Create the first block in the chain with index 0, current timestamp, and a previous hash of '0'."
    },
    {
      title: "Input Transaction/Data for New Blocks",
      description: "Enter transaction data (e.g., 'Alice pays Bob 5 coins') that will be stored in the new block."
    },
    {
      title: "Generate Hash Using SHA-256",
      description: "Compute the cryptographic hash by combining the block's index, timestamp, data, previous hash, and nonce."
    },
    {
      title: "Mine the Block (Proof of Work)",
      description: "Find a nonce value that produces a hash starting with the required number of zeros (based on difficulty)."
    },
    {
      title: "Link Block Using Previous Hash",
      description: "Store the previous block's hash in the new block, creating the cryptographic chain link."
    },
    {
      title: "Verify Chain Integrity",
      description: "Validate the entire chain by checking each block's hash and ensuring proper linkage to detect any tampering."
    }
  ];

  return (
    <section id="procedure" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <ListOrdered className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Implementation Procedure
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="relative flex gap-6 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-primary items-center justify-center flex-shrink-0 shadow-glow">
                  <span className="text-white text-xl font-bold">{idx + 1}</span>
                </div>
                
                <div className="crypto-card flex-1">
                  <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3 hidden md:block">{step.title}</h3>
                  <p className="text-foreground/90 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
