import { splitAtIndex } from '@blakek/array-split';
import eslint from 'eslint';
import { basename } from 'path';

export function arrayUnique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export function getBaseFileName(path: string): string {
  const filename = basename(path);
  const lastDotPosition = filename.lastIndexOf('.');
  return splitAtIndex(lastDotPosition, filename)[0];
}

export function getRuleIDs(report: eslint.CLIEngine.LintReport) {
  return report.results.flatMap(r =>
    arrayUnique(r.messages.map(rule => rule.ruleId))
  );
}
