#!/bin/bash

IP="127.0.0.1"
echo "Run this test from another host. Change IP to the host where server.js is running, then comment this line out."; exit 1

while true; do
  OUTPUT=$(curl -0 -kv https://$IP:18001/ 2>&1)
  if $(echo "$OUTPUT"|grep -q remaining); then
    echo "$OUTPUT"
  else
    echo OK
  fi
done
