#!/bin/bash

export NODE_ENV=development

nohup nodejs ./server.js > ./logs/development.log 2>&1  &

