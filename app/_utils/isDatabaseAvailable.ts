/**
 * Check if database is available
 * In production, database is required (throws if missing)
 * In development, database is optional (returns false if missing)
 */
export const isDatabaseAvailable = (): boolean => {
  const hasDatabaseUrl = !!process.env.DATABASE_URL;
  const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

  // In production, require database
  if (!isDev && !hasDatabaseUrl) {
    throw new Error("DATABASE_URL missing from environment variables in production build.");
  }
  return hasDatabaseUrl;
};
