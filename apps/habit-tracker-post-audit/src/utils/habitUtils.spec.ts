import {
  generateId,
  getCompletedDaysCount,
  getCompletionPercentage,
  isHabitCompleted,
  calculateStreak,
  saveHabitsToStorage,
  loadHabitsFromStorage,
  createEmptyHabitDays,
  DAYS_OF_WEEK,
  DAYS_DISPLAY_NAMES,
} from './habitUtils';
import type { Habit } from '../types/Habit';

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

describe('habitUtils', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  // ===== generateId =====
  describe('generateId', () => {
    it('should return a non-empty string', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('should generate unique IDs', () => {
      const ids = new Set(Array.from({ length: 100 }, () => generateId()));
      expect(ids.size).toBe(100);
    });
  });

  // ===== createEmptyHabitDays =====
  describe('createEmptyHabitDays', () => {
    it('should create an object with all 7 days set to false', () => {
      const days = createEmptyHabitDays();
      DAYS_OF_WEEK.forEach(day => {
        expect(days[day]).toBe(false);
      });
    });

    it('should have exactly 7 entries', () => {
      const days = createEmptyHabitDays();
      expect(Object.keys(days)).toHaveLength(7);
    });
  });

  // ===== getCompletedDaysCount =====
  describe('getCompletedDaysCount', () => {
    it('should return 0 for no completed days', () => {
      const habit = createTestHabit();
      expect(getCompletedDaysCount(habit)).toBe(0);
    });

    it('should return correct count for some completed days', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: false,
        },
      });
      expect(getCompletedDaysCount(habit)).toBe(3);
    });

    it('should return 7 for all completed days', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
      });
      expect(getCompletedDaysCount(habit)).toBe(7);
    });
  });

  // ===== getCompletionPercentage =====
  describe('getCompletionPercentage', () => {
    it('should return 0% for no completed days', () => {
      const habit = createTestHabit();
      expect(getCompletionPercentage(habit)).toBe(0);
    });

    it('should return 100% for all completed days', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
      });
      expect(getCompletionPercentage(habit)).toBe(100);
    });

    it('should return rounded percentage', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
      });
      expect(getCompletionPercentage(habit)).toBe(14); // 1/7 ≈ 14.28 → 14
    });
  });

  // ===== isHabitCompleted =====
  describe('isHabitCompleted', () => {
    it('should return false when not all days completed', () => {
      const habit = createTestHabit();
      expect(isHabitCompleted(habit)).toBe(false);
    });

    it('should return true when all 7 days completed', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
      });
      expect(isHabitCompleted(habit)).toBe(true);
    });
  });

  // ===== calculateStreak =====
  describe('calculateStreak', () => {
    it('should return 0 when no days are completed', () => {
      const habit = createTestHabit();
      expect(calculateStreak(habit)).toBe(0);
    });

    it('should return 1 for a single completed day', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: false,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
      });
      expect(calculateStreak(habit)).toBe(1);
    });

    it('should return max consecutive streak', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: true,
          sunday: false,
        },
      });
      expect(calculateStreak(habit)).toBe(3); // Mon-Tue-Wed
    });

    it('should return 7 for full week streak', () => {
      const habit = createTestHabit({
        completedDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
      });
      expect(calculateStreak(habit)).toBe(7);
    });
  });

  // ===== saveHabitsToStorage / loadHabitsFromStorage =====
  describe('localStorage persistence', () => {
    it('should save habits to localStorage', () => {
      const habits = [createTestHabit({ name: 'Exercise' })];
      saveHabitsToStorage(habits);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'habits',
        JSON.stringify(habits)
      );
    });

    it('should load habits from localStorage', () => {
      const habits = [createTestHabit({ name: 'Read' })];
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(habits));
      const loaded = loadHabitsFromStorage();
      expect(loaded).toEqual(habits);
    });

    it('should return empty array when no habits stored', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);
      expect(loadHabitsFromStorage()).toEqual([]);
    });

    it('should return empty array on invalid JSON', () => {
      localStorageMock.getItem.mockReturnValueOnce('invalid-json{');
      expect(loadHabitsFromStorage()).toEqual([]);
    });

    it('should return empty array if stored value is not an array', () => {
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ not: 'array' }));
      expect(loadHabitsFromStorage()).toEqual([]);
    });
  });

  // ===== Constants =====
  describe('DAYS_OF_WEEK', () => {
    it('should have 7 days', () => {
      expect(DAYS_OF_WEEK).toHaveLength(7);
    });

    it('should start with monday and end with sunday', () => {
      expect(DAYS_OF_WEEK[0]).toBe('monday');
      expect(DAYS_OF_WEEK[6]).toBe('sunday');
    });
  });

  describe('DAYS_DISPLAY_NAMES', () => {
    it('should have display names for all days', () => {
      DAYS_OF_WEEK.forEach(day => {
        expect(DAYS_DISPLAY_NAMES[day]).toBeDefined();
        expect(typeof DAYS_DISPLAY_NAMES[day]).toBe('string');
      });
    });
  });
});

// Helper to create test habits
function createTestHabit(overrides?: Partial<Habit>): Habit {
  return {
    id: 'test-id-1',
    name: 'Test Habit',
    color: '#FF6B6B',
    completedDays: createEmptyHabitDays(),
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}
