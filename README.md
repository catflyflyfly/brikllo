# Brikllo

Simple task list app with GraphQL API

- [Brikllo](#brikllo)
  - [Prereqs](#prereqs)
  - [Development](#development)
  - [Test](#test)
  - [Usage](#usage)
  - [License](#license)

## Prereqs

- npm
- docker (with docker-compose)

## Development

To start development server:

```bash
npm run dev
```

This will create a database container. To clean up:

```bash
npm run postdev
```

## Test

Run all tests:

```bash
npm run test
```

Run only unit test:

```bash
npm run test:unit
```

Run only integration test:

```bash
npm run test:integration
```

## Usage

Create a env prod file:

```bash
cp .env.dev .env.prod
```

Run postgres db with:

```bash
docker-compose -f docker-compose/prod.yaml up
```

Build the server with:

```bash
npm run build
```

Start the server with:

```bash
export $(cat env/.env.prod | xargs) && npm run start
```

## License

This project is licensed under the terms of the MIT license.
