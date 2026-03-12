"use client";

import { useState, useEffect, useCallback } from "react";
import { ADS } from "@/lib/game-data";
import { shuffle } from "@/lib/game-logic";
import { spawnEmojiReact } from "@/lib/emoji-react";
import type { Ad } from "@/types/game";

interface TopAdProps {
  emojiMode: boolean;
  refreshKey: number;
}

export default function TopAd({ emojiMode, refreshKey }: TopAdProps) {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const ads = shuffle(ADS);
    setAd(ads[0]);
  }, [refreshKey]);

  const handleCtaClick = useCallback(
    (e: React.MouseEvent) => {
      spawnEmojiReact(e.clientX, e.clientY);
    },
    []
  );

  if (!ad) return null;

  return (
    <div className="press-notice-wrap">
      <div className="press-notice-label">Advertisement</div>
      <div className="press-notice">
        <span className="press-notice-emoji">{ad.em}</span>
        <div className="press-notice-body">
          <div className="press-notice-title">
            {emojiMode ? "🛒✨💰🔥" : ad.t}
          </div>
          <div className="press-notice-sub">
            {emojiMode ? "👆👆👆 💵➡️😊" : ad.sub}
          </div>
        </div>
        <button className="press-notice-cta" onClick={handleCtaClick}>
          {emojiMode ? "👆" : ad.cta || "Learn more"}
        </button>
      </div>
    </div>
  );
}
