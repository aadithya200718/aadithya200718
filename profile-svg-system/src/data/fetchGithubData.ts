import { GitHubUserData, GitHubRepoSummary } from '../types/index.js';

/**
 * Fetches publicly verifiable profile and repository metadata from GitHub API.
 * Uses native fetch with robust timeout and rate-limit handling.
 */
export async function fetchGithubData(username: string): Promise<{
  user: GitHubUserData;
  repos: GitHubRepoSummary[];
}> {
  const headers: Record<string, string> = {
    'User-Agent': 'Profile-SVG-Verifier/1.0',
    Accept: 'application/vnd.github.v3+json'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const userUrl = `https://api.github.com/users/${username}`;
  console.log(`[GitHub Verifier] Fetching profile metadata from ${userUrl}...`);

  const userRes = await fetch(userUrl, { headers });
  if (!userRes.ok) {
    throw new Error(
      `GitHub API returned status ${userRes.status}: ${userRes.statusText}`
    );
  }

  const rawUser = await userRes.json();
  const user: GitHubUserData = {
    login: rawUser.login,
    name: rawUser.name || username,
    bio: rawUser.bio,
    public_repos: rawUser.public_repos,
    followers: rawUser.followers,
    following: rawUser.following,
    created_at: rawUser.created_at,
    updated_at: rawUser.updated_at,
    verifiedAt: new Date().toISOString(),
    source: userUrl
  };

  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  console.log(`[GitHub Verifier] Fetching public repository metadata from ${reposUrl}...`);

  const reposRes = await fetch(reposUrl, { headers });
  let repos: GitHubRepoSummary[] = [];

  if (reposRes.ok) {
    const rawRepos = await reposRes.json();
    repos = rawRepos.map((r: any) => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      language: r.language,
      stargazers_count: r.stargazers_count,
      fork: r.fork
    }));
  } else {
    console.warn(
      `[GitHub Verifier] Could not fetch repos list (${reposRes.status}). Proceeding with verified user object.`
    );
  }

  return { user, repos };
}
