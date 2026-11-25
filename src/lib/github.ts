import { profile } from "@/content/data";

type Repo = { name: string; stargazers_count: number };

/**
 * Star counts for the user's public repos, keyed by repo name.
 * Fetched at build time and revalidated hourly; returns {} if GitHub is
 * unreachable or rate-limited so the page still renders.
 */
export async function getRepoStars(): Promise<Record<string, number>> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return {};
    const repos = (await res.json()) as Repo[];
    return Object.fromEntries(repos.map((r) => [r.name, r.stargazers_count]));
  } catch {
    return {};
  }
}

export const repoUrl = (repo: string) =>
  `https://github.com/${profile.githubUser}/${repo}`;
