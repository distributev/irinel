import testUtils from '../common/utils';
import * as moment from 'moment';

describe('tests-pagination-sorting', () => {

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('should work fine when only few rows and no pagination', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    browser = _addSin(browser, '1');
    browser = _addSin(browser, '2', '-1 week');

    browser = _addSin(browser, '3', 'prescripted');
    browser = _addSin(browser, '4', '-5 years');
    browser = _addSin(browser, '5', '-6 years');

    return browser
      .waitForValue('#totalCount', 'Total: 5 sins') //5 sins in total
      .waitUntil(function () { //check default sorting for all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[5]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .waitForValue('#totalCount', 'Total: 3 sins') //3 sins should be prescripted
      .waitUntil(function () {//check default sorting for prescripted sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[3]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitForExist('#menuHeaderSinnerList')
      .pause(1000)
      .click('#menuHeaderSinnerList')
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate') // click to sort descending all sins
      .pause(1000)
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[5]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate')// click to sort descending prescripted sins
      .pause(1000)
      .waitUntil(function () {//check descending order prescripted sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {//check descending order
        return browser.element("//table[@id='tableSins']//tr[3]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")


  });

  it('should work fine with lots of data paginated', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    //add 10 sins new
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(identifier => {

      browser = _addSin(browser, identifier);

    });

    //add 10 sins prescripted
    [11, 12, 13, 14, 15, 16, 16, 18, 19, 20].forEach(identifier => {

      browser = _addSin(browser, identifier, 'prescripted');

    });

    //add few various
    browser = _addSin(browser, '21', '-1 week');

    browser = _addSin(browser, '22', 'prescripted');
    browser = _addSin(browser, '23', '-5 years');
    browser = _addSin(browser, '24', '-6 years');

    //add 2nd sin (prescripted this time) for few
    [1, 2, 3].forEach(identifier => {

      browser = _addSin(browser, identifier, 'prescripted');

    });

    return browser
      .waitForValue('#showingCount', 'Showing 1 to 10 of 27 sins') //27 sins in total
      .waitUntil(function () { //check default sorting for all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList') // go to prescripted sins
      .pause(1000)
      .waitForValue('#showingCount', 'Showing 1 to 10 of 16 sins') //16 sins should be prescripted
      .waitUntil(function () {//check default sorting for prescripted sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitForExist('#menuHeaderSinnerList')
      .pause(1000)
      .click('#menuHeaderSinnerList') // go to all sins
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate') // click to sort descending all sins
      .pause(1000)
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList') // go to prescripted sins
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate')// click to sort descending prescripted sins
      .pause(1000)
      .waitUntil(function () {//check descending order prescripted sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {//check descending order
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .pause(1000)
      .waitForExist('#menuHeaderSinnerList')
      .pause(1000)
      .click('#menuHeaderSinnerList') // go to all sins
      .waitForValue('#showingCount', 'Showing 1 to 10 of 27 sins') //27 sins in total
      .waitForExist('.pagination-next .page-link')
      .pause(1000)
      .click('.pagination-next .page-link') //go to page 2
      .waitForValue('#showingCount', 'Showing 11 to 20 of 27 sins') // page 2
      .waitForExist('.pagination-next .page-link')
      .pause(1000)
      .click('.pagination-next .page-link') //go to page 3
      .waitForValue('#showingCount', 'Showing 21 to 27 of 27 sins') // page 3
      .waitForExist('.pagination-prev .page-link')
      .pause(1000)
      .click('.pagination-prev .page-link') //back to page 2
      .waitForValue('#showingCount', 'Showing 11 to 20 of 27 sins') //check we are on page 2
      .waitForExist('.pagination-prev .page-link')
      .pause(1000)
      .click('.pagination-prev .page-link') //back to page 1
      .waitForValue('#showingCount', 'Showing 1 to 10 of 27 sins') //check we are on page 1
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList') //go to prescripted sins
      .waitForValue('#showingCount', 'Showing 1 to 10 of 16 sins') //16 prescripted sins
      .waitForExist('.pagination-next .page-link')
      .pause(1000)
      .click('.pagination-next .page-link') //next page (2)
      .waitForValue('#showingCount', 'Showing 11 to 16 of 16 sins') //check we are on page 2
      .waitForExist('.pagination-prev .page-link')
      .pause(1000)
      .click('.pagination-prev .page-link') //go back to page 1
      .waitForValue('#showingCount', 'Showing 1 to 10 of 16 sins') //check we are on page 1
      .waitForExist('#menuHeaderSinnerList')
      .pause(1000)
      .click('#menuHeaderSinnerList')//go to all sinners
      .waitForValue('#showingCount', 'Showing 1 to 10 of 27 sins') //27 sins in total
      .waitUntil(function () { //check default sorting for all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitUntil(function () {
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from recent to old")
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate') // click to sort descending all sins
      .pause(1000)
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitForValue('#showingCount', 'Showing 1 to 10 of 27 sins') //27 sins
      .waitForExist('.pagination-next .page-link')
      .pause(1000)
      .click('.pagination-next .page-link')
      .waitForValue('#showingCount', 'Showing 11 to 20 of 27 sins') //2nd page
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate') // click to sort descending all sins
      .waitForValue('#showingCount', 'Showing 1 to 10 of 27 sins') //27 sins
      .pause(1000)
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'hours ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList')
      .waitForValue('#showingCount', 'Showing 1 to 10 of 16 sins') //16 sins should be prescripted
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .pause(1000)
      .waitForExist('.pagination-next .page-link')
      .pause(1000)
      .click('.pagination-next .page-link')
      .waitForValue('#showingCount', 'Showing 11 to 16 of 16 sins') //2nd page
      .waitForExist('#columnHeaderSortBySinDate')
      .pause(1000)
      .click('#columnHeaderSortBySinDate') // click to sort descending all sins
      .waitForValue('#showingCount', 'Showing 1 to 10 of 16 sins') //16 prescripted sins
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'6 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent")
      .waitUntil(function () {//check descending order all sins
        return browser.element("//table[@id='tableSins']//tr[10]//td[contains(text(),'4 years ago')]").isVisible();
      }, 2000, "Table should be sorted by date from old to recent");

  });

});

function _init(browser) {

  return browser.waitUntilWindowLoaded()
    .browserWindow.focus()

}

function _addSin(browser, identifier, when = 'no') {

  let sinDate = moment();

  if (when == 'prescripted')
    sinDate = moment().subtract(4, 'years');

  if (when == '-1 week')
    sinDate = moment().subtract(1, 'weeks');

  if (when == '-5 years')
    sinDate = moment().subtract(5, 'years');

  if (when == '-6 years')
    sinDate = moment().subtract(6, 'years');

  let formattedSinDate = sinDate.format('LL');

  return browser
    .waitForExist('#btnNewSin')
    .pause(1000)
    .click('#btnNewSin')
    .waitForExist('#txtIdentifier')
    .pause(1000)
    .click('#txtIdentifier')
    .setValue("#txtIdentifier", identifier)
    .pause(1000)
    .click('#txtName')
    .setValue("#txtName", `Name${identifier}`)
    .pause(1000)
    .click('#txtNotes')
    .setValue("#txtNotes", `Notes${identifier}`)
    .pause(1000)
    .click('#txtDate')
    .setValue("#txtDate", formattedSinDate)
    .pause(1000)
    .click('#txtNotes')
    .pause(1000)
    .click('#btnSaveSin')
    .pause(1000);
}
