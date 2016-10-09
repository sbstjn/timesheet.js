test: karma

karma:
		@./node_modules/.bin/karma start .karma.js --single-run --reporters progress --log-level disable

cover:
		@./node_modules/.bin/karma start .karma.js --single-run

karma-watch:
		./node_modules/.bin/karma start .karma.js --reporters progress --log-level disable

lint:
		./node_modules/.bin/eslint src/

build:
		./node_modules/.bin/browserify src/main.js -o dist/timesheet.js
		./node_modules/.bin/uglifyjs --compress -- dist/timesheet.js > dist/timesheet.min.js

publish: build
		cp -r dist docs/assets/

shasum:
		@shasum -a256 dist/*

run:
		cd docs/ && bundle exec jekyll serve
