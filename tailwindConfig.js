import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config.ts";

const fullConfig = resolveConfig(tailwindConfig);

export const screens = fullConfig.theme.screens;
