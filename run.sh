#!/bin/bash

sudo NODE_ENV=prod nohup nodejs ./server.js > ./logs/production.log 2>&1  &

