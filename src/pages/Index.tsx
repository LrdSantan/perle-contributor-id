import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, Sparkles } from "lucide-react";
import ContributorCard from "@/components/ContributorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AI_ROLES = [
  "AI Model Evaluator",
  "Data Trainer",
  "Synthetic Data Engineer",
  "Robotics Data Specialist",
  "LLM Analyst",
  "AI Research Contributor",
];

function randomRole() {
  return AI_ROLES[Math.floor(Math.random() * AI_ROLES.length)];
}

function randomReputation() {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const Index = () => {
  const [username, setUsername] = useState("");
  const [cardData, setCardData] = useState<{
    username: string;
    role: string;
    reputation: number;
    avatarUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(() => {
    const trimmed = username.trim().replace("@", "");
    if (!trimmed) {
      toast.error("Please enter a valid X username");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setCardData({
        username: trimmed,
        role: randomRole(),
        reputation: randomReputation(),
        avatarUrl: `/api/avatar?username=${trimmed}`,
      });
      setLoading(false);
    }, 600);
  }, [username]);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = `perle-contributor-${cardData?.username}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Card downloaded!");
    } catch {
      toast.error("Failed to download card");
    }
  }, [cardData]);

  const handleShare = useCallback(() => {
    if (!cardData) return;
    const text = encodeURIComponent(
      `I just generated my Perle AI Contributor Card!\n\n@${cardData.username} | ${cardData.role}\nNetwork Reputation: ${cardData.reputation}\n\nGet yours at perle.ai\n\nBuilt by @ifwayodeji`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }, [cardData]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(16 100% 55% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16 max-w-5xl">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Perle AI <span className="text-primary neon-text">Contributor</span> Card
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Generate your unique AI contributor identity card from the Perle Network
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10 sm:mb-16">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Enter X username"
              className="pl-8 bg-secondary border-border focus:border-primary focus:ring-primary/30 h-11"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-sm tracking-wider h-11 px-6"
          >
            {loading ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>

        {cardData && (
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <div className="animate-float">
              <ContributorCard ref={cardRef} {...cardData} />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-border hover:border-primary hover:text-primary gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-border hover:border-neon-cyan hover:text-neon-cyan gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share to X
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-16 sm:mt-24">
      <p className="text-muted-foreground/40 text-xs">
  Built by{" "}
  <a
    href="https://x.com/ifwayodeji"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary/60 hover:text-primary transition-colors"
  >
    @ifwayodeji
  </a>
</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
