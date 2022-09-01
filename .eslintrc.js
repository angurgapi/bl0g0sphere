module.exports = {
	root: true,

	env: {
		browser: true,
		node: true,
		jest: true
	},

	parserOptions: {
		parser: 'babel-eslint'
	},

	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],

	plugins: ['prettier'],

	rules: {
		'prettier/prettier': ['error', {
				semi: false,
				arrowParens: 'always',
				singleQuote: true,
				trailingComma: 'none',
				endOfLine: 'auto',
				tabWidth: 2,
				useTabs: false
			}],

		'vue/attributes-order': ['error', {
				order: [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'GLOBAL',
					['UNIQUE', 'SLOT'],
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'OTHER_ATTR',
					'EVENTS',
					'CONTENT'
				],
				alphabetical: false
			}],

		'vue/order-in-components': ['error', {
				order: [
					'el',
					'name',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					['provide', 'inject'],
					'ROUTER_GUARDS',
					'layout',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'emits',
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'computed',
					'watch',
					'watchQuery',
					'methods',
					'LIFECYCLE_HOOKS',
					['template', 'render'],
					'renderError'
				]
			}],

		'vue/no-unused-components': 0,
		'vue/return-in-computed-property': 0,

		'no-unused-vars': 0,
		'no-prototype-builtins': 0,
		'no-useless-escape': 0,
		'no-case-declarations': 0,
		'no-undef': 0,
		'comma-dangle': ['error', 'never']
	}
}
