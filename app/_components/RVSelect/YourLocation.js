import US_STATES from "@/_lists/UsStates";
import { Loader, LocateFixed, Search } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "@/_lib/store/cartSlice";

const YourLocation = ({ onChange }) => {
  const dispatch = useDispatch();
  const reduxLocation = useSelector((state) => state.cart.location);

  const [selectedState, setSelectedState] = useState(
    reduxLocation?.state || "",
  );
  const [selectedPlace, setSelectedPlace] = useState(reduxLocation);
  const [query, setQuery] = useState(reduxLocation?.formattedAddress || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  const stableOnChange = useCallback(
    (data) => {
      onChange?.(data);
      dispatch(setLocation(data));
    },
    [onChange, dispatch],
  );

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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedPlace(null);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400);
  };

  const handleSelect = (place) => {
    const stateName = place.address?.state?.toLowerCase();
    const stateCode =
      US_STATES.find((s) => s.label.toLowerCase() === stateName)?.value || "";

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

    stableOnChange(selected);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const mapUrl = selectedPlace
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selectedPlace.lng - 0.005},${selectedPlace.lat - 0.005},${selectedPlace.lng + 0.005},${selectedPlace.lat + 0.005}&layer=mapnik&marker=${selectedPlace.lat},${selectedPlace.lng}`
    : null;

  return (
    <div className="rounded-2xl border border-slate-700 p-4 bg-slate-900 shadow-xl">
      <h2 className="font-bold text-slate-100 flex items-center gap-2">
        <span role="img" aria-label="map">
          ️🗺️
        </span>{" "}
        Your Location
      </h2>

      <div className="mt-5 flex flex-col md:flex-row items-start gap-4">
        {/* <div className="w-full md:w-44 shrink-0">
          <label
            htmlFor="state"
            className="block text-xs font-medium text-slate-400"
          >
            Your State (USA)
          </label>
          <input
            id="state"
            type="text"
            readOnly
            disabled
            value={
              US_STATES.find((s) => s.value === selectedState)?.label ||
              "Auto-filled from address"
            }
            className="mt-2 w-full rounded-md bg-slate-800/40 text-slate-400 border border-slate-700 px-3 py-2 text-sm cursor-not-allowed italic"
          />
        </div> */}

        <div className="flex-1 w-full" ref={wrapperRef}>
          <label
            htmlFor="address-input"
            className="block text-xs font-medium text-slate-400"
          >
            Search your address <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-2">
            {isLoading ? (
              <Loader className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            )}

            <input
              id="address-input"
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Enter street, city, or zip..."
              autoComplete="off"
              className="w-full bg-slate-800 text-slate-200 placeholder:text-slate-600 border border-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-md pl-9 pr-3 py-2 text-sm transition-all"
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-600 rounded-md shadow-2xl max-h-60 overflow-y-auto">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onMouseDown={() => handleSelect(place)}
                    className="px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer flex items-start gap-2 border-b border-slate-700/50 last:border-0"
                  >
                    <span className="mt-0.5 text-slate-500 shrink-0">📍</span>
                    <span className="line-clamp-2 wrap-break-word min-w-0">
                      {place.display_name}
                    </span>
                  </li>
                ))}
                <li className="px-3 py-1.5 text-[10px] text-slate-600 bg-slate-900/50 italic border-t border-slate-700">
                  Data from OpenStreetMap
                </li>
              </ul>
            )}
          </div>

          {selectedPlace && (
            <div className="mt-2 text-xs text-blue-400 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
              <LocateFixed className="text-slate-500 w-4 h-4 mt-0.5 shrink-0" />
              <span className="line-clamp-4 wrap-break-word">
                {selectedPlace.formattedAddress}
              </span>
            </div>
          )}
        </div>
      </div>

      {mapUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 h-40 bg-slate-800 shadow-inner">
          <iframe
            title="location-map"
            src={mapUrl}
            width="100%"
            height="100%"
            className=" opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default YourLocation;
