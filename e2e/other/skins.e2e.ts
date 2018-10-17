import testUtils from '../common/utils';

describe('tests-skins', () => {

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);


  it('(1 of 2) it should change to new-skin and assert new-skin was correctly applied for the first 6 out of the total of 12 skins', function () {

    this.timeout(500000);

    let csa = _changeSkinAndAssertItWasCorrectlyApplied;

    let browser = _init(this.app.client);

    browser = csa(browser, 'skin-yellow-light');
    browser = csa(browser, 'skin-red-light');
    browser = csa(browser, 'skin-green-light');
    browser = csa(browser, 'skin-purple-light');
    browser = csa(browser, 'skin-black-light');

    return browser = csa(browser, 'skin-blue-light');

  });


  it('(2 of 2) it should change to new-skin and assert new-skin was correctly applied for the remaining 6 out of the total of 12 skins', function () {

    this.timeout(500000);

    let csa = _changeSkinAndAssertItWasCorrectlyApplied;

    let browser = _init(this.app.client);

    browser = csa(browser, 'skin-yellow');
    browser = csa(browser, 'skin-red');
    browser = csa(browser, 'skin-green');
    browser = csa(browser, 'skin-purple');
    browser = csa(browser, 'skin-black');

    return browser = csa(browser, 'skin-blue');

  });

});

function _init(browser) {

  return browser.waitUntilWindowLoaded()
    .browserWindow.focus()

}

function _changeSkinAndAssertItWasCorrectlyApplied(browser, newSkin) {

  return browser
    .waitForExist('#btnChangeSkin')
    .pause(1000)
    .click('#btnChangeSkin')
    .pause(1000)
    .waitForExist('#' + newSkin)
    .waitForVisible('#' + newSkin)
    .waitForEnabled('#' + newSkin)
    .pause(1000)
    .click('#' + newSkin)
    .pause(1000)
    .click('#btnChangeSkin')
    .pause(1000)
    .click('#menuHeaderSinnerList')
    .pause(1000)
    .click('#menuHeaderSinnerPrescriptedList')
    .pause(1000)
    .waitForExist('body.' + newSkin);

}
