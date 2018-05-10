
import svelte from 'rollup-plugin-svelte';


export default {
    input: './src/main.js',
    plugins: [
        svelte()
    ],
    output: {
        file: './dist/main.js',
        format: 'iife',
        name: 'main'
    }
}
