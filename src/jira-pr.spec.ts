import { Context } from "@actions/github/lib/context";
import { describe, expect, it, vi } from "vitest";
import { jiraPr } from "./jira-pr";

vi.mock("@actions/core", () => ({
  getInput: vi.fn((input: string) => {
    switch (input) {
      case "github-token":
        return "abc123";
      case "jira-account":
        return "jira-account";
      case "jira-project-keys":
        return "PR,QA";
      case "should-add-jira-ticket-to-title":
        return "true";
      case "should-add-jira-ticket-to-description":
        return "true";
      default:
        return "";
    }
  }),
  getBooleanInput: vi.fn((input: string) => {
    switch (input) {
      case "should-add-jira-ticket-to-title":
        return true;
      case "should-add-jira-ticket-to-description":
        return true;
      default:
        return false;
    }
  }),
}));

describe("jiraPr", () => {
  describe("pr title", () => {
    it("should add the Jira ticket to the PR title", async () => {
      const context: Partial<Context> = {
        payload: {
          pull_request: {
            number: 1,
            head: {
              ref: "pr-1-branch-name",
            },
            body: "PR description",
            title: "PR title",
          },
        },
      };

      const result = await jiraPr(context as Context);

      expect(result?.updates.title).toBe("[PR-1] PR title");
    });

    it("should not add the Jira ticket to the PR title if the title does not contain a Jira ticket", async () => {
      const context: Partial<Context> = {
        payload: {
          pull_request: {
            number: 1,
            head: {
              ref: "pr-1-branch-name",
            },
            body: "PR description",
            title: "[PR-1] PR title",
          },
        },
      };

      const result = await jiraPr(context as Context);

      expect(result?.updates.title).toBeUndefined();
    });

    it("should update the Jira ticket to the PR title if the title contains a Jira ticket", async () => {
      const context: Partial<Context> = {
        payload: {
          pull_request: {
            number: 1,
            head: {
              ref: "pr-2-branch-name",
            },
            body: "PR description",
            title: "[PR-1] PR title",
          },
        },
      };

      const result = await jiraPr(context as Context);

      expect(result?.updates.title).toBe("[PR-2] PR title");
    });
  });

  describe("pr description", () => {
    it("should add the Jira ticket to the PR description", async () => {
      const context: Partial<Context> = {
        payload: {
          pull_request: {
            number: 1,
            head: {
              ref: "pr-1-branch-name",
            },
            body: "PR description",
            title: "PR title",
          },
        },
      };

      const result = await jiraPr(context as Context);

      expect(result?.updates.body).toBe(
        "<jira-link>[PR-1](https://jira-account.atlassian.net/browse/PR-1)</jira-link>\n\nPR description"
      );
    });

    it("should not add the Jira ticket to the PR description if the description does not contain a Jira ticket", async () => {
      const context: Partial<Context> = {
        payload: {
          pull_request: {
            number: 1,
            head: {
              ref: "pr-1-branch-name",
            },
            body: "<jira-link>[PR-1](https://jira-account.atlassian.net/browse/PR-1)</jira-link>\n\nPR description",
            title: "PR title",
          },
        },
      };

      const result = await jiraPr(context as Context);

      expect(result?.updates.body).toBeUndefined();
    });

    it("should update the Jira ticket to the PR description if the description contains a Jira ticket", async () => {
      const context: Partial<Context> = {
        payload: {
          pull_request: {
            number: 1,
            head: {
              ref: "pr-2-branch-name",
            },
            body: "<jira-link>[PR-1](https://jira-account.atlassian.net/browse/PR-1)</jira-link>\n\nPR description",
            title: "PR title",
          },
        },
      };

      const result = await jiraPr(context as Context);

      expect(result?.updates.body).toBe(
        "<jira-link>[PR-2](https://jira-account.atlassian.net/browse/PR-2)</jira-link>\n\nPR description"
      );
    });
  });
});
