const { cliOptions, options } = require("../constants");

describe("Constants", () => {
  describe("cliOptions", () => {
    it("should have all required CLI options defined", () => {
      expect(cliOptions).toBeDefined();
      expect(Array.isArray(cliOptions)).toBe(true);
      expect(cliOptions.length).toBeGreaterThan(0);
    });

    it("should have correct structure for each option", () => {
      cliOptions.forEach((option) => {
        expect(Array.isArray(option)).toBe(true);
        expect(option.length).toBe(3);
        expect(typeof option[0]).toBe("string"); // short option
        expect(typeof option[1]).toBe("string"); // command name
        expect(typeof option[2]).toBe("string"); // help text
      });
    });

    it("should include init option", () => {
      const initOption = cliOptions.find((opt) => opt[1] === "init");
      expect(initOption).toBeDefined();
      expect(initOption[0]).toBe("i");
    });

    it("should include create option", () => {
      const createOption = cliOptions.find((opt) => opt[1] === "create");
      expect(createOption).toBeDefined();
      expect(createOption[0]).toBe("c");
    });

    it("should include switch option", () => {
      const switchOption = cliOptions.find((opt) => opt[1] === "switch");
      expect(switchOption).toBeDefined();
      expect(switchOption[0]).toBe("s");
    });

    it("should include delete option", () => {
      const deleteOption = cliOptions.find((opt) => opt[1] === "delete");
      expect(deleteOption).toBeDefined();
      expect(deleteOption[0]).toBe("d");
    });

    it("should include list option", () => {
      const listOption = cliOptions.find((opt) => opt[1] === "list");
      expect(listOption).toBeDefined();
      expect(listOption[0]).toBe("ls");
    });

    it("should include help option", () => {
      const helpOption = cliOptions.find((opt) => opt[1] === "help");
      expect(helpOption).toBeDefined();
      expect(helpOption[0]).toBe("h");
    });

    it("should include version option", () => {
      const versionOption = cliOptions.find((opt) => opt[1] === "version");
      expect(versionOption).toBeDefined();
      expect(versionOption[0]).toBe("v");
    });
  });

  describe("options", () => {
    it("should be defined as an array", () => {
      expect(options).toBeDefined();
      expect(Array.isArray(options)).toBe(true);
    });
  });
});

