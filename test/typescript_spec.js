/*eslint-env node, mocha */
/*global describe, it*/
import path from 'path';
import * as tt from 'typescript-definition-tester';

describe('TypeScript definitions', function () {
  this.timeout(0);

  it('should compile against index.d.ts', (done) => {
    tt.compileDirectory(
        path.join(__dirname, 'typescript'),
        fileName => fileName.match(/\.ts$/),
        () => done()
    );
  });
});