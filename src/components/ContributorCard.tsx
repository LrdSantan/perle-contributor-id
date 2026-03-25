import { forwardRef } from "react";
import perleLogo from "@/assets/perle-logo.png";

interface ContributorCardProps {
  username: string;
  role: string;
  reputation: number;
  avatarUrl: string;
}

const ContributorCard = forwardRef<HTMLDivElement, ContributorCardProps>(
  ({ username, role, reputation, avatarUrl }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden neon-border animate-pulse-glow"
        style={{
          background: "linear-gradient(160deg, #0a0a0f 0%, #0f0f18 40%, #0d0d14 100%)",
        }}
      >
        {/* Scan line overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 animate-scan" style={{
            background: "linear-gradient(transparent 0%, hsl(16 100% 55% / 0.15) 50%, transparent 100%)",
            height: "50%",
          }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src={perleLogo} alt="Perle" className="h-6 sm:h-7 object-contain" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-mono-code uppercase tracking-widest">Active</span>
            </div>
          </div>

          <div className="text-center flex-1 flex flex-col items-center justify-center">
            {/* Network label */}
            <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] uppercase text-primary mb-1 neon-text">
              Perle AI Network
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs tracking-widest uppercase mb-6">
              Contributor Node
            </p>

            {/* Avatar */}
            <div className="relative mb-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-br from-primary via-orange-400 to-red-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-background p-[2px]">
                  <img
                    src={avatarUrl}
                    alt={username}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${username}`;
                    }}
                  />
                </div>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full" style={{
                boxShadow: "0 0 30px hsl(16 100% 55% / 0.3), 0 0 60px hsl(16 100% 55% / 0.1)",
              }} />
            </div>

            {/* Username */}
            <h2 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
              @{username}
            </h2>

            {/* Info grid */}
            <div className="w-full space-y-3 text-left">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Role</span>
                <span className="text-primary text-xs sm:text-sm font-medium font-mono-code">{role}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Specialty</span>
                <span className="text-foreground text-xs sm:text-sm font-mono-code">AI Training</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">Reputation</span>
                <span className="text-neon-cyan text-xs sm:text-sm font-bold font-mono-code">{reputation.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
            <span className="text-muted-foreground text-[9px] sm:text-[10px] tracking-wider uppercase">
              Powered by Perle AI
            </span>
            <span className="text-muted-foreground/50 text-[9px] sm:text-[10px]">
              Built by @ifwayodeji
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ContributorCard.displayName = "ContributorCard";

export default ContributorCard;
