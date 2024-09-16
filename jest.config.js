// jest.config.js
module.exports = {
  testEnvironment: "jsdom", // Simula un entorno de navegador para las pruebas
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Añade matchers adicionales
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Usa ts-jest para transformar archivos .ts y .tsx
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  // Opcional: configura la raíz de tus pruebas si es necesario
  roots: ["<rootDir>/src"],
};
