# Debug workflows locally

## Prerequisites

- (1) [Github CLI](https://github.com/cli/cli)

Verify that Github CLI is installed and available via `gh --version`. You need to authorize yourself via `gh login`. Once authorised, verify that `gh auth token` returns a value. You'll need that token to authorize yourself through `act`.

- (2) [Act](https://github.com/nektos/act)

Verify that act is installed and available via `act --version`. There are [various ways](https://nektosact.com/installation/index.html) to install it via a tool, downloading the artifact that matches your OS and adding it to the path is sufficient however.

- (3) [Docker](https://www.docker.com/products/docker-desktop/)

Verify that docker is installed and available via `docker --version`.  Act uses docker containers to containerize your workflows. You'll need to start the `Docker Desktop` application to guarantee that the docker engine is running.

## Debug a workflow

The tool `act` only works on workflows that have the `push` event. Add the `push` event to the workflow that you want to test if it is missing.

```bash
    #   # Non-standard image that has `pwsh` installed            # Workflow to debug               # Token to authorize
    act -P 'ubuntu-latest=ghcr.io/catthehacker/ubuntu:pwsh-22.04' -W '.github/workflows/build.yaml' -s GITHUB_TOKEN="$(gh auth token)"

    # for repeated tests                                                                                                               # do not pull (-p) the docker image each time
    act -P 'ubuntu-latest=ghcr.io/catthehacker/ubuntu:pwsh-22.04' -W '.github/workflows/build.yaml' -s GITHUB_TOKEN="$(gh auth token)" -p=false
```

Useful references:

- [Documentation about act](https://nektosact.com/introduction.html)
- [List of all official docker images](https://github.com/catthehacker/docker_images)
