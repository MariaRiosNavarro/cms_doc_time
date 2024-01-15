# Docker Container frontend - cms_doc_time - React + Vite + Tailwind + DaisyUI


## Frontend Basic Setup + create Dockerfile

```javascript
npm i react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i -D daisyui@latest
````

### tailwind.config.js

```javascript

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["pastel", "dark", "retro"],
  },
  plugins: [require("daisyui")],
};

```

### Frontend Dockerfile 