<center> <h1>Scissor</h1> </center>

Scissor is a simple tool that makes URLs as short as possible.

## Technologies used

- [Nestjs](https://nestjs.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [ShadcnUI](https://ui.shadcn.com/)

<h2> Available Endpoints </h2>

- GET /api/v1/{short}
- GET /api/v1/links
- POST /api/v1/links

## Documentation

<p>Swagger documentaton for api can be found on the <b>/docs</b> route of the endpoint.</P>

## Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

### 1. Clone the Repository

```sh
git clone https://github.com/Adewale66/scissors.git
cd [app-name]
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Setup env variables

```sh
cat .env.example > .env
```

### 4. Start application

```sh
npm run start:dev
```

### 5. Runinng tests

```sh
npm run test
```

## Author

[Adewale Kujore](https://github.com/Adewale66)
