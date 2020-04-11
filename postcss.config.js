const purgecss = require('@fullhuman/postcss-purgecss');
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // purgecss({
        //     content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
        //     defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        //   }),
        // require('cssnano')({
        //     preset: 'default',
        // }),
    ]
};