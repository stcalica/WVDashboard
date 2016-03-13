#!/bin/bash

set -x
/etc/init.d/postgresql start
psql -f create_db.sql
