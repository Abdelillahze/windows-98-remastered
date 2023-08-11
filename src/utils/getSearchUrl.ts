export default function getSearchUrl(query: string) {
  const regexUrl = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  const isUrl = query.match(regexUrl);

  if (isUrl) {
    return `https://web.archive.org/web/1998/${query}`;
  } else {
    return `https://web.archive.org/web/1998/https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;
  }
}
