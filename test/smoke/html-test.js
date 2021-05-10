// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob-all');

// eslint-disable-next-line no-undef
describe('Checking generated html files', () => {
  // eslint-disable-next-line no-undef
  it('should generate html files', (done) => {
    const files = glob.sync( // 通过同步的方式去判断这个文件有没有生成
      [
        './dist/index.html',
        './dist/search.html',
      ],
    );
    if (files.length > 0) { // 如果文件的数量大于0说明是没问题，运行done
      done();
    } else {
      throw new Error('No html files found');
    }
  });
});
