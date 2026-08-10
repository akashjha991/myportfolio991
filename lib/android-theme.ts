/**
 * Material Design 3 color tokens for the Android-themed portfolio.
 * Seed color: #3DDC84 (Android Green)
 */

export const MD3_DARK = {
  // Primary - Android Green tonal palette
  primary: "#3DDC84",
  onPrimary: "#003913",
  primaryContainer: "#005322",
  onPrimaryContainer: "#79F9AA",

  // Secondary
  secondary: "#B0C8B0",
  onSecondary: "#1B331D",
  secondaryContainer: "#314A32",
  onSecondaryContainer: "#CCE5CC",

  // Tertiary
  tertiary: "#A3C9E2",
  onTertiary: "#063545",
  tertiaryContainer: "#234C5D",
  onTertiaryContainer: "#BFE5FF",

  // Error
  error: "#FFB4AB",
  onError: "#690005",
  errorContainer: "#93000A",
  onErrorContainer: "#FFB4AB",

  // Surface
  background: "#0F0F0F",
  onBackground: "#E6E1E5",
  surface: "#131313",
  onSurface: "#E6E1E5",
  surfaceVariant: "#1E1E1E",
  onSurfaceVariant: "#CAC4D0",

  // Outline
  outline: "#938F99",
  outlineVariant: "#49454F",

  // Inverse
  inverseSurface: "#E6E1E5",
  inverseOnSurface: "#313033",
  inversePrimary: "#006C34",

  // Elevation surfaces (tonal)
  surface1: "#1A1A1A",
  surface2: "#202020",
  surface3: "#252525",
  surface4: "#2A2A2A",
  surface5: "#2E2E2E",

  // Status bar / system bars
  statusBar: "#000000",
  systemBar: "#0D0D0D",
} as const;

export const MD3_LIGHT = {
  primary: "#006C34",
  onPrimary: "#FFFFFF",
  primaryContainer: "#79F9AA",
  onPrimaryContainer: "#002110",

  secondary: "#526350",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#D4E8D2",
  onSecondaryContainer: "#0F1F10",

  tertiary: "#3A616E",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#BEE8F6",
  onTertiaryContainer: "#001F27",

  error: "#BA1A1A",
  onError: "#FFFFFF",
  errorContainer: "#FFDAD6",
  onErrorContainer: "#410002",

  background: "#FFFBFE",
  onBackground: "#1C1B1F",
  surface: "#FFFBFE",
  onSurface: "#1C1B1F",
  surfaceVariant: "#E7E0EC",
  onSurfaceVariant: "#49454F",

  outline: "#79747E",
  outlineVariant: "#CAC4D0",

  inverseSurface: "#313033",
  inverseOnSurface: "#F4EFF4",
  inversePrimary: "#3DDC84",

  surface1: "#F5F5F5",
  surface2: "#EEEEEE",
  surface3: "#E8E8E8",
  surface4: "#E2E2E2",
  surface5: "#DCDCDC",

  statusBar: "#FFFFFF",
  systemBar: "#F0F0F0",
} as const;

export type MD3Theme = typeof MD3_DARK;

/**
 * Material 3 type scale — matches Android system typography
 */
export const MD3_TYPE = {
  displayLarge: { fontSize: "57px", lineHeight: "64px", fontWeight: 400, letterSpacing: "-0.25px" },
  displayMedium: { fontSize: "45px", lineHeight: "52px", fontWeight: 400 },
  displaySmall: { fontSize: "36px", lineHeight: "44px", fontWeight: 400 },
  headlineLarge: { fontSize: "32px", lineHeight: "40px", fontWeight: 400 },
  headlineMedium: { fontSize: "28px", lineHeight: "36px", fontWeight: 400 },
  headlineSmall: { fontSize: "24px", lineHeight: "32px", fontWeight: 400 },
  titleLarge: { fontSize: "22px", lineHeight: "28px", fontWeight: 400 },
  titleMedium: { fontSize: "16px", lineHeight: "24px", fontWeight: 500, letterSpacing: "0.15px" },
  titleSmall: { fontSize: "14px", lineHeight: "20px", fontWeight: 500, letterSpacing: "0.1px" },
  bodyLarge: { fontSize: "16px", lineHeight: "24px", fontWeight: 400, letterSpacing: "0.5px" },
  bodyMedium: { fontSize: "14px", lineHeight: "20px", fontWeight: 400, letterSpacing: "0.25px" },
  bodySmall: { fontSize: "12px", lineHeight: "16px", fontWeight: 400, letterSpacing: "0.4px" },
  labelLarge: { fontSize: "14px", lineHeight: "20px", fontWeight: 500, letterSpacing: "0.1px" },
  labelMedium: { fontSize: "12px", lineHeight: "16px", fontWeight: 500, letterSpacing: "0.5px" },
  labelSmall: { fontSize: "11px", lineHeight: "16px", fontWeight: 500, letterSpacing: "0.5px" },
} as const;

/**
 * Motion tokens matching Material 3 motion system
 */
export const MD3_MOTION = {
  springGentle: { type: "spring" as const, stiffness: 300, damping: 30 },
  springSnappy: { type: "spring" as const, stiffness: 500, damping: 40 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  emphasizedDecelerate: { duration: 0.4, ease: [0.05, 0.7, 0.1, 1.0] as const },
  emphasizedAccelerate: { duration: 0.2, ease: [0.3, 0.0, 0.8, 0.15] as const },
  standard: { duration: 0.3, ease: [0.2, 0.0, 0.0, 1.0] as const },
  standardDecelerate: { duration: 0.25, ease: [0.0, 0.0, 0.0, 1.0] as const },
  standardAccelerate: { duration: 0.2, ease: [0.3, 0.0, 1.0, 1.0] as const },
} as const;

/** App definitions for the home screen grid */
export const ANDROID_APPS = [
  { id: "about", label: "About", icon: "👤", color: "#3DDC84", gradient: "from-emerald-500 to-green-600" },
  { id: "projects", label: "Projects", icon: "📦", color: "#4FC3F7", gradient: "from-sky-400 to-blue-600" },
  { id: "skills", label: "Skills", icon: "⚙️", color: "#FFD54F", gradient: "from-amber-400 to-orange-500" },
  { id: "achievements", label: "Achievements", icon: "🏆", color: "#FFD700", gradient: "from-yellow-400 to-amber-600" },
  { id: "contact", label: "Contact", icon: "💬", color: "#CE93D8", gradient: "from-purple-400 to-violet-600" },
  { id: "github", label: "GitHub", icon: "🐙", color: "#F48FB1", gradient: "from-gray-600 to-gray-800" },
  { id: "resume", label: "Resume", icon: "📄", color: "#80DEEA", gradient: "from-teal-400 to-cyan-600" },
  { id: "settings", label: "Settings", icon: "🔧", color: "#BCAAA4", gradient: "from-stone-400 to-stone-600" },
] as const;

export type AppId = typeof ANDROID_APPS[number]["id"];
