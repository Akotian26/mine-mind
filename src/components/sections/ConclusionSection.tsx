import { GraduationCap } from "lucide-react";

export function ConclusionSection() {
  return (
    <section id="conclusion" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="crypto-card">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Conclusion
            </h2>
          </div>

          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-lg">
              This demonstration has illustrated how <span className="text-primary font-semibold">blockchain-style hash chains</span> fundamentally 
              improve data security, transparency, and immutability through cryptographic linking of data blocks.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary">Key Takeaways</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span><strong className="text-accent">Cryptographic Hashing</strong> creates unique fingerprints that link blocks together, 
                  making any unauthorized modification immediately detectable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span><strong className="text-accent">Chain Integrity</strong> is maintained through previous hash references, 
                  ensuring that tampering with one block invalidates all subsequent blocks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span><strong className="text-accent">Proof of Work</strong> adds computational difficulty to block creation, 
                  preventing malicious actors from easily rewriting history.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span><strong className="text-accent">Immutability</strong> is achieved not through physical write-protection, 
                  but through mathematical and cryptographic guarantees.</span>
                </li>
              </ul>
            </div>

            <p>
              The principles demonstrated here form the foundation of modern blockchain technologies used in 
              cryptocurrencies, supply chain management, secure voting systems, and countless other applications 
              requiring trustless, tamper-evident data storage.
            </p>

            <p className="text-center text-lg font-semibold text-primary border-t border-border pt-6 mt-6">
              Understanding these fundamentals is crucial for anyone working with distributed systems, 
              cryptography, or cybersecurity in today's digital landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
