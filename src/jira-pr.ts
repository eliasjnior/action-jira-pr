import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

const INPUT_GITHUB_TOKEN = "github-token";
const INPUT_JIRA_ACCOUNT = "jira-account";
const INPUT_SHOULD_ADD_JIRA_TICKET_TO_TITLE = "should-add-jira-ticket-to-title";
const INPUT_SHOULD_ADD_JIRA_TICKET_TO_DESCRIPTION =
  "should-add-jira-ticket-to-description";
const INPUT_JIRA_PROJECT_KEYS = "jira-project-keys";

import {
  isEmptyObject,
  parseBranchJiraTicket,
  parseDescriptionJiraTicket,
  parseTitleJiraTicket,
} from "./helpers";
import { jiraDescriptionTicketRegex, jiraTitleTicketRegex } from "./constants";
import { Context } from "@actions/github/lib/context";

type Updates = Partial<
  Parameters<ReturnType<typeof getOctokit>["rest"]["pulls"]["update"]>[0]
>;

export const jiraPr = async (context: Context) => {
  if (!context.payload.pull_request) {
    return;
  }

  const jiraAccount = core.getInput(INPUT_JIRA_ACCOUNT, { required: true });
  const shouldAddJiraTicketToTitle = core.getBooleanInput(
    INPUT_SHOULD_ADD_JIRA_TICKET_TO_TITLE,
    {
      required: false,
    }
  );
  const shouldAddJiraTicketToDescription = core.getBooleanInput(
    INPUT_SHOULD_ADD_JIRA_TICKET_TO_DESCRIPTION,
    {
      required: false,
    }
  );

  const jiraProjectKeys = core.getInput(INPUT_JIRA_PROJECT_KEYS, {
    required: true,
  });

  const jiraProjectKeysArray = jiraProjectKeys
    .split(",")
    .map((key) => key.trim());

  const parsedBranchName = parseBranchJiraTicket(
    context.payload.pull_request.head.ref,
    jiraProjectKeysArray
  );

  // If the branch name does not match the Jira ticket regex, we should not add the Jira ticket to the PR.
  if (!parsedBranchName) {
    return;
  }

  const { projectKey, ticketNumber } = parsedBranchName;
  const jiraTicketUrl = `https://${jiraAccount}.atlassian.net/browse/${projectKey}-${ticketNumber}`;

  const updates: Updates = {};

  if (shouldAddJiraTicketToTitle) {
    const prTitle = context.payload.pull_request.title ?? "";
    const parsedJiraTicket = parseTitleJiraTicket(
      prTitle,
      jiraProjectKeysArray
    );

    if (
      !parsedJiraTicket ||
      parsedJiraTicket.projectKey !== projectKey ||
      parsedJiraTicket.ticketNumber !== ticketNumber
    ) {
      const cleanedTitle = prTitle.replace(jiraTitleTicketRegex, "").trim();
      const newTitle = `[${projectKey}-${ticketNumber}] ${cleanedTitle}`;

      updates.title = newTitle;
    }
  }

  if (shouldAddJiraTicketToDescription) {
    const prDescription = context.payload.pull_request.body ?? "";
    const parsedJiraTicket = parseDescriptionJiraTicket(
      prDescription,
      jiraProjectKeysArray
    );

    if (
      !parsedJiraTicket ||
      parsedJiraTicket.projectKey !== projectKey ||
      parsedJiraTicket.ticketNumber !== ticketNumber
    ) {
      const cleanedDescription = prDescription
        .replace(jiraDescriptionTicketRegex, "")
        .trim();
      const newDescription = `<jira-link>[${projectKey}-${ticketNumber}](${jiraTicketUrl})</jira-link>\n\n${cleanedDescription}`;

      updates.body = newDescription;
    }
  }

  return {
    updates,
    jiraTicketUrl,
    projectKey,
    ticketNumber,
  };
};

export const run = async () => {
  if (!context.payload.pull_request) {
    return;
  }

  const githubToken = core.getInput(INPUT_GITHUB_TOKEN, { required: false });

  const result = await jiraPr(context);

  if (!result) {
    return;
  }

  const { updates, jiraTicketUrl, projectKey, ticketNumber } = result;

  const octokit = getOctokit(githubToken);

  if (!isEmptyObject(updates)) {
    await octokit.rest.pulls.update({
      ...context.repo,
      ...updates,
      pull_number: context.payload.pull_request.number,
    });
  }

  core.setOutput("jira-ticket-url", jiraTicketUrl);
  core.setOutput("jira-project-key", projectKey);
  core.setOutput("jira-ticket-number", ticketNumber);
  core.setOutput("updated-title", !!updates.title);
  core.setOutput("updated-description", !!updates.body);
};
