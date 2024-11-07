import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  MutableRefObject,
} from 'react';

type FocusContextType = {
  focusSearchInput: () => void;
  searchInputRef: MutableRefObject<HTMLInputElement | null>;
};
const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const useFocusContext = () => {
  const context = useContext(FocusContext);
  if (!context)
    throw new Error('useFocusContext must be used within FocusProvider');
  return context;
};

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const focusSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <FocusContext.Provider value={{ focusSearchInput, searchInputRef }}>
      {children}
    </FocusContext.Provider>
  );
};
