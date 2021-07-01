import test from 'ava';
import eslint from 'eslint';
import { getBaseFileName, getRuleIDs } from './test-helpers/lib';

const linter = new eslint.CLIEngine({ configFile: './.eslintrc.js' });

test('should pass files that have no issues', t => {
  const results = linter.executeOnFiles(['test-helpers/pass/**/*']);

  const errorMessages = () => getRuleIDs(results).join(', ');

  t.is(
    results.errorCount + results.warningCount,
    0,
    `Unexpectedly failed with these errors: ${errorMessages()}`
  );
});

test('should error on files with issues', t => {
  const { results } = linter.executeOnFiles(['test-helpers/error/**/*']);

  results.forEach(({ filePath, messages, errorCount }) => {
    t.true(errorCount > 0, `Expected errors in ${filePath}, but found none.`);

    const failedRules = messages.map(rule => rule.ruleId);
    const ruleBaseName = getBaseFileName(filePath).replace(/_/g, '/');

    t.assert(
      failedRules.includes(ruleBaseName) ||
        failedRules.includes(`@typescript-eslint/${ruleBaseName}`),
      `Expected to find ${ruleBaseName} in [${failedRules.join(', ')}]`
    );
  });
});

test('should warn on files with warnings', t => {
  const { results } = linter.executeOnFiles(['test-helpers/warn/**/*']);

  results.forEach(({ filePath, messages, warningCount }) => {
    t.true(warningCount > 0, `Expected errors in ${filePath}, but found none.`);

    const failedRules = messages.map(rule => rule.ruleId);
    const ruleBaseName = getBaseFileName(filePath).replace(/_/g, '/');

    t.assert(
      failedRules.includes(ruleBaseName) ||
        failedRules.includes(`@typescript-eslint/${ruleBaseName}`),
      `Expected to find ${ruleBaseName} in [${failedRules.join(', ')}]`
    );
  });
});
