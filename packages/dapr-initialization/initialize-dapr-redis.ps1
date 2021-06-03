kubectl create ns dapr-redis

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install redis bitnami/redis -n dapr-redis

kubectl apply -f @(Join-Path $PSScriptRoot "redis-state.yaml")
kubectl apply -f @(Join-Path $PSScriptRoot "redis-pubsub.yaml")
