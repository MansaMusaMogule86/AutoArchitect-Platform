
export function fill(template: string, vars: Record<string, string>) {
  let out = template;
  for (const key of Object.keys(vars)) {
    // Fix: Use split().join() instead of replaceAll for broader compatibility with environments lacking ES2021+ support
    out = out.split(`{${key}}`).join(vars[key] ?? "");
  }
  return out;
}
