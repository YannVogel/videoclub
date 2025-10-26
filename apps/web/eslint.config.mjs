import js from "@eslint/js"
import ts from "typescript-eslint"

export default [
    { ignores: ["**/dist/**", "**/.next/**", "**/styled-system/**"] },
    ...ts.config(
        js.configs.recommended,
        ts.configs.recommendedTypeChecked,
        {
            languageOptions: {
                parserOptions: {
                    project: ["./apps/*/tsconfig.json"],
                    tsconfigRootDir: import.meta.dirname,
                },
            },
            rules: {
                "no-console": "warn",
            },
        },
    ),
]
