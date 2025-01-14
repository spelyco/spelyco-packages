Spelyco Packages
================

A collection of powerful, flexible, and developer-friendly packages for React applications.

 [![npm version](https://img.shields.io/npm/v/@spelyco/react-core.svg?style=flat)](https://www.npmjs.com/package/@spelyco/react-core)[![GitHub issues](https://img.shields.io/github/issues/spelyco/spelyco-packages)](https://github.com/spelyco/spelyco-packages/issues)[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

🚀 About
--------

Spelyco Packages is a collection of libraries designed to accelerate React application development. Our packages provide everything you need, from core utilities to advanced integrations, making development not just efficient but enjoyable.

📦 Packages
-----------

* **[@spelyco/react-core](packages/react-core/README.md)**: Core React components and utilities with Strapi integration
  * Strapi hooks for data management
  * Mantine UI integration
  * React Query powered data fetching
  * Type-safe components and hooks

🛠️ Development
---------------

### Prerequisites

* Node.js >= 18
* Yarn >= 4.6.0

### Setup

\# Install dependencies
yarn install

# Build all packages

yarn workspaces foreach run build

📝 Publishing
-------------

We use GitHub Actions for automated package publishing:

### Latest Version

1. Update version in package.json
2. Go to GitHub Actions
3. Select "Publish Package (Latest)"
4. Choose the package
5. Run workflow

### Beta Version

1. Keep current version in package.json
2. Go to GitHub Actions
3. Select "Publish Package (Beta)"
4. Choose the package
5. Run workflow

🤝 Contributing
---------------

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

📄 License
----------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
