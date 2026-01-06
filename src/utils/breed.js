function titleCaseWord(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function titleCasePhrase(phrase) {
  return String(phrase)
    .split(/\s+/g)
    .filter(Boolean)
    .map(titleCaseWord)
    .join(' ');
}

/**
 * Dog CEO images generally look like:
 *   https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg
 * Breed segment is after `/breeds/`.
 */
export function getBreedInfoFromImageUrl(imageUrl) {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('breeds');
    const segment = idx >= 0 ? parts[idx + 1] : null;

    if (!segment) {
      return { breedKey: 'unknown', breedLabel: 'Unknown breed' };
    }

    const decoded = decodeURIComponent(segment).toLowerCase();
    const hyphenParts = decoded.split('-').filter(Boolean);

    // Dog CEO uses `breed-subbreed` for sub-breeds.
    let label;
    if (hyphenParts.length >= 2) {
      const breed = hyphenParts[0];
      const subBreed = hyphenParts.slice(1).join(' ');
      label = `${titleCasePhrase(subBreed)} ${titleCasePhrase(breed)}`.trim();
    } else {
      label = titleCasePhrase(hyphenParts[0]);
    }

    const breedKey = label.toLowerCase();
    return { breedKey, breedLabel: label };
  } catch {
    return { breedKey: 'unknown', breedLabel: 'Unknown breed' };
  }
}

export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = reject;
    img.src = src;
  });
}

