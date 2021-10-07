up-app:
	docker-compose up -d --force-recreate app

up-backend:
	docker-compose up -d --force-recreate backend

up: up-app up-backend

logs:
	docker-compose logs -f

install-app:
	docker-compose run --rm app "npm install"

install-backend:
	docker-compose run --rm backend "npm install"

install: install-app install-backend

into-app:
	docker-compose exec app bash

into-backend:
	docker-compose 	exec backend bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .