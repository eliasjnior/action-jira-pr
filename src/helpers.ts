import {
  jiraBranchTicketRegex,
  jiraDescriptionTicketRegex,
  jiraTitleTicketRegex,
} from "./constants";

const onlyNumbersRegex = /^\d+$/;

const isOnlyNumbers = (text: string) => {
  return onlyNumbersRegex.test(text);
};

export const parseBranchJiraTicket = (
  text: string,
  projectKeys: string[],
  noneTicket?: string
) => {
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

  if (isOnlyNumbers(ticketNumber)) {
    return {
      projectKey,
      ticketNumber,
    };
  }

  if (noneTicket && ticketNumber === noneTicket.toUpperCase()) {
    return {
      projectKey,
      ticketNumber: noneTicket,
    };
  }

  return false;
};

export const parseTitleJiraTicket = (
  text: string,
  projectKeys: string[],
  noneTicket?: string
) => {
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

  if (isOnlyNumbers(ticketNumber)) {
    return {
      projectKey,
      ticketNumber,
    };
  }

  if (noneTicket && ticketNumber === noneTicket.toUpperCase()) {
    return {
      projectKey,
      ticketNumber: noneTicket,
    };
  }

  return false;
};

export const parseDescriptionJiraTicket = (
  text: string,
  projectKeys: string[],
  noneTicket?: string
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

  if (isOnlyNumbers(ticketNumber)) {
    return {
      projectKey,
      ticketNumber,
      jiraTicketUrl,
    };
  }

  if (noneTicket && ticketNumber === noneTicket.toUpperCase()) {
    return {
      projectKey,
      ticketNumber: noneTicket,
      jiraTicketUrl,
    };
  }

  return false;
};

export const isEmptyObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0;
};
