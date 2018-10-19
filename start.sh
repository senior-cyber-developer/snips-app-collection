#!/bin/bash

echo "Start Snips App Collection"

echo "Checking requirements..."
NODEJS_PKG="nodejs"

#if [ $CHECK_PKG -eq 0 ]; then
if dpkg --get-selections | grep -q "^$NODEJS_PKG[[:space:]]*install$" >/dev/null; then
	echo "Proceed"

	echo "Install snips-dashboard dependencies..."	
	npm install --prefix ./snips-dashboard/
	printf "done\n\n"

	echo "Install intent-listener dependencies..."
	npm install --prefix ./intent-listener/
	printf "done\n\n"

	echo "Start dashboard..."
	npm start --prefix ./snips-dashboard/ &
	printf "Running\n"

	echo "Start intent-listener..."
	npm start --prefix ./intent-listener/ &
	echo "Running"

	wait
else
	echo "Node.js not found!"
	echo "Install package nodejs first..."
fi
