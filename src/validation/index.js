import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value) {
    return "Дане поле є обов'язковим!";
  }

  return true;
});

defineRule("notOnlySpace", (value) => {
  if (!value) {
    return true;
  }

  if (!value.trim()) {
    return "Некоректно введені дані!";
  }

  return true;
});

defineRule("email", (value) => {
  if (!value) {
    return true;
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Некоректна адреса електронної пошти!";
  }

  return true;
});

defineRule("passwordLength", (value) => {
  if (!value) {
    return true;
  }

  if (value.length < 4) {
    return "Пароль повинен бути довшим, ніж 4 символи!";
  }

  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (!value) {
    return true;
  }

  if (value === ctx.form[target]) {
    return true;
  }
  return "Некоректно повторно введено пароль!";
});

defineRule("nameMinLength", (value) => {
  if (!value) {
    return true;
  }

  if (value.length < 2) {
    return "Кількість символів не має бути меншою, ніж 2!";
  }

  return true;
});

defineRule("nameMaxLength", (value) => {
  if (!value) {
    return true;
  }

  if (value.length > 50) {
    return "Кількість символів не має бути більшою, ніж 50!";
  }

  return true;
});

defineRule("phoneNumber", (value) => {
  if (!value) {
    return true;
  }

  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i;
  if (!regex.test(value)) {
    return "Некоректно введений номер телефону!";
  }

  return true;
});

defineRule("minBirthday", (value) => {
  if (!value) {
    return true;
  }

  const date = new Date();
  date.setFullYear(date.getFullYear() - 150);
  if (Date.parse(value) < date) {
    return "Некоректно введена дата народження!";
  }

  return true;
});

defineRule("maxBirthday", (value) => {
  if (!value) {
    return true;
  }

  const date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  if (Date.parse(value) > date) {
    return "Некоректно введена дата народження!";
  }

  return true;
});

defineRule("notPast", (value) => {
  if (!value) {
    return true;
  }

  if (Date.parse(value) < new Date()) {
    return "Некоректно введена дата!";
  }

  return true;
});
