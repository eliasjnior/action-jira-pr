import {
  jiraBranchTicketRegex,
  jiraDescriptionTicketRegex,
  jiraTitleTicketRegex,
} from "./constants";

export const parseBranchJiraTicket = (text: string, projectKeys: string[]) => {
  const matches = text.match(jiraBranchTicketRegex);

  if (!matches) {
    return;
  }

  const projectKey = matches.groups?.projectKey.toUpperCase();
  const ticketNumber = matches.groups?.ticketNumber.toUpperCase();

  if (!projectKey || !ticketNumber) {
    return;
  }

  const uppercaseProjectKeys = projectKeys.map((key) => key.toUpperCase());

  if (!uppercaseProjectKeys.includes(projectKey)) {
    return;
  }

  return {
    projectKey,
    ticketNumber,
  };
};

export const parseTitleJiraTicket = (text: string, projectKeys: string[]) => {
  const matches = text.match(jiraTitleTicketRegex);

  if (!matches) {
    return;
  }

  const projectKey = matches.groups?.projectKey.toUpperCase();
  const ticketNumber = matches.groups?.ticketNumber.toUpperCase();

  if (!projectKey || !ticketNumber) {
    return;
  }

  const uppercaseProjectKeys = projectKeys.map((key) => key.toUpperCase());

  if (!uppercaseProjectKeys.includes(projectKey)) {
    return;
  }

  return {
    projectKey,
    ticketNumber,
  };
};

export const parseDescriptionJiraTicket = (
  text: string,
  projectKeys: string[]
) => {
  const matches = text.match(jiraDescriptionTicketRegex);

  if (!matches) {
    return;
  }

  const projectKey = matches.groups?.projectKey.toUpperCase();
  const ticketNumber = matches.groups?.ticketNumber.toUpperCase();
  const jiraTicketUrl = matches.groups?.jiraTicketUrl;

  if (!projectKey || !ticketNumber || !jiraTicketUrl) {
    return;
  }

  const uppercaseProjectKeys = projectKeys.map((key) => key.toUpperCase());

  if (!uppercaseProjectKeys.includes(projectKey)) {
    return;
  }

  return {
    projectKey,
    ticketNumber,
    jiraTicketUrl,
  };
};

export const isEmptyObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0;
};
