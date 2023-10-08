# infrastructure

upInfra:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml -p review-system up -d postgres rabbitmq redis

upInfraAnalytics:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml -p review-system up -d prometheus pushgateway grafana elasticsearch alertmanager

downInfra:
	docker-compose -f ./deploy/docker-compose.infrastructure.yml down

