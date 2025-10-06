import { BookOpen, Link2, Shield, Hash } from "lucide-react";

export function TheorySection() {
  const concepts = [
    {
      icon: Link2,
      title: "Hash Chain Structure",
      description: "A hash chain is a sequence of blocks where each block contains the cryptographic hash of the previous block, creating an immutable chain of data."
    },
    {
      icon: Shield,
      title: "Immutability & Tamper Detection",
      description: "Any modification to a block's data changes its hash, breaking the chain link. This makes tampering immediately detectable through chain verification."
    },
    {
      icon: Hash,
      title: "SHA-256 Hashing",
      description: "We use SHA-256, a cryptographic hash function that produces a unique 256-bit (64-character hex) fingerprint for any input data, ensuring data integrity."
    }
  ];

  return (
    <section id="theory" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Theoretical Background
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {concepts.map((concept, idx) => {
            const Icon = concept.icon;
            return (
              <div key={idx} className="crypto-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{concept.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{concept.description}</p>
              </div>
            );
          })}
        </div>

        <div className="crypto-card">
          <h3 className="text-xl font-semibold mb-4 text-primary">How Hash Chains Work</h3>
          <div className="space-y-4 text-foreground/90">
            <p>
              <strong className="text-accent">Block Structure:</strong> Each block contains an index, timestamp, data (transactions), 
              the previous block's hash, a nonce (for mining), and its own computed hash.
            </p>
            <p>
              <strong className="text-accent">Chain Linking:</strong> The hash of Block N becomes part of Block N+1's data, 
              creating a cryptographic chain. This means any change to Block N will invalidate all subsequent blocks.
            </p>
            <p>
              <strong className="text-accent">Mining (Proof of Work):</strong> Finding a nonce value that produces a hash 
              starting with a specific number of zeros (difficulty). This computational puzzle secures the blockchain.
            </p>
            <p>
              <strong className="text-accent">Verification:</strong> To verify the chain, we recompute each block's hash 
              and ensure it matches the stored hash, and that each block's previous hash matches the actual hash of the previous block.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
