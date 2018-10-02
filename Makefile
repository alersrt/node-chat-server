###############################
# Common defaults/definitions #
###############################

comma := ,

# Checks two given strings for equality.
eq = $(if $(or $(1),$(2)),$(and $(findstring $(1),$(2)),\
                                $(findstring $(2),$(1))),1)




###############
# Git Section #
###############

MAINLINE_BRANCH := dev
CURRENT_BRANCH := $(shell git branch | grep \* | cut -d ' ' -f2)

# Squash changes of the current Git branch onto another Git branch.
#
# WARNING: You must merge `onto` branch in the current branch before squash!
#
# Usage:
#	make squash [onto=] [del=(no|yes)]

onto ?= $(MAINLINE_BRANCH)
del ?= no
upstream ?= origin

squash:
ifeq ($(CURRENT_BRANCH),$(onto))
	@echo "--> Current branch is '$(onto)' already" && false
endif
	git checkout $(onto)
	git branch -m $(CURRENT_BRANCH) orig-$(CURRENT_BRANCH)
	git checkout -b $(CURRENT_BRANCH)
	git branch --set-upstream-to $(upstream)/$(CURRENT_BRANCH)
	git merge --squash orig-$(CURRENT_BRANCH)
ifeq ($(del),yes)
	git branch -d orig-$(CURRENT_BRANCH)
endif




###########
# Aliases #
###########

start: npm.start

test: npm.test

down: docker.down

up: docker.up




##################
# Node.js commands #
##################

# Maven command.
#
# Usage:
#	make mvn [task=]
task ?=
node.image = alpine

npm:
	docker run \
		--rm \
		--name node-worker \
		-v $(PWD):/app \
		-w /app \
		node:$(node.image) \
		npm $(task)

# start command
npm.start:
	@make npm task='start'

# test command
npm.test:
	@make npm task='test'




###################
# Docker commands #
###################

# Stop project in Docker Compose development environment
# and remove all related containers.
#
# Usage:
#	make docker.down

docker.down:
	docker-compose down --rmi=local -v

# Run Docker Compose development environment.
#
# Usage:
#	make docker.up [rebuild=(yes|no)]
#	               [background=(no|yes)]

rebuild ?= yes
background ?= no

docker.up: docker.down
	docker-compose up \
		$(if $(call eq,$(rebuild),no),,--build) \
		$(if $(call eq,$(background),yes),-d,--abort-on-container-exit)




.PHONY: squash \
		start test up down \
		npm npm.test npm.start \
		docker.up docker.down
