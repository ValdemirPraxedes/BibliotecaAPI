import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: { ...globals.browser, ...globals.node  }}},
  {rules: {
    "indent": ["error", 2],               // Indentação com 2 espaços
    "quotes": ["error", "double"],       // Aspas duplas
    "semi": ["error", "always"],         // Sempre usar ponto e vírgula
    "no-trailing-spaces": "error",       // Proíbe espaços no final das linhas
    "eol-last": ["error", "always"],     // Exige linha em branco no final do arquivo
    "comma-dangle": ["error", "never"],  // Proíbe vírgulas finais
    "space-before-function-paren": ["error", "never"] // Sem espaço antes de parênteses em funções
  }},
  pluginJs.configs.recommended
];
