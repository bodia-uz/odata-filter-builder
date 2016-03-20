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
            .to.equal(`(Id eq 1) and (Type/Id ne 3)`);
      });

      it('or', () => {
        const compare1 = f('or')
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compare1.toString())
            .to.equal(`(Id eq 1) or (Type/Id ne 3)`);
      });
    });

    describe('as factory method', () => {
      it('and', () => {
        const compareAnd = f.and()
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compareAnd.toString())
            .to.equal(`(Id eq 1) and (Type/Id ne 3)`);
      });

      it('or', () => {
        const compareOr = f.or()
            .eq('Id', 1)
            .ne('Type/Id', 3);

        expect(compareOr.toString())
            .to.equal(`(Id eq 1) or (Type/Id ne 3)`);
      });
    })
  });

  describe('logical operators', () => {

    const comparators = ['eq', 'ne', 'gt', 'ge', 'lt', 'le'];
    const functions = ['contains', 'startswith', 'endswith'];

    describe('simple comparation', () => {
      comparators.forEach(operator => {
        it(operator, () => {
          const compareNumber = f()
              [operator]('Id', 1);

          const compareString = f()
              [operator]('CompanyName', 'Google');

          // skip value normalisation
          const compareString1 = f()
              [operator]('CompanyName', 'OtherCompanyName', false);

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
          const compareNumber = f()
              [func]('Translation/Ru', 'a');

          expect(compareNumber.toString())
              .to.equal(`${func}(Translation/Ru, 'a')`);
        });
      });
    });

    describe('multiple eq/ne helpers', () => {

      it('in(field, [1,2,3])', () => {
        const compare = f()
            .in('Gender/Id', [1, 2, '3']);

        expect(compare.toString())
            .to.equal(`Gender/Id eq 1 or Gender/Id eq 2 or Gender/Id eq '3'`);
      });

      it('notIn(field, [1,2,3])', () => {
        const compare = f()
            .notIn('Gender/Id', [1, 2, '3']);

        expect(compare.toString())
            .to.equal(`Gender/Id ne 1 and Gender/Id ne 2 and Gender/Id ne '3'`);
      });

    });

    describe('multiple compare', () => {
      describe('base condition f.or().eq(...)', () => {
        it('and', () => {
          const compare = f()
              .eq('Id', 1)
              .ne('Type/Id', 3)
              .startswith('Translation/Ru', 'a');

          expect(compare.toString())
              .to.equal(`(Id eq 1) and (Type/Id ne 3) and (startswith(Translation/Ru, 'a'))`);
        });

        it('or', () => {
          const compare = f.or()
              .eq('Id', 1)
              .ne('Type/Id', 3)
              .endswith('Translation/Ru', 'a');

          expect(compare.toString())
              .to.equal(`(Id eq 1) or (Type/Id ne 3) or (endswith(Translation/Ru, 'a'))`);
        });
      });

      describe('combination f().and(f().eq(...))', () => {
        it('and', () => {
          const compare = f().or()
              .and(f().eq('Id', 1))
              .and(f().ne('Type/Id', 3))
              .and(f().contains('Translation/Ru', 'a'));

          expect(compare.toString())
              .to.equal(`(Id eq 1) and (Type/Id ne 3) and (contains(Translation/Ru, 'a'))`);
        });

        it('or', () => {
          const compare = f()
              .or(f().eq('Id', 1))
              .or(f().ne('Type/Id', 3))
              .or(f().contains('Translation/Ru', 'a'));

          expect(compare.toString())
              .to.equal(`(Id eq 1) or (Type/Id ne 3) or (contains(Translation/Ru, 'a'))`);
        });

        it('not', () => {
          const compare = f()
              .not(f().eq('Id', 1))
              .not(f().ne('Type/Id', 3))
              .not(f().contains('Translation/Ru', 'a'));

          expect(compare.toString())
              .to.equal(`(not (Id eq 1)) and (not (Type/Id ne 3)) and (not (contains(Translation/Ru, 'a')))`);
        });
      });

      describe('lambda f().and(x => x.eq(...))', () => {
        it('and', () => {
          const compare = f()
              .and(x => x.eq('Id', 1))
              .and(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .to.equal(`(Id eq 1) and (Type/Id ne 3)`);
        });

        it('or', () => {
          const compare = f()
              .or(x => x.eq('Id', 1))
              .or(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .to.equal(`(Id eq 1) or (Type/Id ne 3)`);
        });

        it('not', () => {
          const compare = f()
              .not(x => x.eq('Id', 1))
              .not(x => x.ne('Type/Id', 3));

          expect(compare.toString())
              .to.equal(`(not (Id eq 1)) and (not (Type/Id ne 3))`);
        });

        it('not in', () => {
          const compare = f()
              .not( x => x.in('Gender/Id', [1, 2, '3']));

          expect(compare.toString())
              .to.equal(`not (Gender/Id eq 1 or Gender/Id eq 2 or Gender/Id eq '3')`);
        });
      });
    });
  });

  describe('canonical functions', () => {

    it('length', () => {
      const func = f().eq(x => x.length('CompanyName'), 19);

      expect(func.toString())
          .to.equal(`length(CompanyName) eq 19`);
    });

    it('tolower', () => {
      const func = f().eq(x => x.tolower('CompanyName'), 'alfreds futterkiste');

      expect(func.toString())
          .to.equal(`tolower(CompanyName) eq 'alfreds futterkiste'`);
    });

    it('toupper', () => {
      const func = f().eq(x => x.toupper('CompanyName'), 'ALFREDS FUTTERKISTE');

      expect(func.toString())
          .to.equal(`toupper(CompanyName) eq 'ALFREDS FUTTERKISTE'`);
    });

    it('trim', () => {
      // * // return trim(CompanyName) eq CompanyName
      // * f().eq(x => x.trim('CompanyName'), 'CompanyName')
      const func = f().eq(x => x.trim('CompanyName'), 'CompanyName', false);

      expect(func.toString())
          .to.equal(`trim(CompanyName) eq CompanyName`);
    });

    it('concat', () => {
      // * // return trim(CompanyName) eq CompanyName
      // * f().eq(x => x.trim('CompanyName'), 'CompanyName')
      const func = f().eq(x => x.concat(y => y.concat('City', ', '), 'Country', false), 'Berlin, Germany');

      expect(func.toString())
          .to.equal(`concat(concat(City, ', '), Country) eq 'Berlin, Germany'`);
    });

  });

  describe('combinations', () => {
    it('eq + contains + tolower', () => {
      var filter = f()
        .eq('Type/Id', 2)
        .contains(y => y.tolower('Name'), 'a');

      expect(filter.toString())
          .to.equal(`(Type/Id eq 2) and (contains(tolower(Name), 'a'))`);
    });

    it('not + eq + concat', () => {
      var filter = f()
          .not(x => x.eq(y => y.concat(z => z.concat('City', ', '), 'Country', false), 'Berlin, Germany'));

      expect(filter.toString())
          .to.equal(`not (concat(concat(City, ', '), Country) eq 'Berlin, Germany')`);
    })
  })
});
