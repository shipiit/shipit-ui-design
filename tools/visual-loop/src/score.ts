export interface RubricScore {
  visualHierarchy: number;
  spacingRhythm: number;
  colorContrast: number;
  typography: number;
  motionPolish: number;
  densityWhitespace: number;
  componentQuality: number;
  accessibility: number;
}

export interface TotalScore {
  perViewport: Record<string, number>;
  total: number;
  breakdown: RubricScore;
}

export const RUBRIC_MAX: RubricScore = {
  visualHierarchy: 15,
  spacingRhythm: 15,
  colorContrast: 15,
  typography: 10,
  motionPolish: 15,
  densityWhitespace: 10,
  componentQuality: 10,
  accessibility: 10,
};

export const RUBRIC_TOTAL = 100;

export function scoreSum(s: RubricScore): number {
  return (
    s.visualHierarchy +
    s.spacingRhythm +
    s.colorContrast +
    s.typography +
    s.motionPolish +
    s.densityWhitespace +
    s.componentQuality +
    s.accessibility
  );
}

export function aggregateScores(perViewport: Record<string, RubricScore>): TotalScore {
  const viewportNames = Object.keys(perViewport);
  if (viewportNames.length === 0) {
    throw new Error("aggregateScores requires at least one viewport score.");
  }

  const perViewportTotals: Record<string, number> = {};
  for (const name of viewportNames) {
    const s = perViewport[name];
    if (!s) throw new Error(`Missing rubric score for viewport "${name}".`);
    validateScore(s, name);
    perViewportTotals[name] = scoreSum(s);
  }

  const breakdown: RubricScore = {
    visualHierarchy: meanField(perViewport, "visualHierarchy"),
    spacingRhythm: meanField(perViewport, "spacingRhythm"),
    colorContrast: meanField(perViewport, "colorContrast"),
    typography: meanField(perViewport, "typography"),
    motionPolish: meanField(perViewport, "motionPolish"),
    densityWhitespace: meanField(perViewport, "densityWhitespace"),
    componentQuality: meanField(perViewport, "componentQuality"),
    accessibility: meanField(perViewport, "accessibility"),
  };

  return {
    perViewport: perViewportTotals,
    total: round1(scoreSum(breakdown)),
    breakdown: roundBreakdown(breakdown),
  };
}

export function delta(prev: TotalScore, next: TotalScore): number {
  return round1(next.total - prev.total);
}

export function passesBar(score: TotalScore, bar = 85): boolean {
  return score.total >= bar;
}

function meanField(perViewport: Record<string, RubricScore>, field: keyof RubricScore): number {
  const values = Object.values(perViewport).map((s) => s[field]);
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

function validateScore(s: RubricScore, name: string): void {
  for (const key of Object.keys(RUBRIC_MAX) as (keyof RubricScore)[]) {
    const v = s[key];
    const max = RUBRIC_MAX[key];
    if (typeof v !== "number" || Number.isNaN(v)) {
      throw new Error(`Score "${name}.${key}" must be a number.`);
    }
    if (v < 0 || v > max) {
      throw new Error(`Score "${name}.${key}" must be in [0, ${max}], got ${v}.`);
    }
  }
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function roundBreakdown(s: RubricScore): RubricScore {
  return {
    visualHierarchy: round1(s.visualHierarchy),
    spacingRhythm: round1(s.spacingRhythm),
    colorContrast: round1(s.colorContrast),
    typography: round1(s.typography),
    motionPolish: round1(s.motionPolish),
    densityWhitespace: round1(s.densityWhitespace),
    componentQuality: round1(s.componentQuality),
    accessibility: round1(s.accessibility),
  };
}
