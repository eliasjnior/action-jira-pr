# Jira PR GitHub Action

A GitHub Action that automatically adds Jira ticket references to your Pull Request title and description.

## Features

- Automatically detects Jira ticket references in your branch name
- Optionally adds Jira ticket to PR title
- Optionally adds Jira ticket to PR description
- Supports multiple Jira project keys
- Easy to configure and use

## Usage

Add the following workflow to your repository (`.github/workflows/jira-pr.yml`):

```yaml
name: Jira PR

on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  jira-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: eliasjnior/action-jira-pr@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          jira-account: "your-jira-account"
          jira-project-keys: "PROJ1,PROJ2"
          should-add-jira-ticket-to-title: "true"
          should-add-jira-ticket-to-description: "true"
```

## Inputs

| Input                                   | Description                                          | Required | Default                       |
| --------------------------------------- | ---------------------------------------------------- | -------- | ----------------------------- |
| `github-token`                          | The token to use to authenticate with GitHub         | No       | `${{ secrets.GITHUB_TOKEN }}` |
| `jira-account`                          | The Jira account to use                              | Yes      | -                             |
| `jira-project-keys`                     | The Jira project keys to use (comma separated)       | Yes      | -                             |
| `should-add-jira-ticket-to-title`       | Whether to add the Jira ticket to the PR title       | No       | `true`                        |
| `should-add-jira-ticket-to-description` | Whether to add the Jira ticket to the PR description | No       | `true`                        |

## Development

This project is built with TypeScript and uses pnpm as the package manager.

### Prerequisites

- Node.js 20 or later
- pnpm 10.10.0 or later

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Scripts

- `pnpm build` - Build the project
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode

## License

ISC
