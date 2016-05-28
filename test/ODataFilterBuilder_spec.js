/*eslint-env node, mocha */
/*global describe, it*/

import {expect} from 'chai';

import f from '../src/ODataFilterBuilder';

describe('OData filter builder', () => {
  describe('base condition', () => {
    describe('as constructor parameter', () => {
      it('and', () => {
        const compare1 = f('and')
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compare1.toString())
            .to.equal('(Id eq 1) and (Type/Id ne 3)');
      });

      it('or', () => {
        const compare1 = f('or')
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compare1.toString())
            .to.equal('(Id eq 1) or (Type/Id ne 3)');
      });
    });

    describe('as factory method', () => {
      it('and', () => {
        const compareAnd = f.and()
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compareAnd.toString())
            .to.equal('(Id eq 1) and (Type/Id ne 3)');
      });

      it('or', () => {
        const compareOr = f.or()
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compareOr.toString())
            .to.equal('(Id eq 1) or (Type/Id ne 3)');
      });
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
              .to.equal(`Id ${operator} 1`);

          expect(compareString.toString())
              .to.equal(`CompanyName ${operator} 'Google'`);

          expect(compareString1.toString())
              .to.equal(`CompanyName ${operator} OtherCompanyName`);

        });
      });
    });

    describe('simple comparation functions', () => {
      functions.forEach(func => {
        it(func, () => {
          const compareNumber = f()[func]('Name', 'a');

          expect(compareNumber.toString())
              .to.equal(`${func.toLowerCase()}(Name, 'a')`);
        });
      });
    });

    describe('multiple eq/ne helpers', () => {

      it('in(field, [1,2,3])', () => {
        const compare = f()
            .in('Type/Id', [1, 2, '3']);

        expect(compare.toString())
            .to.equal("Type/Id eq 1 or Type/Id eq 2 or Type/Id eq '3'");
      });

      it('in(field, [])', () => {
        const compare = f()
            .in('Type/Id', []);

        expect(compare.toString())
            .to.equal('');
      });

      it('in(field, null)', () => {
        const compare = f()
            .in('Type/Id', null);

        expect(compare.toString())
            .to.equal('');
      });

      it('in(field, \'otherField\', false)', () => {
        const compare = f()
            .in('FullName', 'ShortName', false);

        expect(compare.toString())
            .to.equal('FullName eq ShortName');
      });

      it('notIn(field, [1,2,3])', () => {
        const compare = f()
            .notIn('Type/Id', [1, 2, '3']);

        expect(compare.toString())
            .to.equal("not (Type/Id eq 1 or Type/Id eq 2 or Type/Id eq '3')");
      });

      it('notIn(field, [])', () => {
        const compare = f()
            .notIn('Type/Id', []);

        expect(compare.toString())
            .to.equal('');
      });

      it('notIn(field, null)', () => {
        const compare = f()
            .notIn('Type/Id', null);

        expect(compare.toString())
            .to.equal('');
      });

      it('notIn(field, \'1\')', () => {
        const compare = f()
            .notIn('Type/Id', 1);

        expect(compare.toString())
            .to.equal('not (Type/Id eq 1)');
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
              .to.equal("(Id eq 1) and (Type/Id ne 3) and (startswith(Name, 'a'))");
        });

        it('or', () => {
          const compare = f.or()
              .eq('Id', 1)
              .ne('Type/Id', 3)
              .endsWith('Name', 'a');

          expect(compare.toString())
              .to.equal("(Id eq 1) or (Type/Id ne 3) or (endswith(Name, 'a'))");
        });
      });

      describe('combination f().and(f().eq(...))', () => {
        it('and', () => {
          const compare = f().or()
              .and(f().eq('Id', 1))
              .and(f().ne('Type/Id', 3))
              .and(f().contains('Name', 'a'));

          expect(compare.toString())
              .to.equal("(Id eq 1) and (Type/Id ne 3) and (contains(Name, 'a'))");
        });

        it('or', () => {
          const compare = f()
              .or(f().eq('Id', 1))
              .or(f().ne('Type/Id', 3))
              .or(f().contains('Name', 'a'));

          expect(compare.toString())
              .to.equal("(Id eq 1) or (Type/Id ne 3) or (contains(Name, 'a'))");
        });

        it('not', () => {
          const compare = f()
              .not(f().eq('Id', 1))
              .not(f().ne('Type/Id', 3))
              .not(f().contains('Name', 'a'));

          expect(compare.toString())
              .to.equal("(not (Id eq 1)) and (not (Type/Id ne 3)) and (not (contains(Name, 'a')))");
        });
      });

      describe('lambda f().and(x => x.eq(...))', () => {
        it('and', () => {
          const compare = f()
              .and(x => x.eq('Id', 1))
              .and(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .to.equal('(Id eq 1) and (Type/Id ne 3)');
        });

        it('or', () => {
          const compare = f()
              .or(x => x.eq('Id', 1))
              .or(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .to.equal('(Id eq 1) or (Type/Id ne 3)');
        });

        it('not', () => {
          const compare = f()
              .not(x => x.eq('Id', 1))
              .not(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .to.equal('(not (Id eq 1)) and (not (Type/Id ne 3))');
        });

        it('not in', () => {
          const compare = f()
              .not( x => x.in('Type/Id', [1, 2, '3']));

          expect(compare.toString())
              .to.equal("not (Type/Id eq 1 or Type/Id eq 2 or Type/Id eq '3')");
        });
      });
    });
  });

  describe('canonical functions', () => {

    it('length', () => {
      const func = f().eq(x => x.length('CompanyName'), 19);

      expect(func.toString())
          .to.equal('length(CompanyName) eq 19');
    });

    it('toTower', () => {
      const func = f().eq(x => x.toLower('CompanyName'), 'alfreds futterkiste');

      expect(func.toString())
          .to.equal("tolower(CompanyName) eq 'alfreds futterkiste'");
    });

    it('toUpper', () => {
      const func = f().eq(x => x.toUpper('CompanyName'), 'ALFREDS FUTTERKISTE');

      expect(func.toString())
          .to.equal("toupper(CompanyName) eq 'ALFREDS FUTTERKISTE'");
    });

    it('trim', () => {
      const func = f().eq(x => x.trim('CompanyName'), 'CompanyName', false);

      expect(func.toString())
          .to.equal('trim(CompanyName) eq CompanyName');
    });

    it('indexOf', () => {
      const func1 = f().eq(x => x.indexOf('CompanyName', 'lfreds'), 1);
      const func2 = f().eq(f.functions.indexOf('CompanyName', 'lfreds'), 1);

      expect(func1.toString())
          .to.equal(func2.toString())
          .to.equal("indexof(CompanyName, 'lfreds') eq 1");
    });

    it('substring', () => {
      const func1 = f().eq(x => x.substring('CompanyName', 1), 'lfreds Futterkiste');
      const func2 = f().eq(f.functions.substring('CompanyName', 1), 'lfreds Futterkiste');

      const func3 = f().eq(x => x.substring('CompanyName', 1, 2), 'lf');
      const func4 = f().eq(f.functions.substring('CompanyName', 1, 2), 'lf');

      expect(func1.toString())
          .to.equal(func2.toString())
          .to.equal("substring(CompanyName, 1) eq 'lfreds Futterkiste'");

      expect(func3.toString())
          .to.equal(func4.toString())
          .to.equal("substring(CompanyName, 1, 2) eq 'lf'");

    });

    // * // substring(CompanyName, 1) eq 'lfreds Futterkiste'
    // * f().eq(f.functions.substring('CompanyName', 1), 'lfreds Futterkiste');
    // * f().eq(x => x.substring('CompanyName', 1), 'lfreds Futterkiste');

    it('concat', () => {
      const func = f().eq(x => x.concat(y => y.concat('City', ', '), 'Country', false), 'Berlin, Germany');

      expect(func.toString())
          .to.equal("concat(concat(City, ', '), Country) eq 'Berlin, Germany'");
    });

  });

  describe('combinations', () => {
    it('eq + contains + tolower', () => {
      const filter = f()
        .eq('Type/Id', 2)
        .contains(y => y.toLower('Name'), 'a');

      expect(filter.toString())
          .to.equal("(Type/Id eq 2) and (contains(tolower(Name), 'a'))");
    });

    it('not + eq + concat', () => {
      const filter = f()
          .not(x => x.eq(y => y.concat(z => z.concat('City', ', '), 'Country', false), 'Berlin, Germany'));

      expect(filter.toString())
          .to.equal("not (concat(concat(City, ', '), Country) eq 'Berlin, Germany')");
    });
    
    it('and + or', () => {
      const filter = f()
          .contains(x => x.toLower('Name'), 'google')
          .ne('Type/Name', 'Search Engine')
          .or(x => x.eq('Type/Name', 'Search Engine'));

      expect(filter.toString())
          .to.equal("((contains(tolower(Name), 'google')) and (Type/Name ne 'Search Engine')) or (Type/Name eq 'Search Engine')");
    });

    it('or + and', () => {
      const filter = f.or()
          .contains(x => x.toLower('Name'), 'google')
          .contains(x => x.toLower('Name'), 'yandex')
          .and(x => x.eq('Type/Name', 'Search Engine'));

      expect(filter.toString())
          .to.equal("((contains(tolower(Name), 'google')) or (contains(tolower(Name), 'yandex'))) and (Type/Name eq 'Search Engine')");
    });
  });

  describe('helpers', () => {
    it('isODataFilterBuilder', () => {
      const filter = f().eq('Type/Id', 2);

      expect(f.isODataFilterBuilder(filter)).to.equal(true);
      expect(f.isODataFilterBuilder({})).to.equal(false);
    });
  });
});
