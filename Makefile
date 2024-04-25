.PHONY: up down stop

SHELL := /bin/bash

up:
	@docker compose up -d

down:
	@docker compose down

stop:
	@docker compose stop
