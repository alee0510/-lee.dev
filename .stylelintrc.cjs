module.exports = {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // Catch duplicate properties
    'declaration-block-no-duplicate-properties': true,

    // Catch shorthand that overrides longhand below it
    'declaration-block-no-shorthand-property-overrides': true,

    // Enforce your BEM naming convention
    'selector-class-pattern': [
      /^[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/,
      { message: 'Expected BEM class name pattern' },
    ],

    // Allows empty <style> tags in Astro files without erroring
    'no-empty-source': null,

    // Fixes the error: Unknown value "'Space Mono', monospace" for descriptor "font-family"
    'at-rule-descriptor-value-no-unknown': null,

    // Catch duplicate custom properties (like the --primary-rgb error you had)
    'declaration-block-no-duplicate-custom-properties': true,

    // Handle Unknown properties from CSS SVG
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['fill', 'stroke', 'stroke-width', 'vector-effect'],
      },
    ],

    // The :global() pseudo-class is used to apply styles to elements outside of the component's scoped CSS
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
