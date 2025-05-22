export const jiraBranchTicketRegex =
  /^(?<projectKey>[A-Z]+)-(?<ticketNumber>\d+)/i;

export const jiraTitleTicketRegex =
  /^\[(?<projectKey>[A-Z]+)-(?<ticketNumber>\d+)\]/i;

export const jiraDescriptionTicketRegex =
  /<jira-link>\[(?<projectKey>[A-Z]+)-(?<ticketNumber>\d+)\]\((?<jiraTicketUrl>.*?)\)<\/jira-link>/i;
