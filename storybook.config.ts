import type { StorybookConfig } from "@storybook/react-webpack5";
import "./src/app/globals.css";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // 필요 시 Webpack 추가 설정 가능
    return config;
  },
  // 글로벌 파라미터
  docs: {
    // @ts-ignore
    autodocs: true,
  },
  // 여기서 글로벌 파라미터 지정 가능
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default config;
