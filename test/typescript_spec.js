/*eslint-env node, mocha */
/*global describe, it*/
import path from 'path';
import * as tt from 'typescript-definition-tester';

describe('TypeScript definitions', function () {
  it('should compile against index.d.ts', () => {
    return new Promise(resolve => {
      tt.compileDirectory(
          path.join(__dirname, 'typescript'),
          fileName => fileName.match(/\.ts$/),
          () => resolve()
      );
    });
  });
});