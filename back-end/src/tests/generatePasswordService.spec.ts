import { jest } from "@jest/globals";
import generateRandomString from "../utils/generateRandomString";
import generatePasswordRepositories from "../repositories/generatePasswordRepositories";
import generatePasswordServices from "../services/generatePasswordServices";

jest.mock("../repositories/generatePasswordRepositories", () => {
  return {
    createPasswordRepository: jest.fn(),
  };
});

jest.mock("../utils/generateRandomString", () => {
  return {
    execute: jest.fn(),
  };
});

describe("generatePasswordServices", () => {
  describe("createPassword", () => {
    it("should generate a new password", async () => {
      const length = 12;
      const newPassword = "randomString";

      (generateRandomString.execute as jest.Mock).mockReturnValue(newPassword);

      (
        generatePasswordRepositories.createPasswordRepository as jest.Mock
      ).mockImplementationOnce((): any => {
        return { id: 1, password: "randomString" };
      });

      const result = await generatePasswordServices.createPassword(length);

      expect(result).toEqual("randomString");
    });
  });
});
