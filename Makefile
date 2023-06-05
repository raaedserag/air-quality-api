#!make
include .env
export $(shell sed 's/=.*//' .env)

CONTAINER_NAME = "air-quality-api"
dev-container:
	docker compose up --build -d

dev-container-stop:
	docker compose down