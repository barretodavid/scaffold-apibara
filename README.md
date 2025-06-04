# Scaffold with Apibara

Test project to explore how to integrate [Apibara](https://www.apibara.com/) with [Scaffold Stark](https://scaffoldstark.com/) to have an indexer running locally without relying on an API key.

This project is meant to be used with Docker and Cursor or VSCode with the DevContainers extension.

To run it, open the project with Cursor or VSCode and launch it inside the predefined container by going to

```
View -> Command Palette -> Dev Containers: Rebuild and Reopen in Container
```

This unfortunately fails because Apibara is not able to ingest data from the Devnet.

To see the error, go to to the `.devcontainers` folder and run `docker compose up`