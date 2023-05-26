gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
tests:	
	npx jest
test-coverage:
	npx jest --coverage
	