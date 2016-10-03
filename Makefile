test: karma

karma:
		@./node_modules/.bin/karma start .karma.js --single-run --reporters progress --log-level disable

karma-watch:
		./node_modules/.bin/karma start .karma.js --reporters progress --log-level disable

lint:
		./node_modules/.bin/eslint src/
