export type User = {
  id: string;
  name: string;
  email: string;
  provider: "github" | "credentials";
};

export type Project = {
  id: string;
  name: string;
  description?: string;
};

export type BigList = {
  id: string;
  userId: string;
  wordIndex: string;
  learned: boolean;
  learnedDate?: Date;
};

export type GlobalDictionary = {
  id: string;
  word: string;
  definition: string;
};

