import { CheckCircle2 } from "lucide-react";

export function ObjectiveSection() {
  const objectives = [
    "Understand cryptographic hashing and its role in blockchain security",
    "Implement and visualize a simple blockchain model with linked blocks",
    "Observe how data tampering invalidates the entire chain",
    "Learn about mining difficulty and proof-of-work consensus",
    "Explore real-world applications of blockchain technology"
  ];

  return (
    <section id="objective" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="crypto-card">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Learning Objectives
            </h2>
          </div>

          <div className="space-y-4">
            {objectives.map((objective, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                </div>
                <p className="text-foreground/90 leading-relaxed">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
