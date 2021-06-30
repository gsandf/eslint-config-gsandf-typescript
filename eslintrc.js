const baseConfig = require('eslint-config-gsandf');
const { packageJson } = require('read-pkg-up').sync();

const hasReact = Boolean(
  packageJson && packageJson.dependencies && packageJson.dependencies.react
);

const equivalents = ['semi', 'space-before-function-paren'];

function ruleFromBaseConfig(name) {
  const rule = baseConfig.rules[name];

  if (rule === undefined) {
    return 'off';
  }

  if (typeof rule !== 'object') {
    return rule;
  }

  return JSON.parse(JSON.stringify(rule));
}

function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

const config = {
  extends: [hasReact ? 'gsandf-react' : 'gsandf'],

  plugins: ['@typescript-eslint'],

  overrides: [
    {
      extends: [
        'prettier',
        hasReact ? 'gsandf-react' : 'gsandf',
        'plugin:@typescript-eslint/eslint-recommended'
      ],

      files: ['*.ts', '*.tsx'],

      parser: '@typescript-eslint/parser',

      rules: {
        // TypeScript has this functionality by default:
        'no-undef': 'off',

        // Replace base ESLint rules with those from `@typescript-eslint`:
        ...fromEntries(equivalents.map(name => [name, 'off'])),
        ...fromEntries(
          equivalents.map(name => [
            `@typescript-eslint/${name}`,
            ruleFromBaseConfig(name)
          ])
        ),

        // Replace inherited ESLint rules with those from `@typescript-eslint`:
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all'
          }
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            classes: false,
            enums: false,
            functions: false,
            ignoreTypeReferences: true,
            typedefs: false,
            variables: false
          }
        ],

        'prefer-const': 'off',
        'no-void': ['error', { allowAsStatement: true }],

        '@typescript-eslint/ban-ts-comment': ['warn'],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: { delimiter: 'semi' },
            singleline: { requireLast: false }
          }
        ],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-empty-interface': [
          'error',
          { allowSingleExtends: true }
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': [
          'error',
          { allowWithDecorator: true }
        ],
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true
          }
        ],
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-this-alias': [
          'error',
          { allowDestructuring: true }
        ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/require-array-sort-compare': [
          'error',
          { ignoreStringArrays: true }
        ],
        '@typescript-eslint/restrict-plus-operands': [
          'error',
          { checkCompoundAssignments: true }
        ],
        '@typescript-eslint/restrict-template-expressions': [
          'warn',
          { allowAny: true, allowBoolean: true, allowNumber: true }
        ],
        '@typescript-eslint/return-await': ['off'],
        '@typescript-eslint/triple-slash-reference': 'error'
      }
    }
  ]
};

module.exports = config;
