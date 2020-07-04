const colors = {
  white: '#FFF',
  offWhiteBlue: '#f8faff',
  lightRed: '#ffdedb',
  nuetral1: '#EEEEEE',
  nuetral2: '#DEDEDE',
  black: '#000000',
  blue: '#5899DA',
  darkBlue: '#0e67bb',
  darkerBlue: '#04519a',
  linkBlue: '#0A6ED1',
  darkGrey: '#949494',
};

const cardColors = {
  background: colors.white,
};

const ghostButtonColor = {
  text: colors.linkBlue,
  primary: 'transparent',
  border: colors.darkGrey,
  down: colors.nuetral2,
  hover: colors.nuetral1,
};

const buttonColors = {
  ghost: ghostButtonColor,
  primary: colors.blue,
  text: colors.white,
  hover: colors.darkBlue,
  down: colors.darkerBlue,
};

const inputColors = {
  activeBackground: colors.offWhiteBlue,
};

const formColors = {
  focus: colors.blue,
  border: colors.darkGrey,
  text: colors.black,
  placeholder: colors.darkGrey,
  input: inputColors,
};

export const colorConstant = {
  button: buttonColors,
  colors,
  card: cardColors,
  form: formColors,
};
