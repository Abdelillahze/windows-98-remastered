export default function createFile(content: string) {
  const base64 = btoa(content);

  return base64;
}
