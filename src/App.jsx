import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { getFactsForBreed } from './data/breedFacts.js';
import { getBreedInfoFromImageUrl, preloadImage } from './utils/breed.js';

const DOG_API_RANDOM_IMAGE = 'https://dog.ceo/api/breeds/image/random';

async function fetchRandomDog() {
  const res = await fetch(DOG_API_RANDOM_IMAGE);
  if (!res.ok) throw new Error(`Dog API error (${res.status})`);

  const data = await res.json();
  if (!data || data.status !== 'success' || typeof data.message !== 'string') {
    throw new Error('Dog API returned an unexpected response');
  }

  const imageUrl = data.message;
  const { breedKey, breedLabel } = getBreedInfoFromImageUrl(imageUrl);

  // Preload the image for smoother swaps.
  await preloadImage(imageUrl);

  return {
    imageUrl,
    breedKey,
    breedLabel
  };
}

export default function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [prefetchedDog, setPrefetchedDog] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('');

  const prefetchInFlight = useRef(false);

  const currentFacts = useMemo(() => {
    if (!currentDog) return [];
    return getFactsForBreed(currentDog.breedKey, currentDog.breedLabel);
  }, [currentDog]);

  const startPrefetch = useCallback(async () => {
    if (prefetchInFlight.current) return;
    prefetchInFlight.current = true;
    try {
      const dog = await fetchRandomDog();
      setPrefetchedDog(dog);
    } catch {
      // Prefetch is best-effort. Ignore errors.
    } finally {
      prefetchInFlight.current = false;
    }
  }, []);

  const loadNewDog = useCallback(async () => {
    setErrorMessage('');
    setStatus('loading');
    try {
      if (prefetchedDog) {
        setCurrentDog(prefetchedDog);
        setPrefetchedDog(null);
        setStatus('ready');
        startPrefetch();
        return;
      }

      const dog = await fetchRandomDog();
      setCurrentDog(dog);
      setStatus('ready');
      startPrefetch();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong fetching a dog.');
    }
  }, [prefetchedDog, startPrefetch]);

  useEffect(() => {
    loadNewDog();
  }, [loadNewDog]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        loadNewDog();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [loadNewDog]);

  const isLoading = status === 'loading';
  const isError = status === 'error';

  return (
    <div className="page">
      <main className="card" aria-live="polite">
        <div className="imageWrap">
          {currentDog?.imageUrl ? (
            <img
              className={`dogImage ${isLoading ? 'isLoading' : ''}`}
              src={currentDog.imageUrl}
              alt={`A ${currentDog.breedLabel}`}
              loading="eager"
            />
          ) : (
            <div className="imagePlaceholder" aria-hidden="true" />
          )}
          {isLoading ? <div className="loadingBadge">Loading…</div> : null}
        </div>

        <div className="text">
          <h1 className="breedName">{currentDog?.breedLabel ?? 'Dog Breed Explorer'}</h1>

          {isError ? (
            <div className="error">
              <p className="errorTitle">Couldn’t load a new dog.</p>
              <p className="errorBody">{errorMessage}</p>
              <button className="retryButton" type="button" onClick={loadNewDog}>
                Try again
              </button>
            </div>
          ) : (
            <ul className="facts" aria-label="Fun facts">
              {currentFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <nav className="nav" aria-label="Breed navigation">
        <button
          className="navButton"
          type="button"
          onClick={loadNewDog}
          disabled={isLoading}
          aria-label="Previous (loads a new random breed)"
          title="Previous (loads a new random breed)"
        >
          ◀
        </button>
        <span className="navHint">
          <span className="srOnly">Tip: </span>
          Use ◀ / ▶ (or your keyboard arrows) to discover a new random breed
        </span>
        <button
          className="navButton"
          type="button"
          onClick={loadNewDog}
          disabled={isLoading}
          aria-label="Next (loads a new random breed)"
          title="Next (loads a new random breed)"
        >
          ▶
        </button>
      </nav>
    </div>
  );
}

