const solution = require('./solution_1');

test('passes test case', () => {
    expect(solution(`
        A Y
        B X
        C Z
    `)).toBe(15)
});