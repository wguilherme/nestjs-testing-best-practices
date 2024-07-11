SHELL := /bin/bash

.PHONY: up
up:
	@docker compose up -d

.PHONY: down
down:
	@docker compose down

.PHONY: stop
stop:
	@docker compose stop

.PHONY: configure-cluster
configure-cluster:
	@echo "Configurando o nó rabbitmq-node1..."
	@docker exec -it rabbitmq-node1 rabbitmqctl stop_app
	@docker exec -it rabbitmq-node1 rabbitmqctl reset
	@docker exec -it rabbitmq-node1 rabbitmqctl start_app

	@echo "Configurando o nó rabbitmq-node2..."
	@docker exec -it rabbitmq-node2 rabbitmqctl stop_app
	@docker exec -it rabbitmq-node2 rabbitmqctl reset
	@docker exec -it rabbitmq-node2 rabbitmqctl join_cluster rabbit@rabbitmq-node1
	@docker exec -it rabbitmq-node2 rabbitmqctl start_app

	@echo "Configurando o nó rabbitmq-node3..."
	@docker exec -it rabbitmq-node3 rabbitmqctl stop_app
	@docker exec -it rabbitmq-node3 rabbitmqctl reset
	@docker exec -it rabbitmq-node3 rabbitmqctl join_cluster rabbit@rabbitmq-node1
	@docker exec -it rabbitmq-node3 rabbitmqctl start_app

	@echo "Cluster configurado com sucesso!"


.PHONY: check-cluster
check-cluster:
	@echo "Verificando o status do cluster..."
	@docker exec -it rabbitmq-node1 rabbitmqctl cluster_status