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

export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
};
