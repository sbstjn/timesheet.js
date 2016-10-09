test: karma

karma:
		@./node_modules/.bin/karma start .karma.js --single-run --log-level disable

karma-chrome:
	@./node_modules/.bin/karma start .karma.js --browsers Chrome --log-level disable

cover:
		@rm -rf .cover
		@./node_modules/.bin/karma start .karma.coverage.js

lint:
		./node_modules/.bin/eslint src/

compile:
		@./node_modules/.bin/browserify src/main.js -o dist/timesheet.js
		@./node_modules/.bin/uglifyjs --compress -- dist/timesheet.js > dist/timesheet.min.js

build: compile shasum

publish: build
		cp -r dist docs/assets/

shasum:
		@shasum -a256 dist/*

run:
		cd docs/ && bundle exec jekyll serve
