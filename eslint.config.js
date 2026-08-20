// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      // The classic Animated API (useRef(new Animated.Value(...)).current + .interpolate()
      // during render) is the documented, correct way to derive animated styles, but this
      // rule can't distinguish it from ref misuse. Downgraded until scroll-driven animations
      // migrate to Reanimated's useAnimatedScrollHandler.
      'react-hooks/refs': 'warn',
      // Flags setLoading(true) as the first line of a fetch-on-mount effect, which is this
      // codebase's standard data-fetching pattern (see CLAUDE.md). Downgraded until the
      // fetch hooks are restructured.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]);
