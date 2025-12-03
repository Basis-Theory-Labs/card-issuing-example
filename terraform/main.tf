terraform {
  required_providers {
    basistheory = {
      source  = "basis-theory/basistheory"
      version = ">= 3.0.0"
    }
  }
}

variable "BT_MANAGEMENT_API_KEY" {}

provider "basistheory" {
  api_key = var.BT_MANAGEMENT_API_KEY
}

### Backend Application
resource "basistheory_application" "backend_application" {
  name = "Backend Application"
  type = "private"
  permissions = ["token:create", "token:read", "token:delete", "proxy:invoke"]
}

resource "basistheory_application_key" "backend_application_key" {
  application_id = basistheory_application.backend_application.id
}


### Frontend Application
resource "basistheory_application" "frontend_application" {
  name = "Frontend Application"
  type = "public"
  permissions = ["token:create"]
}

resource "basistheory_application_key" "frontend_application_key" {
  application_id = basistheory_application.frontend_application.id
}

## Proxies
resource "basistheory_proxy" "lithic_issuer_proxy" {
  name            = "Lithic Issuer Proxy"
  destination_url = "https://sandbox.lithic.com/v1/cards"
  response_transforms {
    type = "code"
    code = file("./proxies/lithic/issuerResponseTransform.js")
  }
  application_id = basistheory_application.backend_application.id
}

resource "basistheory_proxy" "marqeta_issuer_proxy" {
  name            = "Marqeta Issuer Proxy"
  destination_url = "https://sandbox-api.marqeta.com/v3/cards?show_cvv_number=true&show_pan=true"
  response_transforms {
    type = "code"
    code = file("./proxies/marqeta/issuerResponseTransform.js")
  }
  application_id = basistheory_application.backend_application.id
}
resource "basistheory_proxy" "stripe_issuer_proxy" {
  name            = "Stripe Issuer Proxy"
  destination_url = "https://api.stripe.com/v1/issuing/cards"
  response_transforms {
    type = "code"
    code = file("./proxies/stripe/issuerResponseTransform.js")
  }
  application_id = basistheory_application.backend_application.id
}



### Outputs
output "frontend_application_key" {
  value     = basistheory_application_key.frontend_application_key.key
  sensitive = true
}

output "backend_application_key" {
  value     = basistheory_application_key.backend_application_key.key
  sensitive = true
}

output "lithic_issuer_proxy_key" {
  value     = basistheory_proxy.lithic_issuer_proxy.key
  sensitive = true
}

output "marqeta_issuer_proxy_key" {
  value     = basistheory_proxy.marqeta_issuer_proxy.key
  sensitive = true
}

output "stripe_issuer_proxy_key" {
  value     = basistheory_proxy.stripe_issuer_proxy.key
  sensitive = true
}
