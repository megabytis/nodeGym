# What Problem Does Docker Even Solve?

Before Docker:

- our code works on our laptop
- It crashes on someone else’s laptop
- It works on Vercel
- It breaks on Render or Railway
- Dependency versions mismatch
- Operating systems mismatch
- Node version mismatch
- Missing libraries
- “But it worked for me, bro 😭”

Docker fixes ALL of this.

### Docker = a **mini computer** that runs **inside our real computer**.

It contains:

- Node.js
- npm
- our backend code
- environment config
- OS layer
- dependencies

Everything bundled into ONE package.

This package works **exactly the same** anywhere:

- Windows
- Linux
- Mac
- Cloud
- our friend’s laptop
- Production server
- CI/CD pipeline

---

# Docker Image vs Docker Container

Imagine:

### **Image = Recipe**

A blueprint for how our backend should look.

Example:

- “Node.js backend image”
- “MongoDB image”
- “Redis image”

we cannot run an image directly.

---

### **Container = Cooked Food (Running instance)**

A container is an instance of the image.

Example:

- “ShopNexus backend running”
- “MongoDB database running”

we can run many containers from one image.

---

# What is a Dockerfile?

It's a list of **instructions** for Docker.

Think of a Dockerfile like this:

**“Docker, build me a mini-computer like this…”**

Each line is a step.

---

# Understanding Dockerfile Commands

Here are all the commands we saw…

---

## `FROM`

```
FROM node:18-alpine
```

Meaning:

> “Start my mini-computer using Node.js 18 installed on Alpine Linux.”

This is the **base OS** for our container.

---

## `WORKDIR`

```
WORKDIR /app
```

Meaning:

> “Inside the container, work inside the folder named /app.”

Equivalent to:

```
cd /app
```

---

## `COPY`

```
COPY package.json .
```

Meaning:

> “Copy files from my computer → inside the container.”

Example:
we want to send our backend code into the mini-computer.

---

## `RUN`

```
RUN npm install
```

Meaning:

> “Inside the mini-computer, run a shell command.”

Anything we can do in terminal, RUN can do:

- `RUN npm install`
- `RUN apt-get update`
- `RUN npx prisma generate`

---

## `EXPOSE`

```
EXPOSE 4000
```

Meaning:

> “My backend will run on port 4000 inside the container.”

We’re just declaring the port.

---

## `CMD`

```
CMD ["node", "server.js"]
```

Meaning:

> “When this mini-computer starts, run this command.”

CMD = the start command of our backend.

---

# Docker Builds in Layers

Each line in Dockerfile creates a **layer**:

```
FROM node:18        ← 1 layer
WORKDIR /app        ← 2 layer
COPY package.json   ← 3 layer
RUN npm install     ← 4 layer
COPY . .            ← 5 layer
CMD [...]           ← final
```

If we change only our JS code (not package.json):

→ Docker **reuses cache**
→ No need to reinstall node_modules
→ Builds go from 1 minute → 2 seconds

This is why Docker is GOATED.

---

# What Docker Compose Is ?

Docker Compose =

> “Run multiple mini-computers together.”

Like a squad:

- Node backend
- MongoDB
- Redis
- Worker

All started with **1 command**:

```
docker compose up
```

This is the real power of Docker.

---

# Why Backend Developers MUST Learn Docker

Because:

- No company deploys using `node server.js`
- DevOps, backend, cloud infra → all use Docker
- Modern deploy platforms run ONLY containers
- APIs run inside containers
- Workers run inside containers
- Databases run inside containers

MERN developer with Docker = MUCH more hireable.
