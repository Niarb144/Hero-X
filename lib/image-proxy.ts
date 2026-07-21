export function proxiedImageUrl(originalUrl: string): string {
  return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
}