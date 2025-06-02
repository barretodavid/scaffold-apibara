FROM node:slim

# Update current packages
RUN apt update && apt upgrade -y

# Install new packages
RUN apt install -y git curl zsh build-essential vim bash

# Clean up after install to reduce image size
RUN apt clean && rm -rf /var/lib/apt/lists/*

# Update npm and install corepack
RUN npm install -g npm corepack && \
    chown -R node:node /usr/local/lib/node_modules

# Switch to non-root user
USER node
ENV HOME=/home/node
ENV PATH=${PATH}:${HOME}/.local/bin

# Activate Yarn
RUN corepack prepare yarn@stable --activate

# Install oh-my-zsh
RUN curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh -s

# Install Starkli
RUN curl --proto '=https' --tlsv1.2 -sSf https://get.starkli.sh | sh -s -- -v 0.4.1
ENV PATH=${PATH}:${HOME}/.starkli/bin

# Install Scarb
RUN curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh -s -- -v 2.11.4

# Install Starknet Foundry
RUN curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh -s
RUN snfoundryup -v 0.41.0

WORKDIR /app 