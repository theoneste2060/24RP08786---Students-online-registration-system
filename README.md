# Student Online Registration System

A microservices-based student registration system with RESTful APIs, containerized with Docker and orchestrated using Kubernetes.

## Project Structure

```
├── backend/             # Main backend service
├── microservice/        # Supporting microservice
├── k8s/                 # Kubernetes configuration files
├── jenkins/            # Jenkins pipeline configuration
├── .github/workflows/  # GitHub Actions CI/CD pipeline
└── docker-compose.yml  # Local development environment setup
```

## Features

- RESTful API for student registration
- Microservices architecture
- Containerized services with Docker
- Kubernetes orchestration
- CI/CD pipeline with Jenkins and GitHub Actions
- Automated testing

## Prerequisites

- Node.js (v14 or higher)
- Docker
- Kubernetes cluster
- Jenkins (for CI/CD)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../microservice && npm install
   ```
3. Start the development environment:
   ```bash
   docker-compose up
   ```

## API Documentation

### Backend Service

#### Student Registration
- POST /api/students/register
- GET /api/students
- GET /api/students/:id
- PUT /api/students/:id
- DELETE /api/students/:id

### Microservice

#### Student Validation
- POST /api/validate
- GET /api/status

## Testing

Run tests:
```bash
npm test
```

## Deployment

The application can be deployed using Kubernetes:
```bash
kubectl apply -f k8s/
```

## License

MIT