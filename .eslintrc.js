/* eslint-disable header/header */
module.exports = {
  "root": true,
  "extends": [
    "standard-flow",
    "standard",
    "standard-react",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "env": {
    "es6": true,
    "commonjs": true,
    "node": true,
    "jasmine": true,
    "jest/globals": true
  },
  "plugins": [
    "react",
    "react-native",
    "flowtype",
    "jest",
    "header",
    "promise"
  ],
  "rules": {
    "no-whitespace-before-property": 1,
    "jest/no-disabled-tests": 0,
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "no-dupe-class-members": 1,
    "react/jsx-curly-brace-presence": 1,
    "react/no-deprecated": 1,
    "react/jsx-closing-bracket-location": 0,
    "dot-notation": 0,
    "react/jsx-handler-names": 0,
    "react/jsx-closing-tag-location": 0,
    "quotes": 0,
    "object-curly-newline": 0,
    "array-bracket-spacing": 0,
    "lines-between-class-members": 1,
    "prefer-const": 0,
    "quote-props": 0,
    "react/no-danger": 2,
    "react/default-props-match-prop-types": 0,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-key": 2,
    "react/no-unsafe": 2,
    "react/destructuring-assignment": 0,
    "react/no-did-update-set-state": 2,
    "react/no-did-mount-set-state": 0,
    "no-prototype-builtins": 0,
    "no-case-declarations": 1,
    "react/no-string-refs": 1,
    "react/display-name": 0,
    "no-var": "warn",
    "import/no-named-default": 0,
    "react/jsx-no-literals": 2,
    "curly": [1, "multi"],
    "react-native/no-color-literals": 1,
    "react/prop-types": [0, { "skipUndeclared": true }],
    "react-native/no-unused-styles": 1,
    "header/header": [2, "line", [" @flow"]],
    "react/no-multi-comp": [1, { "ignoreStateless": true }],
    "flowtype/require-return-type": [2, "always", { "excludeArrowFunctions": true }],
    "flowtype/no-weak-types": [1, { "any": true, "Object": false, "Function": true }],
    "no-console": 2,
    "consistent-return": 2,
    "standard/computed-property-even-spacing": 0,
    "no-unused-vars": 1,
    "no-return-assign": 0,
    "react/no-unused-prop-types": 0,
    "max-len": ["warn", 350],
    "semi": ["error", "never"],
    "import/first": 0,
    "indent": 1,
    "space-infix-ops": 1,
    "no-multi-spaces": 1,
    "spaced-comment": 1,
    "camelcase": 1,
    "no-self-compare": 1,
    "import/no-webpack-loader-syntax": 0,
    "computed-property-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "flowtype/space-after-type-colon": [1, "always"],
    "flowtype/space-before-type-colon": [1, "never"],
    "no-else-return": ["warn", { "allowElseIf": false }],
    "no-nested-ternary": ["warn"],
    "promise/always-return": "error",
    // "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    "promise/no-native": "off",
    "promise/no-nesting": "warn",
    // "promise/no-promise-in-callback": "warn",
    // "promise/no-callback-in-promise": "warn",
    "promise/avoid-new": "off",
    "promise/no-new-statics": "error",
    "promise/no-return-in-finally": "warn",
    "promise/valid-params": "warn",
    "react/jsx-no-bind": [1, { "ignoreRefs": false, "allowArrowFunctions": false, "allowBind": false }],
    "react/sort-comp": [1, {
      "order": [
        "_panResponder",
        "_backgroundPanResponder",
        "onRepeatAnimation",
        "onEndAnimation",
        "WebView",
        "distant",
        "swiper",
        "countryCodes",
        "languageCodes",
        "_value",
        "type-annotations",
        "state",
        "defaultProps",
        "routeName",
        "instance-variables",
        "static-variables",
        "static",
        "SmoothLine",
        "Pie",
        "currencyInfos",
        "variable",
        "lifecycle",
        "getDerivedStateFromProps",
        "componentDidMountOrUpdate",
        "rendering",
        "everything-else"
      ],
      "groups": {
        "static": [
          "statics",
          "static-methods"
        ],
        "rendering": [
          "render",
          "/^render.+$/"
        ]
      }
    }]
  },

  // Map from global var to bool specifying if it can be redefined
  "globals": {
    "element": false,
    "by": false,
    "ErrorUtils": false,
    "React": true,
    "__DEV__": true,
    "__dirname": false,
    "__fbBatchedBridgeConfig": false,
    "cancelAnimationFrame": false,
    "clearImmediate": true,
    "clearInterval": false,
    "clearTimeout": false,
    "console": false,
    "document": false,
    "escape": false,
    "exports": false,
    "fetch": false,
    "global": false,
    "jest": false,
    "Map": true,
    "module": false,
    "navigator": false,
    "process": false,
    "Promise": true,
    "requestAnimationFrame": true,
    "require": false,
    "Set": true,
    "setImmediate": true,
    "setInterval": false,
    "setTimeout": false,
    "window": false,
    "XMLHttpRequest": false,
    "pit": false,
    "device": false
  }
}
