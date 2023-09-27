upInfra:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml -p review-system up -d postgres rabbitmq

downInfra:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml down
