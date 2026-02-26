import {
  saveThemeToStorage,
  loadThemeFromStorage,
  getSystemTheme,
} from './themeUtils';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  value: mockMatchMedia,
});

describe('themeUtils', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    mockMatchMedia.mockReturnValue({ matches: false });
  });

  describe('saveThemeToStorage', () => {
    it('should save "light" to localStorage', () => {
      saveThemeToStorage('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should save "dark" to localStorage', () => {
      saveThemeToStorage('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('loadThemeFromStorage', () => {
    it('should return stored theme', () => {
      localStorageMock.getItem.mockReturnValueOnce('dark');
      expect(loadThemeFromStorage()).toBe('dark');
    });

    it('should return system preference when no theme stored (light)', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      mockMatchMedia.mockReturnValue({ matches: false });
      expect(loadThemeFromStorage()).toBe('light');
    });

    it('should return system preference when no theme stored (dark)', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      mockMatchMedia.mockReturnValue({ matches: true });
      expect(loadThemeFromStorage()).toBe('dark');
    });
  });

  describe('getSystemTheme', () => {
    it('should return dark when system prefers dark', () => {
      mockMatchMedia.mockReturnValue({ matches: true });
      expect(getSystemTheme()).toBe('dark');
    });

    it('should return light when system prefers light', () => {
      mockMatchMedia.mockReturnValue({ matches: false });
      expect(getSystemTheme()).toBe('light');
    });
  });
});
