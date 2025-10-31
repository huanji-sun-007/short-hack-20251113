#!/bin/bash
set -e
azd provision
azd env get-values > .env
