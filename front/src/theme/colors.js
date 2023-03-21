const colors = {
  primary: '#0084E7',
  primaryLighter: '#2897ec',
  primaryLightest: '#4db2ff',
  primaryWhitish: '#bbe0fd',
  primaryDarker: '#0076d1',
  primaryDarkest: '#016abb',
  primaryText: '#fff',
  secondary: '#FFE801',
  secondaryLightest: '#fffbd7',
  secondaryText: '#000',
};

const colorsString = `
:root {
  --color-primary: ${colors.primary};
  --color-primaryLighter: ${colors.primaryLighter};
  --color-primaryLightest: ${colors.primaryLightest};
  --color-primaryWhitish: ${colors.primaryWhitish};
  --color-primaryDarker: ${colors.primaryDarker};
  --color-primaryDarkest: ${colors.primaryDarkest};
  --color-secondary: ${colors.secondary};
  --color-secondaryLightest: ${colors.secondaryLightest};
}
`;

export { colors, colorsString };
