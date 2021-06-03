# Azure/DAPR Identity Example

## Blog Posts

- [Kubernetes, DAPR, and Azure Identity Example - Part I](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-i)

- [Kubernetes, DAPR, and Azure Identity Example - Part II](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-ii)

- [Kubernetes, DAPR, and Azure Identity Example - Part III](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-iii)

- [Kubernetes, DAPR, and Azure Identity Example - Part IV](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-iv)

- [Kubernetes, DAPR, and Azure Identity Example - Part V](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-v)

## Configuring and Running the Application Locally

1.  Set up an Azure Active Directory application for the local application to use (see [here](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-iii)). Make sure the local settings in the project are updated.

1.  Set up a domain, `testing.local`, and TLS certificate that points to your machine (see [here](https://dfbaskin.com/posts/k8s-dapr-azure-identity-part-i)).

1.  Ensure that Kubernetes is running on your machine.

1.  Download and install [DAPR](https://docs.dapr.io/getting-started/install-dapr-cli/) and [Helm](https://helm.sh/docs/intro/install/).

1.  Ensure the the build tools are installed:

    - .NET SDK v5
    - NodeJS
    - Docker (for building Kubernetes images)

1.  [Powershell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.1) scripts are provided for initialization. Ensure that the path to the DAPR and Helm executables is included in the PATH.

1.  Initialize DAPR within the Kubernetes cluster:

    ```
    packages/dapr-initialization/initialize-dapr.ps1
    ```

1.  Initialize DAPR state store and pub/sub message broker:

    ```
    packages/dapr-initialization/initialize-dapr-redis.ps1
    ```

1.  Create a Kubernetes namespace for the application:

    ```
    packages/nginx-ingress/create-namespace.ps1
    ```

1.  Install npm packages for the web application:

    ```
    cd packages/browser-frontend
    npm install
    ```

1.  Build the static web site and its image file:

    ```
    packages/browser-frontend/deploy/build-frontend-image.ps1
    ```

1.  Deploy the front-end service to the cluster:

    ```
    packages/browser-frontend/deploy/initialize-frontend.ps1
    ```

1.  Build the users API web site and its image file:

    ```
    packages/users-api/deploy/build-users-api-image.ps1
    ```

1.  Deploy the users API service to the cluster:

    ```
    packages/users-api/deploy/initialize-users-api.ps1
    ```

1.  Deploy the Ingress Controller to the cluster:

    ```
    packages/nginx-ingress/initialize-nginx-ingress.ps1
    ```

Navigate to [https://testing.local:31001/](https://testing.local:31001/).
