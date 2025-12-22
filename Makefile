COMPOSER ?= composer
NPM ?= npm
PINT ?= ./vendor/bin/pint

.PHONY: format format-check dev dev-ssr

format:
	$(PINT) --dirty
	$(NPM) run format

format-check:
	$(PINT) --test
	$(NPM) run format:check

dev:
	$(COMPOSER) run dev

dev-ssr:
	$(COMPOSER) run dev:ssr

