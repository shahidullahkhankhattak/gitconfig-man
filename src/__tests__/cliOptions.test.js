const { prepareArgs, getName } = require("../cliOptions");

describe("CLI Options", () => {
  describe("prepareArgs", () => {
    it("should extract arguments starting with dash", () => {
      const argv = ["node", "script.js", "-i", "-h"];
      const result = prepareArgs(argv);
      expect(result).toEqual(["i", "h"]);
    });

    it("should remove dashes from arguments", () => {
      const argv = ["node", "script.js", "--init", "-h"];
      const result = prepareArgs(argv);
      expect(result).toEqual(["init", "h"]);
    });

    it("should ignore non-dash arguments", () => {
      const argv = ["node", "script.js", "-c", "profile-name"];
      const result = prepareArgs(argv);
      expect(result).toEqual(["c"]);
    });

    it("should return empty array when no arguments", () => {
      const argv = ["node", "script.js"];
      const result = prepareArgs(argv);
      expect(result).toEqual([]);
    });

    it("should handle multiple dashes", () => {
      const argv = ["node", "script.js", "---test"];
      const result = prepareArgs(argv);
      expect(result).toEqual(["test"]);
    });
  });

  describe("getName", () => {
    it("should extract name argument without dash", () => {
      const argv = ["node", "script.js", "-c", "my-profile"];
      const result = getName(argv);
      expect(result).toBe("my-profile");
    });

    it("should return undefined when no name provided", () => {
      const argv = ["node", "script.js", "-i"];
      const result = getName(argv);
      expect(result).toBeUndefined();
    });

    it("should return first non-dash argument", () => {
      const argv = ["node", "script.js", "profile-name", "-c"];
      const result = getName(argv);
      expect(result).toBe("profile-name");
    });

    it("should ignore arguments starting with dash", () => {
      const argv = ["node", "script.js", "-c", "-h", "name"];
      const result = getName(argv);
      expect(result).toBe("name");
    });
  });
});

