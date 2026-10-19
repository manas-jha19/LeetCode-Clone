import clerkNext from "@clerk/eslint-plugin/next";

export default [
  {
    plugins: { "@clerk/next": clerkNext },
    rules: {
      "@clerk/next/require-auth-protection": [
        "error",
        {
          protected: ["src/app/profile/**", "src/app/**"],
          public: ["src/app/sign-in/**", "src/app/sign-up/**"],
          resources: {
            routeHandlers: true,
            serverFunctions: true,
            serverComponentEntrypoints: false,
          },
        },
      ],
    },
  },
];
