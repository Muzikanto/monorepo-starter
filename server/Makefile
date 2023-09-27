CON_GATEWAY	    := gateway
VERSION         ?= latest
BRANCH		    ?= production
REGISTRY	    := registry.gitlab.com/muzikanto/review-system

# dev

watchService:
	npm run watch:service

watchWorker:
	npm run watch:worker

build:
	docker \
		build \
		-f Dockerfile \
		--tag=${REGISTRY}/${CON_GATEWAY}:${BRANCH} \
		--tag=${REGISTRY}/${CON_GATEWAY}:${VERSION} \
		.

upload:
	docker push ${REGISTRY}/${CON_GATEWAY}:${BRANCH}
	docker push ${REGISTRY}/${CON_GATEWAY}:${VERSION}

#test: testServer testComponents testWidgets

push: build upload
