module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  },
  theme: {
    extend: {
      colors: {
        primary: '#45B67D',
        secondary: '#204B6D',
        tertiary: '#FFD60A',
        accent: '#D8F3DC',
      },
      fontFamily: {
        'sans': ['DINRoundOT', 'sans-serif'],
      },
    },
  },
};