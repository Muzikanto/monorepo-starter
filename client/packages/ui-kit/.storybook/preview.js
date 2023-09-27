import { addDecorator } from '@storybook/react';

const themeDecorator = (storyFn) => (
  <div
    style={{
      // background: appTheme.palette.background.default,
      width: '100%',
      height: 'calc(100vh - 32px)',
      padding: 16,
    }}
  >
    {storyFn()}
  </div>
);

addDecorator(themeDecorator);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
