// postcss.config.cjs
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano  = require('cssnano');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [

    // ── PurgeCSS (production only) ──────────────────────────────────
    isProd && purgecss({
      content: [
        './src/**/*.{astro,html,js,ts,jsx,tsx}',
      ],

      // Handles your BEM convention:
      // block, block__element, block__element-word, block--modifier
      // e.g. drawer, drawer__nav, drawer__nav-link, drawer__nav-link--active
      defaultExtractor: content =>
        content.match(/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:__[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)?(?:--[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)?/g) || [],

      safelist: {
        standard: [
          // Drawer states
          'drawer--open',
          'drawer__backdrop',

          // Nav states
          'nav__link--active',
          'drawer__nav-link--active',
        ],
        // Protect all modifiers and states toggled via JS at runtime
        greedy: [/--open$/, /--active$/, /--visible$/, /--hidden$/]
      },
    }),

    // ── cssnano (production only) ───────────────────────────────────
    isProd && cssnano({
      preset: ['default', {
        discardComments:  { removeAll: true },
        normalizeWhitespace: true,
        minifyFontValues: true,
        colormin: true,
      }]
    }),

  ].filter(Boolean),
};