import { Target } from "lucide-react";

export function AimSection() {
  return (
    <section id="aim" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="crypto-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Aim
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-foreground/90">
            To implement and demonstrate a <span className="text-primary font-semibold">Blockchain-style Hash Chain</span> that ensures{" "}
            <span className="text-accent font-semibold">data integrity</span> and{" "}
            <span className="text-accent font-semibold">immutability</span> using cryptographic hash functions.
            This demonstration illustrates how blockchain technology maintains a secure, tamper-evident ledger
            through cryptographic linking of data blocks.
          </p>
        </div>
      </div>
    </section>
  );
}
