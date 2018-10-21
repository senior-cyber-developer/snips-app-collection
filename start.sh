#!/bin/bash

echo "Start Snips App Collection"

echo "Checking requirements..."
NODEJS_PKG="nodejs"

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
	printf "Running\n"

	echo "Install and start apps..."
	for d in apps/*/ ; do
		printf "Install app dependencies...\n"
		npm install --prefix $d
		printf "Start app\n"
		npm start --prefix $d &
		printf "done\n\n"
	done
	printf "All apps running\n\n"

	wait
else
	echo "Node.js not found!"
	echo "Install package nodejs first..."
fi
