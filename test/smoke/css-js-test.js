// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated css js files', () => {
  // eslint-disable-next-line no-undef
  it('should generate css js files', (done) => {
    const files = glob.sync( // 通过同步的方式去判断这个文件有没有生成
      [
        './dist/index_*.js',
        './dist/search_*.js',
        './dist/index_*.css',
        './dist/search_*.css',
      ],
    );
    if (files.length > 0) { // 如果文件的数量大于0说明是没问题，运行done
      done();
    } else {
      throw new Error('No css js files found');
    }
  });
});
