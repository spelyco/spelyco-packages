@spelyco/react-core
===================

Core React components and utilities with seamless Strapi integration.

[![npm version](https://img.shields.io/npm/v/@spelyco/react-core.svg?style=flat)](https://www.npmjs.com/package/@spelyco/react-core)

⚡️ Quick Install
----------------

```npm
npm install @spelyco/react-core
```

```yarn
yarn add @spelyco/react-core
```

🎯 Features
-----------

### Strapi Integration

* **useStrapiFind**: Fetch multiple entries with pagination and filtering
* **useStrapiFindOne**: Fetch single entries efficiently
* **useStrapiCreate**: Create new entries with validation
* **useStrapiUpdate**: Update existing entries
* **useStrapiDelete**: Delete entries safely

### UI Components

* Mantine UI integration
* Responsive and accessible components
* Customizable theming

📋 Requirements
---------------

```json
{
  "@mantine/core": "^7.15.3",
  "@mantine/dates": "^7.15.3",
  "@mantine/hooks": "^7.15.3",
  "@tabler/icons-react": "^7.15.3",
  "@tanstack/react-query": "*",
  "axios": "*",
  "clsx": "*",
  "dayjs": "*",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "zustand": ">=5.0.0"
}
```

💡 Usage
--------

### Strapi Hooks

```ts
import { useStrapiFind, useStrapiCreate } from '@spelyco/react-core'

// Fetch posts with pagination
function PostsList() {
  const { data, isLoading } = useStrapiFind('posts', {
    pagination: { page: 1, pageSize: 10 },
    sort: \['createdAt:desc'\]
  })

  if (isLoading) return
  return (
      {data?.data.map(post => (
        <div>{post.attributes.title}</div>
      ))}
  )
}

// Create a new post
function CreatePost() {
  const { mutate, isLoading } = useStrapiCreate('posts')

  const handleSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log('Post created successfully!')
      }
    })
  }

  return (
      {/\* Your form fields \*/}
  )
}
```

🛠️ Development
---------------

\# Install dependencies
yarn install

# Build package

yarn build

# Development mode

yarn dev

📦 Publishing
-------------

Package publishing is handled through GitHub Actions. See the root README for details.

📄 License
----------

MIT License - Create amazing things! 🚀
