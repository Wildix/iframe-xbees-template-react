export default {
  "*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "yarn lint:fix",
    "prettier --write"
  ]
}
