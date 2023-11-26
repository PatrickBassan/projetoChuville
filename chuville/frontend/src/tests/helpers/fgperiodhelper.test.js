import { getPeriodTerm } from '../../helpers/fgperiodhelper';

describe('getPeriodTerm', () => {
  test('deve retornar "Manhã" para fgperiod igual a 1', () => {
    expect(getPeriodTerm(1)).toBe('Manhã');
  });

  test('deve retornar "Tarde" para fgperiod igual a 2', () => {
    expect(getPeriodTerm(2)).toBe('Tarde');
  });

  test('deve retornar "Noite" para fgperiod igual a 3', () => {
    expect(getPeriodTerm(3)).toBe('Noite');
  });

  test('deve retornar "Madrugada" para fgperiod igual a 4', () => {
    expect(getPeriodTerm(4)).toBe('Madrugada');
  });

  test('deve retornar uma string vazia para fgperiod desconhecido', () => {
    expect(getPeriodTerm(99)).toBe('');
  });
});
