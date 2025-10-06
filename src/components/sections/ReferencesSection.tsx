import { BookMarked, ExternalLink } from "lucide-react";

export function ReferencesSection() {
  const references = [
    {
      title: "Cryptography and Network Security: Principles and Practice",
      author: "William Stallings",
      type: "Book",
      description: "Comprehensive guide to cryptographic principles and network security protocols."
    },
    {
      title: "Blockchain Basics: A Non-Technical Introduction in 25 Steps",
      author: "Daniel Drescher",
      type: "Book",
      description: "Accessible introduction to blockchain concepts without requiring technical background."
    },
    {
      title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
      author: "Satoshi Nakamoto (2008)",
      type: "Whitepaper",
      description: "Original Bitcoin whitepaper introducing blockchain technology."
    },
    {
      title: "IEEE Blockchain Initiative",
      author: "IEEE Computer Society",
      type: "Research",
      description: "Collection of research papers on blockchain standards and applications."
    },
    {
      title: "Introduction to Modern Cryptography",
      author: "Jonathan Katz and Yehuda Lindell",
      type: "Book",
      description: "Rigorous treatment of cryptographic foundations including hash functions."
    },
    {
      title: "Mastering Bitcoin: Programming the Open Blockchain",
      author: "Andreas M. Antonopoulos",
      type: "Book",
      description: "Technical deep-dive into Bitcoin and blockchain technology."
    }
  ];

  return (
    <section id="references" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BookMarked className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            References & Further Reading
          </h2>
        </div>

        <div className="space-y-4">
          {references.map((ref, idx) => (
            <div 
              key={idx} 
              className="crypto-card hover:border-primary/50 transition-all animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-primary/20 text-primary border border-primary/30">
                      {ref.type}
                    </span>
                    <h3 className="font-semibold text-foreground">{ref.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{ref.author}</p>
                  <p className="text-sm text-foreground/80">{ref.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 crypto-card bg-primary/5 border-primary/30">
          <h3 className="font-semibold text-primary mb-3">Additional Resources</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>• <strong>Coursera:</strong> Blockchain Specialization by University at Buffalo</li>
            <li>• <strong>MIT OpenCourseWare:</strong> Blockchain and Money (15.S12)</li>
            <li>• <strong>GitHub:</strong> Various blockchain implementation examples and tutorials</li>
            <li>• <strong>arXiv.org:</strong> Latest research papers on blockchain and cryptography</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
