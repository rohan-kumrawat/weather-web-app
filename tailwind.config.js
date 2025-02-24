module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#1E3A8A",
        "weather-secondary": "#BFDBFE"
      },
      backgroundImage: {
        "rain-pattern": "url('/src/assets/rain-bg.jpg')"
      }
    },
  },
  plugins: [],
}