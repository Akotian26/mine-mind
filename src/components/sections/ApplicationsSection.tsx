import { Lightbulb, Shield, Coins, FileCheck, Cpu, Database } from "lucide-react";

export function ApplicationsSection() {
  const applications = [
    {
      icon: Shield,
      title: "Data Integrity Verification",
      description: "Ensure data hasn't been altered in distributed systems, databases, and cloud storage through cryptographic validation."
    },
    {
      icon: FileCheck,
      title: "Digital Signatures & Document Validation",
      description: "Secure document authentication, digital certificates, and legal contract verification using blockchain timestamps."
    },
    {
      icon: Coins,
      title: "Cryptocurrency Transactions",
      description: "Bitcoin, Ethereum, and other cryptocurrencies use blockchain to maintain transparent, immutable transaction ledgers."
    },
    {
      icon: Database,
      title: "Secure Log Management",
      description: "Create tamper-proof audit trails for system logs, financial records, and compliance documentation."
    },
    {
      icon: Cpu,
      title: "IoT Security",
      description: "Track data provenance in IoT networks, ensuring device authenticity and preventing unauthorized sensor data manipulation."
    },
    {
      icon: Lightbulb,
      title: "Supply Chain Tracking",
      description: "Monitor product journey from manufacturer to consumer with transparent, verifiable records at each step."
    }
  ];

  return (
    <section id="applications" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Real-World Applications
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            return (
              <div 
                key={idx} 
                className="crypto-card group animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-primary">{app.title}</h3>
                <p className="text-foreground/80 leading-relaxed text-sm">{app.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 crypto-card">
          <h3 className="text-xl font-semibold mb-4 text-primary">Why Blockchain Matters</h3>
          <div className="space-y-3 text-foreground/90">
            <p>
              <strong className="text-accent">Decentralization:</strong> No single point of failure or control, 
              distributing trust across network participants.
            </p>
            <p>
              <strong className="text-accent">Transparency:</strong> All participants can view the entire chain, 
              creating accountability and auditability.
            </p>
            <p>
              <strong className="text-accent">Immutability:</strong> Once data is recorded and validated, 
              it becomes extremely difficult to alter without detection.
            </p>
            <p>
              <strong className="text-accent">Security:</strong> Cryptographic hashing and consensus mechanisms 
              protect against unauthorized modifications and attacks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
