#!/bin/bash

export SITE_HOME=/home/csr/website

sudo NODE_ENV=development forever -l $SITE_HOME/logs/forever.log -o $SITE_HOME/logs//out.log -e $SITE_HOME/logs/err.log $SITE_HOME//server.js & 

