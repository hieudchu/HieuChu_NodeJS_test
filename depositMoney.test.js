const userDepositMoney = require("./depositMoney");

describe("DepositMoneyCommand", () => {
    let userRepository;
    let depositMoneyCommand;

    beforeEach(() => {
        userRepository = new userDepositMoney.UserRepository();
        depositMoneyCommand = new userDepositMoney.DepositMoneyCommand(userRepository);
    });

    test("should deposit money successfully when amount is positive", () => {
        const userId = "testUser";
        const result = depositMoneyCommand.depositMoney(userId, 100);
        const user = userRepository.getUser(userId);

        expect(result).toBe(true);
        expect(user.balance).toBe(100);
    });

    test("should reject deposit if amount is zero", () => {
        const userId = "testUser";
        const result = depositMoneyCommand.depositMoney(userId, 0);
        const user = userRepository.getUser(userId);

        expect(result).toBe(false);
        expect(user.balance).toBe(0);
    });

    test("should reject deposit if amount is negative", () => {
        const userId = "testUser";
        const result = depositMoneyCommand.depositMoney(userId, -10);
        const user = userRepository.getUser(userId);

        expect(result).toBe(false);
        expect(user.balance).toBe(0);
    });

    test("should reject deposit if amount is not a number", () => {
        const userId = "testUser";
        const user = userRepository.getUser(userId);

         // Test with a string
        let result = depositMoneyCommand.depositMoney(userId, "100");
        expect(result).toBe(false);

        // Test with NaN
        result = depositMoneyCommand.depositMoney(userId, NaN);
        expect(result).toBe(false);

        // Test with undefined
        result = depositMoneyCommand.depositMoney(userId, undefined);
        expect(result).toBe(false);

        // Test with null
        result = depositMoneyCommand.depositMoney(userId, null);
        expect(result).toBe(false);

        // Ensure balance is still 0
        expect(user.balance).toBe(0);
    });
});
