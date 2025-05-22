import {
  isEmptyObject,
  parseBranchJiraTicket,
  parseDescriptionJiraTicket,
  parseTitleJiraTicket,
} from "./helpers";
import { describe, expect, it } from "vitest";

describe("helpers", () => {
  describe("parseBranchJiraTicket", () => {
    it("should return the Jira ticket from the branch name", () => {
      expect(parseBranchJiraTicket("PR-123", ["PR"])).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });

      expect(parseBranchJiraTicket("PR-NONE", ["PR"], "NONE")).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "NONE",
      });

      expect(parseBranchJiraTicket("pr-123", ["PR"])).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });

      expect(parseBranchJiraTicket("pr-none", ["PR"], "NONE")).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "NONE",
      });

      expect(parseBranchJiraTicket("PR-123-branch-name", ["PR"])).toStrictEqual(
        {
          projectKey: "PR",
          ticketNumber: "123",
        }
      );

      expect(
        parseBranchJiraTicket("PR-NONE-branch-name", ["PR"], "NONE")
      ).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "NONE",
      });

      expect(parseBranchJiraTicket("pr-123-branch-name", ["PR"])).toStrictEqual(
        {
          projectKey: "PR",
          ticketNumber: "123",
        }
      );

      expect(
        parseBranchJiraTicket("PR-123-branch-name", ["PR", "QA"])
      ).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });

      expect(
        parseBranchJiraTicket("AB1D-123-branch-name", ["AB1D"])
      ).toStrictEqual({
        projectKey: "AB1D",
        ticketNumber: "123",
      });

      expect(
        parseBranchJiraTicket("AB1D-NONE-branch-name", ["AB1D"], "NONE")
      ).toStrictEqual({
        projectKey: "AB1D",
        ticketNumber: "NONE",
      });
    });

    it("should return undefined if the branch name does not contain a Jira ticket", () => {
      expect(
        parseBranchJiraTicket("PR-123-branch-name", ["QA"])
      ).toBeUndefined();
    });
  });

  describe("parseTitleJiraTicket", () => {
    it("should return the Jira ticket from the title", () => {
      expect(parseTitleJiraTicket("[PR-123]", ["PR"])).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });

      expect(parseTitleJiraTicket("[pr-123]", ["PR"])).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });

      expect(
        parseTitleJiraTicket("[PR-123] title", ["PR", "QA"])
      ).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });

      expect(
        parseTitleJiraTicket("[pr-123] title", ["PR", "QA"])
      ).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
      });
    });

    it("should return undefined if the title does not contain a Jira ticket", () => {
      expect(parseTitleJiraTicket("title", ["PR"])).toBeUndefined();
    });
  });

  describe("parseDescriptionJiraTicket", () => {
    it("should return the Jira ticket from the description", () => {
      expect(
        parseDescriptionJiraTicket(
          "<jira-link>[PR-123](https://jira.com/PR-123)</jira-link>",
          ["PR"]
        )
      ).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
        jiraTicketUrl: "https://jira.com/PR-123",
      });

      expect(
        parseDescriptionJiraTicket(
          "<jira-link>[pr-123](https://jira.com/pr-123)</jira-link>",
          ["PR", "QA"]
        )
      ).toStrictEqual({
        projectKey: "PR",
        ticketNumber: "123",
        jiraTicketUrl: "https://jira.com/pr-123",
      });
    });
  });

  describe("isEmptyObject", () => {
    it("should return true if the object is empty", () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it("should return false if the object is not empty", () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });
});
