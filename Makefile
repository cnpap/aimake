COMPOSER ?= composer
NPM ?= npm
PINT ?= ./vendor/bin/pint

.PHONY: format format-check dev dev-ssr ide-helper

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

ide-helper:
	php artisan ide-helper:generate
	php artisan ide-helper:models --write --smart-reset
	php artisan ide-helper:meta

