import US_STATES from "@/_lists/UsStates";
import { useEffect, useRef, useState, useCallback } from "react";

const YourLocation = ({ onChange }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  const stableOnChange = useCallback((data) => onChange?.(data), [onChange]);

  const fetchSuggestions = useCallback(async (value) => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          new URLSearchParams({
            q: value,
            format: "json",
            addressdetails: "1",
            countrycodes: "us",
            limit: "6",
          }),
        {
          headers: {
            // Required by Nominatim usage policy
            "Accept-Language": "en",
          },
        },
      );
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Nominatim error:", err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce input so we don't hammer the API on every keystroke
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedPlace(null);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400);
  };

  // User picks a suggestion
  const handleSelect = (place) => {
    const stateCode =
      US_STATES.find(
        (s) => s.label.toLowerCase() === place.address?.state?.toLowerCase(),
      )?.value || "";

    const selected = {
      formattedAddress: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      state: stateCode,
    };

    setQuery(place.display_name);
    setSelectedPlace(selected);
    setShowSuggestions(false);
    setSuggestions([]);

    if (stateCode) setSelectedState(stateCode);

    stableOnChange({
      address: place.display_name,
      lat: selected.lat,
      lng: selected.lng,
      state: stateCode,
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const mapUrl = selectedPlace
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPlace.lng - 0.01},${selectedPlace.lat - 0.01},${selectedPlace.lng + 0.01},${selectedPlace.lat + 0.01}&layer=mapnik&marker=${selectedPlace.lat},${selectedPlace.lng}`
    : null;

  return (
    <div className="rounded-2xl border border-slate-700 p-4 bg-slate-900">
      {/* Header */}
      <h1 className="font-bold text-slate-100">
        <span>🗺️</span> <span>Your Location</span>
      </h1>

      {/* Inputs row */}
      <div className="mt-5 flex items-start justify-between gap-4">
        {/* State selector */}
        <div className="shrink-0">
          <label htmlFor="state" className="block text-sm text-slate-300">
            Your State (USA)
          </label>
          <input
            id="state"
            name="state"
            type="text"
            readOnly
            disabled
            // Find the matching label for the state code, or show a placeholder
            value={
              US_STATES.find((s) => s.value === selectedState)?.label ||
              "Auto-filled from address"
            }
            className="mt-3 w-44 rounded-md bg-slate-800/50 text-slate-400 border border-slate-700 px-3 py-2 text-sm cursor-not-allowed"
          />
        </div>

        {/* Address autocomplete */}
        <div className="flex-1" ref={wrapperRef}>
          <label
            htmlFor="address-input"
            className="block text-sm text-slate-300"
          >
            Search your address <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-3">
            {/* Search / loading icon */}
            {isLoading ? (
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            )}

            <input
              id="address-input"
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Start typing your address..."
              autoComplete="off"
              className="w-full bg-slate-800 text-slate-200 placeholder:text-slate-500 border border-slate-600 focus:ring-blue-500 focus:border-blue-500 rounded-md pl-9 pr-3 py-2 text-sm"
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onMouseDown={() => handleSelect(place)}
                    className="px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer flex items-start gap-2"
                  >
                    <span className="mt-0.5 text-slate-400 shrink-0">📍</span>
                    <span className="line-clamp-2">{place.display_name}</span>
                  </li>
                ))}
                {/* Nominatim attribution — required by usage policy */}
                <li className="px-3 py-1.5 text-xs text-slate-500 border-t border-slate-700">
                  © OpenStreetMap contributors
                </li>
              </ul>
            )}
          </div>

          {selectedPlace && (
            <p className="mt-1.5 text-xs text-blue-400 flex items-center gap-1">
              <span>📍</span>
              <span className="truncate">{selectedPlace.formattedAddress}</span>
            </p>
          )}
        </div>
      </div>

      {/* Map preview — OpenStreetMap embed, no API key needed */}
      {mapUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 h-48">
          <iframe
            title="location-map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default YourLocation;
