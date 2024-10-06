function daysOfWeekToNumber(day: string): number {
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

function daysOfWeekToString(num: number): string {
  switch (num) {
    case 0:
      return "Domingo";
    case 1:
      return "Segunda-feira";
    case 2:
      return "Terça-feira";
    case 3:
      return "Quarta-feira";
    case 4:
      return "Quinta-feira";
    case 5:
      return "Sexta-feira";
    case 6:
      return "Sábado";
    default:
      return "Not Found";
  }
}

const DaysOfWeek = { daysOfWeekToNumber, daysOfWeekToString };

export default DaysOfWeek;
