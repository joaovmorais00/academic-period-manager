export function daysOfWeekToNumber(day: string): number {
  switch (day) {
    case "Domingo":
      return 0;
    case "Segunda-feira":
      return 1;
    case "Terça-feira":
      return 2;
    case "Quarta-feira":
      return 3;
    case "Quinta-feira":
      return 4;
    case "Sexta-feira":
      return 5;
    case "Sábado":
      return 6;
    default:
      return -1;
  }
}
