#!/bin/bash

pip install -U requirements.txt

celery -A tasks worker
