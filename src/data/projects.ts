export type Project = {
  id: string;
  title: string;
  location: string;
  serviceSlug: string;
  summary: string;
  image: string;
  verified: boolean;
};

/** Only include real projects with permission to publish. */
export const PROJECTS: Project[] = [];
