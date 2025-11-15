const { isValidEmail, isStrongPassword } = require("./validators.js");

describe("Testes para isValidEmail", () => {
  test('Deve retornar "true" para um email válido', () => {
    expect(isValidEmail("teste@email.com")).toBe(true);
  });

  test('Deve retornar "false" para um email sem "@" ', () => {
    expect(isValidEmail("teste.email.com")).toBe(false);
  });

  test('Deve retornar "false" para um email sem domínio', () => {
    expect(isValidEmail("teste@email")).toBe(false);
  });

  test('Deve retornar "false" para um valor nulo (null)', () => {
    expect(isValidEmail(null)).toBe(false);
  });
});

describe("Testes para isStrongPassword", () => {
  test('Deve retornar "true" para uma senha com 6 caracteres', () => {
    expect(isStrongPassword("123456")).toBe(true);
  });

  test('Deve retornar "true" para uma senha longa', () => {
    expect(isStrongPassword("senha_super_forte_123")).toBe(true);
  });

  test('Deve retornar "false" para uma senha com 5 caracteres', () => {
    expect(isStrongPassword("12345")).toBe(false);
  });

  test('Deve retornar "false" para uma string vazia', () => {
    expect(isStrongPassword("")).toBe(false);
  });
});
