module.exports = function (api) {
  api.cache(true);
  const isTestEnv = process.env.NODE_ENV === "test";
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          lazyImports: true,
          native: {
            // Disable ESM -> CJS compilation because Metro takes care of it.
            // However, we need it in Jest tests since those run without Metro.
            disableImportExportTransform: !isTestEnv,
          },
        },
      ],
    ],
    plugins: [
      ["babel-plugin-react-compiler", { target: "18" }],

      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@": "./",
          },
        },
      ],
    ],
  };
};
