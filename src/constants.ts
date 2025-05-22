export const jiraBranchTicketRegex =
  /^(?<projectKey>[0-9A-Z]+)-(?<ticketNumber>\d+)/i;

export const jiraTitleTicketRegex =
  /^\[(?<projectKey>[0-9A-Z]+)-(?<ticketNumber>\d+)\]/i;

export const jiraDescriptionTicketRegex =
  /<jira-link>\[(?<projectKey>[0-9A-Z]+)-(?<ticketNumber>\d+)\]\((?<jiraTicketUrl>.*?)\)<\/jira-link>/i;
