# Table of Contents
- [Docker Compose](#docker-compose)
- [Where to get Docker Compose](#where-to-get-docker-compose)
    + [Windows and macOS](#windows-and-macos)
    + [Linux](#linux)
- [Quick Start](#quick-start)
- [Docker Troubleshooting](#docker-troubleshooting)

# Docker Compose

Docker Compose is a tool for running multi-container applications on Docker
defined using the [Compose file format](https://compose-spec.io).
A Compose file is used to define how one or more containers that make up
your application are configured.
Once you have a Compose file, you can create and start your application with a
single command: `docker compose up`.

# Where to get Docker Compose

### Windows and macOS

Docker Compose is included in
[Docker Desktop](https://www.docker.com/products/docker-desktop)
for Windows and macOS.

### Linux

You can download Docker Compose binaries from the
[release page](https://github.com/docker/compose/releases) on this repository.

Rename the relevant binary for your OS to `docker-compose` and copy it to `$HOME/.docker/cli-plugins`

Or copy it into one of these folders to install it system-wide:

* `/usr/local/lib/docker/cli-plugins` OR `/usr/local/libexec/docker/cli-plugins`
* `/usr/lib/docker/cli-plugins` OR `/usr/libexec/docker/cli-plugins`

(might require making the downloaded file executable with `chmod +x`)


#  Docker or Local quick Start

Using Docker Compose is a three-step process:

1. Define your app's environment `.env.example` file in this directory to .env (which will be ignored by Git):

    ```bash
    cp .env.example .env
    ```

2. Then set each required variable on `.env`:

   - `PORT` port of backend application (default is 80)
   - `ETHERSCAN_API_KEY` api key to etherscan
   - `MONGO_URL` connect url to mongoDB
   - `BLOCK_COUNT_ON_INIT` count of blocks that load on init app if database is empty
   - `SLEEP_TIME_ON_LOAD_BLOCK` time of sleep between load blocks on init
   - `CORS_DOMAINS` whitelisted ip addresses

3. Lastly, run `docker compose up` if you want to start app in Docker or `npm start` if local

# Docker Troubleshooting

1. If the new functionality did not appear after starting docker, try the following command

   ```bash
    docker system prune -a
    ```
      ```bash
    docker volume prune 
    ```
      ```bash
    docker-compose up --build
    ```
