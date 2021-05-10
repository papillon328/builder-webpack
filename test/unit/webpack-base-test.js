const assert = require('assert');

// eslint-disable-next-line no-undef
describe('webpack.base.js test case', () => {
  // eslint-disable-next-line global-require
  const baseConfig = require('../../lib/webpack.base');

  // eslint-disable-next-line no-undef
  it('entry', () => {
    // 判断这两个entry是否存在
    assert.equal(baseConfig.entry.index, '/Users/qieziliu/work/beishuiyizhan/beishuiyizhan/project/builder-webpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, '/Users/qieziliu/work/beishuiyizhan/beishuiyizhan/project/builder-webpack/test/smoke/template/src/search/index.js');
  });
});
