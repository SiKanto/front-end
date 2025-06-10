import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Place } from "../data/dummyPlaces";

interface SavedPlacesContextType {
    savedPlaces: Place[];
    addPlace: (place: Place) => void;
    removePlace: (placeId: string) => void;
    isSaved: (placeId: string) => boolean;
    toggleSaved: (place: Place) => void;
}

const SavedPlacesContext = createContext<SavedPlacesContextType | undefined>(
    undefined
);

export function SavedPlacesProvider({ children }: { children: ReactNode }) {
    const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);

    const addPlace = (place: Place) => {
        setSavedPlaces((prev) => [...prev, place]);
    };

    const removePlace = (placeId: string) => {
        setSavedPlaces((prev) => prev.filter((p) => p._id !== placeId));
    };

    const isSaved = (placeId: string) => {
        return savedPlaces.some((p) => p._id === placeId);
    };

    const toggleSaved = (place: Place) => {
        setSavedPlaces((prev) =>
            prev.some((p) => p._id === place._id)
                ? prev.filter((p) => p._id !== place._id)
                : [...prev, place]
        );
    };

    return (
        <SavedPlacesContext.Provider
            value={{ savedPlaces, addPlace, removePlace, isSaved, toggleSaved }}
        >
            {children}
        </SavedPlacesContext.Provider>
    );
}

export function useSavedPlaces() {
    const context = useContext(SavedPlacesContext);
    if (!context)
        throw new Error(
            "useSavedPlaces must be used within SavedPlacesProvider"
        );
    return context;
}
