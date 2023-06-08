#!make
include .env
export $(shell sed 's/=.*//' .env)

CONTAINER_NAME = "air-quality.api"
build:
	docker build -t $(CONTAINER_NAME) .
test:
	docker run -it --env-file ./.env --rm --name $(CONTAINER_NAME) $(CONTAINER_NAME) test 
run:
	docker run -d --env-file ./.env --rm --name $(CONTAINER_NAME) -p 8080:8080 $(CONTAINER_NAME)
stop:
	docker stop $(CONTAINER_NAME)