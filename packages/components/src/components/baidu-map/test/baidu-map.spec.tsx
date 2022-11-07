import { newSpecPage } from '@stencil/core/testing';
import { BaiduMap } from '../baidu-map';

describe('baidu-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BaiduMap],
      html: `<baidu-map></baidu-map>`,
    });
    expect(page.root).toEqualHtml(`
      <baidu-map>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </baidu-map>
    `);
  });
});
