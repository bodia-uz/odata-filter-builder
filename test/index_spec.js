import {expect} from 'chai';

import f from '../src/index';

describe('OData filter builder', () => {
  describe('base condition', () => {
    describe('as constructor parameter', () => {
      it('and', () => {
        const compare1 = f('and')
            .eq('SportType/Id', 1)
            .ne('Kind/Id', 3);

        expect(compare1.toString())
            .to.equal(`(SportType/Id eq 1) and (Kind/Id ne 3)`);
      });

      it('or', () => {
        const compare1 = f('or')
            .eq('SportType/Id', 1)
            .ne('Kind/Id', 3);

        expect(compare1.toString())
            .to.equal(`(SportType/Id eq 1) or (Kind/Id ne 3)`);
      });
    });

    describe('as factory method', () => {
      it('and', () => {
        const compareAnd = f.and()
            .eq('SportType/Id', 1)
            .ne('Kind/Id', 3);

        expect(compareAnd.toString())
            .to.equal(`(SportType/Id eq 1) and (Kind/Id ne 3)`);
      });

      it('or', () => {
        const compareOr = f.or()
            .eq('SportType/Id', 1)
            .ne('Kind/Id', 3);

        expect(compareOr.toString())
            .to.equal(`(SportType/Id eq 1) or (Kind/Id ne 3)`);
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
              [operator]('SportType/Id', 1);

          const compareString = f()
              [operator]('SportType/Id', '1');

          expect(compareNumber.toString())
              .to.equal(`SportType/Id ${operator} 1`);

          expect(compareString.toString())
              .to.equal(`SportType/Id ${operator} '1'`);


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
              .eq('SportType/Id', 1)
              .ne('Kind/Id', 3)
              .startswith('Translation/Ru', 'a');

          expect(compare.toString())
              .to.equal(`(SportType/Id eq 1) and (Kind/Id ne 3) and (startswith(Translation/Ru, 'a'))`);
        });

        it('or', () => {
          const compare = f.or()
              .eq('SportType/Id', 1)
              .ne('Kind/Id', 3)
              .endswith('Translation/Ru', 'a');

          expect(compare.toString())
              .to.equal(`(SportType/Id eq 1) or (Kind/Id ne 3) or (endswith(Translation/Ru, 'a'))`);
        });
      });

      describe('combination f().and(f().eq(...))', () => {
        it('and', () => {
          const compare = f().or()
              .and(f().eq('SportType/Id', 1))
              .and(f().ne('Kind/Id', 3))
              .and(f().contains('Translation/Ru', 'a'));

          expect(compare.toString())
              .to.equal(`(SportType/Id eq 1) and (Kind/Id ne 3) and (contains(Translation/Ru, 'a'))`);
        });

        it('or', () => {
          const compare = f()
              .or(f().eq('SportType/Id', 1))
              .or(f().ne('Kind/Id', 3))
              .or(f().contains('Translation/Ru', 'a'));

          expect(compare.toString())
              .to.equal(`(SportType/Id eq 1) or (Kind/Id ne 3) or (contains(Translation/Ru, 'a'))`);
        });

        it('not', () => {
          const compare = f()
              .not(f().eq('SportType/Id', 1))
              .not(f().ne('Kind/Id', 3))
              .not(f().contains('Translation/Ru', 'a'));

          expect(compare.toString())
              .to.equal(`(not (SportType/Id eq 1)) and (not (Kind/Id ne 3)) and (not (contains(Translation/Ru, 'a')))`);
        });
      });

      describe('lambda f().and(x => x.eq(...))', () => {
        it('and', () => {
          const compare = f()
              .and(x => x.eq('SportType/Id', 1))
              .and(x => x.ne('Kind/Id', 3));

          expect(compare.toString())
              .to.equal(`(SportType/Id eq 1) and (Kind/Id ne 3)`);
        });

        it('or', () => {
          const compare = f()
              .or(x => x.eq('SportType/Id', 1))
              .or(x => x.ne('Kind/Id', 3));

          expect(compare.toString())
              .to.equal(`(SportType/Id eq 1) or (Kind/Id ne 3)`);
        });

        it('not', () => {
          const compare = f()
              .not(x => x.eq('SportType/Id', 1))
              .not(x => x.ne('Kind/Id', 3));

          expect(compare.toString())
              .to.equal(`(not (SportType/Id eq 1)) and (not (Kind/Id ne 3))`);
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
});

//var genderFilter = f().in('Gender/Id', [1, 2, 3]);
//var filter = f()
//    .eq('SportType/Id', 42)
//    .eq('Kind/Id', 2)
//    .in('Gender/Id', [1, 2, 3])
//    .not(f().contains('tolower(Translation/Ru)', 'a'))
////.contains('tolower(Translation/Ru)', 'a');
//
////console.log('genderFilter:', genderFilter.toString());
//console.log('filter:', filter.toString());
//console.log('filter:', filter.source);
