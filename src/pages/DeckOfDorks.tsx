import { useEffect } from "react";

// Il sito di Deck of Dorks è statico (public/deckofdorks): /portfolio/deckofdorks lo apre.
const siteUrl = `${import.meta.env.BASE_URL}deckofdorks/index.html`;

const DeckOfDorks = () => {
  useEffect(() => {
    window.location.replace(siteUrl);
  }, []);

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container mx-auto px-6 text-muted-foreground">
        Apertura di <a href={siteUrl} className="text-primary underline">Deck of Dorks</a>…
      </div>
    </div>
  );
};

export default DeckOfDorks;
