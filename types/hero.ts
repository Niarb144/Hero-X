export interface HeroPowerstats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface HeroBiography {
  "full-name": string;
  "alter-egos": string;
  aliases: string[];
  "place-of-birth": string;
  publisher: string;
  alignment: string;
}

export interface HeroAppearance {
  gender: string;
  race: string | null;
  height: string[]; // [cm, ft/in]
  weight: string[]; // [kg, lb]
  "eye-color": string;
  "hair-color": string;
}

export interface HeroWork {
  occupation: string;
  base: string;
}

export interface HeroConnections {
  "group-affiliation": string;
  relatives: string;
}

export interface Hero {
  id: string;
  name: string;
  powerstats: HeroPowerstats;
  biography: HeroBiography;
  appearance: HeroAppearance;
  work: HeroWork;
  connections: HeroConnections;
  image: { url: string };
}

export interface SuperheroApiSearchResponse {
  response: "success" | "error";
  "results-for"?: string;
  results?: Hero[];
  error?: string;
}