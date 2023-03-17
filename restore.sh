#!/bin/bash
set -e

pg_restore -U "$POSTGRES_USER" -C -d "$POSTGRES_DB" -Ft /db_dump.tar
