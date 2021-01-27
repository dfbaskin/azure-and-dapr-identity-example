kubectl create ns dapr-redis
helm install redis bitnami/redis -n dapr-redis
kubectl apply -f @(Join-Path $PSScriptRoot "redis-state.yaml")
kubectl apply -f @(Join-Path $PSScriptRoot "redis-pubsub.yaml")
