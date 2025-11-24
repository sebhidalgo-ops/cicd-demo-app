# CI/CD Demo App

A simple Node.js web application demonstrating continuous integration and continuous deployment (CI/CD) pipeline using Elastic Beanstalk.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

<img width="1912" height="941" alt="image" src="https://github.com/user-attachments/assets/32497eff-db50-4a06-abd2-17fb52ca04a2" />

<img width="1919" height="978" alt="image" src="https://github.com/user-attachments/assets/59a3d9bd-4ee8-4d7d-94ff-3e792fd0402b" />



## Overview

This is a demonstration application built with Node.js and Express that showcases a basic CI/CD pipeline. The application displays a simple "Hello from Elastic Beanstalk CI/CDlK pipeline" message and is configured for automated deployment to AWS Elastic Beanstalk.

## Features

- ✅ Simple Express.js web server
- ✅ Automated CI/CD pipeline configuration
- ✅ AWS Elastic Beanstalk deployment ready
- ✅ Build and test automation
- ✅ Artifact generation for deployment

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Git** (for version control)
- **AWS Account** (for Elastic Beanstalk deployment)
- **AWS CLI** (optional, for manual deployments)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sebhidalgo-ops/cicd-demo-app.git
cd cicd-demo-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install the required packages:
- `http` (Node.js built-in module)

### 3. Verify Installation

```bash
npm test
```

Note: Currently returns "no tests yet" - tests can be added as the project grows.

## Usage

### Running Locally

Start the development server:

```bash
npm start
```

The application will be available at:
```
http://localhost:8080
```

You should see the message:
```
Hello from Elastic Beanstalk CI/CDlK pipeline.</h1>
```

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the server.

## Project Structure

```
cicd-demo-app/
├── app.js                 # Main application file
├── package.json           # Project metadata and dependencies
├── buildspec.yml         # AWS CodeBuild specification
├── artifact/             # Build artifacts directory (generated)
│   └── **/*             # Compiled application files
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

### Key Files

#### `app.js`
Main application file containing the Express server logic:
- Creates an HTTP server
- Listens on port 8080 (or environment PORT)
- Serves a simple HTML response

#### `package.json`
Project configuration file:
```json
{
  "name": "eb-demo",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo 'no tests yet' && exit 0"
  }
}
```

#### `buildspec.yml`
AWS CodeBuild configuration for CI/CD pipeline:
- **Install Phase**: Installs npm dependencies
- **Build Phase**: Runs tests and prepares artifacts
- **Artifacts**: Packages all files for deployment

## CI/CD Pipeline

This project uses AWS CodeBuild and CodePipeline for automated deployments.

### Build Specification

The `buildspec.yml` defines the build process:

```yaml
version: 0.2

phases:
  install:
    commands:
      - echo "Installing dependencies"
      - if [ -f package.json ]; then npm ci || npm install; fi
  
  build:
    commands:
      - echo "Running tests"
      - if [ -f package.json ]; then npm test; fi
      - echo "Preparing artifact"
      - mkdir -p artifact
      - cp -r * artifact/ || true

artifacts:
  files:
    - '**/*'
  base-directory: artifact
```

### Pipeline Stages

1. **Source**: Code is pulled from GitHub repository
2. **Build**: CodeBuild installs dependencies and runs tests
3. **Deploy**: Artifact is deployed to Elastic Beanstalk environment

### Build Process

The build process executes the following steps:

1. **Install Phase**
   - Checks for `package.json`
   - Installs dependencies using `npm ci` (or `npm install` as fallback)

2. **Build Phase**
   - Runs automated tests (if available)
   - Creates `artifact/` directory
   - Copies all application files to artifact directory

3. **Artifact Generation**
   - Packages all files from the artifact directory
   - Creates deployment-ready bundle

## Deployment

### AWS Elastic Beanstalk Deployment

#### Prerequisites
- AWS account with Elastic Beanstalk access
- IAM role with appropriate permissions
- Elastic Beanstalk environment configured

#### Manual Deployment

1. **Create Elastic Beanstalk Application**
   ```bash
   eb init -p node.js your-app-name --region us-east-1
   ```

2. **Create Environment**
   ```bash
   eb create your-environment-name
   ```

3. **Deploy Application**
   ```bash
   eb deploy
   ```

4. **Open Application**
   ```bash
   eb open
   ```

#### Automated Deployment

The application automatically deploys when:
- Code is pushed to the main branch
- Pull requests are merged
- Manual trigger in CodePipeline

### Environment Variables

Configure the following in your Elastic Beanstalk environment:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Application port | 8080 |

## Scripts

Available npm scripts:

| Command | Description |
|---------|-------------|
| `npm start` | Start the application server |
| `npm test` | Run tests (placeholder currently) |

## Development

### Adding Tests

To add tests to the project:

1. Install a testing framework:
   ```bash
   npm install --save-dev jest
   ```

2. Update `package.json`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

3. Create test files in a `__tests__` directory

### Adding Features

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test locally:
   ```bash
   npm start
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```

5. Create a pull request

## Monitoring

### CloudWatch Logs

View application logs in AWS CloudWatch:
1. Navigate to CloudWatch in AWS Console
2. Select **Log groups**
3. Find your Elastic Beanstalk environment logs

### Health Monitoring

Monitor application health in Elastic Beanstalk:
- Environment health dashboard
- Enhanced health reporting
- CloudWatch metrics

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT environment variable or kill process on port 8080 |
| Dependencies not installing | Delete `node_modules/` and `package-lock.json`, run `npm install` |
| Build failing in CodeBuild | Check CloudWatch logs for build errors |
| Application not responding | Verify security groups allow traffic on port 8080 |

### Debug Mode

Run the application with debug output:

```bash
DEBUG=* npm start
```

## Security

### Best Practices

- ✅ Keep dependencies up to date
- ✅ Use environment variables for sensitive data
- ✅ Enable HTTPS in production
- ✅ Implement proper error handling
- ✅ Add authentication for production apps

### Security Scanning

Run security audit:
```bash
npm audit
npm audit fix
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

### Code Style

- Use ES6+ JavaScript features
- Follow Node.js best practices
- Add comments for complex logic
- Keep functions small and focused

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Resources

- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [AWS CodeBuild User Guide](https://docs.aws.amazon.com/codebuild/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)

## Support

For issues, questions, or contributions:
- 📧 Open an issue on GitHub
- 💬 Contact: sebhidalgo-ops
- 📖 Check AWS documentation

---

## Roadmap

Future improvements:
- [ ] Add comprehensive test suite
- [ ] Implement health check endpoint
- [ ] Add Docker support
- [ ] Implement logging middleware
- [ ] Add API documentation
- [ ] Set up monitoring dashboards
- [ ] Implement blue-green deployments

---

**Built with ❤️ using Node.js and AWS**# cicd-demo-app
