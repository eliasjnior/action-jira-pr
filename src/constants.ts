export const jiraBranchTicketRegex =
  /^(?<projectKey>[0-9A-Z]+)-(?<ticketNumber>[0-9A-Z]+)/i;

export const jiraTitleTicketRegex =
  /^\[(?<projectKey>[0-9A-Z]+)-(?<ticketNumber>[0-9A-Z]+)\]/i;

export const jiraDescriptionTicketRegex =
  /<jira-link>\[(?<projectKey>[0-9A-Z]+)-(?<ticketNumber>[0-9A-Z]+)\]\((?<jiraTicketUrl>.*?)\)<\/jira-link>/i;
