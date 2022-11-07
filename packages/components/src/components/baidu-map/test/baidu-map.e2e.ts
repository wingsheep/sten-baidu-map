import { newE2EPage } from '@stencil/core/testing';

describe('baidu-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<baidu-map></baidu-map>');

    const element = await page.find('baidu-map');
    expect(element).toHaveClass('hydrated');
  });
});
