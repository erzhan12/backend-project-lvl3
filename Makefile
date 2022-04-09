install: # install
	npm ci

page-loader: # 
	node bin/page-loader.js

publish: # publish the package
	npm publish --dry-run

lint:  # linter checks
	npx eslint .

test:
	npm test 

test-coverage:
	npm test -- --coverage --coverageProvider=v8