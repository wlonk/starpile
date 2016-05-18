#!/bin/bash

set -e

echo "Starting webpack and server."
echo "To exit, hit ^C until you're satisfied."

if hash fswatch 2>/dev/null; then
    fswatch -o js | xargs -n1 -I{} webpack &
else
    echo "fswatch required to listen for changes."
    echo "Running in a severely degraded mode."
    echo "Will webpack once. Good luck."
    webpack
fi

python -m SimpleHTTPServer 8000
