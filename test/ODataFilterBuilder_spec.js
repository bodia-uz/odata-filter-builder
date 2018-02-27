/*eslint-env node */
/*global describe, it, expect*/

import f from '../src/ODataFilterBuilder';

describe('OData filter builder', () => {
  describe('base condition', () => {
    describe('as constructor parameter', () => {
      it('and', () => {
        const compare1 = f('and')
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compare1.toString())
            .toBe('(Id eq 1) and (Type/Id ne 3)');
      });

      it('or', () => {
        const compare1 = f('or')
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compare1.toString())
            .toBe('(Id eq 1) or (Type/Id ne 3)');
      });
    });

    describe('as factory method', () => {
      it('and', () => {
        const compareAnd = f.and()
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compareAnd.toString())
            .toBe('(Id eq 1) and (Type/Id ne 3)');
      });

      it('or', () => {
        const compareOr = f.or()
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compareOr.toString())
            .toBe('(Id eq 1) or (Type/Id ne 3)');
      });
    });
  });

  describe('value types', () => {
    it('string', () => {
      const filter = f().eq('name', 'test');

      expect(filter.toString())
          .toBe('name eq \'test\'');
    });

    it('number', () => {
      const filter = f().eq('sum', 200.55);

      expect(filter.toString())
          .toBe('sum eq 200.55');
    });

    it('boolean', () => {
      const filter = f().eq('isCorrect', true);

      expect(filter.toString())
          .toBe('isCorrect eq true');
    });

    it('null', () => {
      const filter = f().eq('editedOn', null);

      expect(filter.toString())
          .toBe('editedOn eq null');
    });

    it('Date', () => {
      const date = '1995-05-22T21:00:00.000Z';
      const filter = f().gt('createdOn', new Date(date));

      expect(filter.toString())
          .toBe(`createdOn gt ${date}`);
    });
  });

  describe('logical operators', () => {

    const comparators = ['eq', 'ne', 'gt', 'ge', 'lt', 'le'];
    const functions = ['contains', 'startsWith', 'endsWith'];

    describe('simple comparation', () => {
      comparators.forEach(operator => {
        it(operator, () => {
          const compareNumber = f()[operator]('Id', 1);

          const compareString = f()[operator]('CompanyName', 'Google');

          // skip value normalisation
          const compareString1 = f()[operator]('CompanyName', 'OtherCompanyName', false);

          expect(compareNumber.toString())
              .toBe(`Id ${operator} 1`);

          expect(compareString.toString())
              .toBe(`CompanyName ${operator} 'Google'`);

          expect(compareString1.toString())
              .toBe(`CompanyName ${operator} OtherCompanyName`);

        });
      });
    });

    describe('simple comparation functions', () => {
      functions.forEach(func => {
        it(func, () => {
          const compareNumber = f()[func]('Name', 'a');

          expect(compareNumber.toString())
              .toBe(`${func.toLowerCase()}(Name, 'a')`);
        });
      });
    });

    describe('multiple eq/ne helpers', () => {

      it('in(field, [1,2,3])', () => {
        const compare = f()
            .in('Type/Id', [1, 2, '3']);

        expect(compare.toString())
            .toBe("Type/Id eq 1 or Type/Id eq 2 or Type/Id eq '3'");
      });

      it('in(field, [])', () => {
        const compare = f()
            .in('Type/Id', []);

        expect(compare.toString())
            .toBe('');
      });

      it('in(field, null)', () => {
        const compare = f()
            .in('Type/Id', null);

        expect(compare.toString())
            .toBe('');
      });

      it('in(field, \'otherField\', false)', () => {
        const compare = f()
            .in('FullName', 'ShortName', false);

        expect(compare.toString())
            .toBe('FullName eq ShortName');
      });

      it('notIn(field, [1,2,3])', () => {
        const compare = f()
            .notIn('Type/Id', [1, 2, '3']);

        expect(compare.toString())
            .toBe("not (Type/Id eq 1 or Type/Id eq 2 or Type/Id eq '3')");
      });

      it('notIn(field, [])', () => {
        const compare = f()
            .notIn('Type/Id', []);

        expect(compare.toString())
            .toBe('');
      });

      it('notIn(field, null)', () => {
        const compare = f()
            .notIn('Type/Id', null);

        expect(compare.toString())
            .toBe('');
      });

      it('notIn(field, \'1\')', () => {
        const compare = f()
            .notIn('Type/Id', 1);

        expect(compare.toString())
            .toBe('not (Type/Id eq 1)');
      });

    });

    describe('multiple compare', () => {
      describe('base condition f.or().eq(...)', () => {
        it('and', () => {
          const compare = f()
              .eq('Id', 1)
              .ne('Type/Id', 3)
              .startsWith('Name', 'a');

          expect(compare.toString())
              .toBe("(Id eq 1) and (Type/Id ne 3) and (startswith(Name, 'a'))");
        });

        it('or', () => {
          const compare = f.or()
              .eq('Id', 1)
              .ne('Type/Id', 3)
              .endsWith('Name', 'a');

          expect(compare.toString())
              .toBe("(Id eq 1) or (Type/Id ne 3) or (endswith(Name, 'a'))");
        });
      });

      describe('combination f().and(f().eq(...))', () => {
        it('and', () => {
          const compare = f().or()
              .and(f().eq('Id', 1))
              .and(f().ne('Type/Id', 3))
              .and(f().contains('Name', 'a'));

          expect(compare.toString())
              .toBe("(Id eq 1) and (Type/Id ne 3) and (contains(Name, 'a'))");
        });

        it('or', () => {
          const compare = f()
              .or(f().eq('Id', 1))
              .or(f().ne('Type/Id', 3))
              .or(f().contains('Name', 'a'));

          expect(compare.toString())
              .toBe("(Id eq 1) or (Type/Id ne 3) or (contains(Name, 'a'))");
        });

        it('not', () => {
          const compare = f()
              .not(f().eq('Id', 1))
              .not(f().ne('Type/Id', 3))
              .not(f().contains('Name', 'a'));

          expect(compare.toString())
              .toBe("(not (Id eq 1)) and (not (Type/Id ne 3)) and (not (contains(Name, 'a')))");
        });
      });

      describe('lambda f().and(x => x.eq(...))', () => {
        it('and', () => {
          const compare = f()
              .and(x => x.eq('Id', 1))
              .and(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .toBe('(Id eq 1) and (Type/Id ne 3)');
        });

        it('or', () => {
          const compare = f()
              .or(x => x.eq('Id', 1))
              .or(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .toBe('(Id eq 1) or (Type/Id ne 3)');
        });

        it('not', () => {
          const compare = f()
              .not(x => x.eq('Id', 1))
              .not(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .toBe('(not (Id eq 1)) and (not (Type/Id ne 3))');
        });

        it('not in', () => {
          const compare = f()
              .not( x => x.in('Type/Id', [1, 2, '3']));

          expect(compare.toString())
              .toBe("not (Type/Id eq 1 or Type/Id eq 2 or Type/Id eq '3')");
        });
      });
    });
  });

  describe('canonical functions', () => {

    it('length', () => {
      const func = f().eq(x => x.length('CompanyName'), 19);

      expect(func.toString())
          .toBe('length(CompanyName) eq 19');
    });

    it('toTower', () => {
      const func = f().eq(x => x.toLower('CompanyName'), 'alfreds futterkiste');

      expect(func.toString())
          .toBe("tolower(CompanyName) eq 'alfreds futterkiste'");
    });

    it('toUpper', () => {
      const func = f().eq(x => x.toUpper('CompanyName'), 'ALFREDS FUTTERKISTE');

      expect(func.toString())
          .toBe("toupper(CompanyName) eq 'ALFREDS FUTTERKISTE'");
    });

    it('trim', () => {
      const func = f().eq(x => x.trim('CompanyName'), 'CompanyName', false);

      expect(func.toString())
          .toBe('trim(CompanyName) eq CompanyName');
    });

    it('indexOf', () => {
      const func1 = f().eq(x => x.indexOf('CompanyName', 'lfreds'), 1);
      const func2 = f().eq(f.functions.indexOf('CompanyName', 'lfreds'), 1);
      const expectedString = "indexof(CompanyName, 'lfreds') eq 1";

      expect(func1.toString())
          .toBe(expectedString);

      expect(func2.toString())
          .toBe(expectedString);
    });

    it('substring', () => {
      const func1 = f().eq(x => x.substring('CompanyName', 1), 'lfreds Futterkiste');
      const func2 = f().eq(f.functions.substring('CompanyName', 1), 'lfreds Futterkiste');
      const expectedString1 = "substring(CompanyName, 1) eq 'lfreds Futterkiste'";

      const func3 = f().eq(x => x.substring('CompanyName', 1, 2), 'lf');
      const func4 = f().eq(f.functions.substring('CompanyName', 1, 2), 'lf');
      const expectedString2 = "substring(CompanyName, 1, 2) eq 'lf'";

      expect(func1.toString())
          .toBe(expectedString1);

      expect(func2.toString())
          .toBe(expectedString1);

      expect(func3.toString())
          .toBe(expectedString2);

      expect(func4.toString())
          .toBe(expectedString2);

    });

    // * // substring(CompanyName, 1) eq 'lfreds Futterkiste'
    // * f().eq(f.functions.substring('CompanyName', 1), 'lfreds Futterkiste');
    // * f().eq(x => x.substring('CompanyName', 1), 'lfreds Futterkiste');

    it('concat', () => {
      const func = f().eq(x => x.concat(y => y.concat('City', ', '), 'Country', false), 'Berlin, Germany');

      expect(func.toString())
          .toBe("concat(concat(City, ', '), Country) eq 'Berlin, Germany'");
    });

  });

  describe('combinations', () => {
    it('eq + contains + tolower', () => {
      const filter = f()
        .eq('Type/Id', 2)
        .contains(y => y.toLower('Name'), 'a');

      expect(filter.toString())
          .toBe("(Type/Id eq 2) and (contains(tolower(Name), 'a'))");
    });

    it('not + eq + concat', () => {
      const filter = f()
          .not(x => x.eq(y => y.concat(z => z.concat('City', ', '), 'Country', false), 'Berlin, Germany'));

      expect(filter.toString())
          .toBe("not (concat(concat(City, ', '), Country) eq 'Berlin, Germany')");
    });
    
    it('and + or', () => {
      const filter = f()
          .contains(x => x.toLower('Name'), 'google')
          .ne('Type/Name', 'Search Engine')
          .or(x => x.eq('Type/Name', 'Search Engine'));

      expect(filter.toString())
          .toBe("((contains(tolower(Name), 'google')) and (Type/Name ne 'Search Engine')) or (Type/Name eq 'Search Engine')");
    });

    it('or + and', () => {
      const filter = f.or()
          .contains(x => x.toLower('Name'), 'google')
          .contains(x => x.toLower('Name'), 'yandex')
          .and(x => x.eq('Type/Name', 'Search Engine'));

      expect(filter.toString())
          .toBe("((contains(tolower(Name), 'google')) or (contains(tolower(Name), 'yandex'))) and (Type/Name eq 'Search Engine')");
    });
  });

  describe('fn', () => {
    it('substringof', () => {
      const filter = f()
        .fn('substringof', 'Name', 'John', true, true);

      expect(filter.toString())
          .toBe("substringof('John', Name)");
    });

    it('substringof + toLower', () => {
      const filter = f()
        .fn('substringof', x => x.toLower('Name'), 'john', true, true);

      expect(filter.toString())
          .toBe("substringof('john', tolower(Name))");
    });
  });

  describe('helpers', () => {
    it('prototype.isEmpty', () => {
      const filter = f();

      expect(filter.isEmpty()).toBe(true);

      // is empty after adding caparison with empty value
      filter.in('property', []);
      expect(filter.isEmpty()).toBe(true);
      
      // is not empty after comparison with not empty value
      filter.in('property', [1, 2, 3]);
      expect(filter.isEmpty()).toBe(false);
    });
  });
});
