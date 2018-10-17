import testUtils from '../common/utils';
import * as moment from 'moment';

describe('tests-individual-sinner', () => {

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it('should not find a sin which does not exist', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    return browser = _addSin(browser, '1')
      .waitForExist('#txtSearchSinner')
      .pause(1000)
      .click('#txtSearchSinner')
      .setValue("#txtSearchSinner", '2')
      .pause(1000)
      .click('#btnSearchSinner')
      .pause(1000)
      .waitForExist('#msgNotFound');

  });

  it('should work fine checking for valid and invalid names', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    browser = _addSin(browser, '1')

    return browser
      .waitForExist('#txtSearchSinner')
      .pause(1000)
      .click('#txtSearchSinner')
      .setValue("#txtSearchSinner", '1')
      .pause(1000)
      .click('#btnSearchSinner')
      .waitForExist('#sinContainer0')
      .waitForExist('#txtFoundSinnerName0')
      .pause(1000)
      .setValue("#txtFoundSinnerName0", 'Name2')
      .pause(1000)
      .click('#btnCheckSinnerName0')
      .pause(1000)
      .waitForExist('#warningMatchSinnerName0')
      .pause(1000)
      .setValue("#txtFoundSinnerName0", 'Name1')
      .pause(1000)
      .click('#btnCheckSinnerName0')
      .pause(1000)
      .waitForExist('#successMatchSinnerName0');

  });

  it('should allow editing names', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    browser = _addSin(browser, '1')
    browser = _addSin(browser, '1')
    browser = _addSin(browser, '2')

    browser = _nameCheckEditSaveCheck(browser, 1, 0)

    return _nameCheckEditSaveCheck(browser, 2, 0);

  });

  it('should allow editing notes', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    browser = _addSin(browser, '1')
    browser = _addSin(browser, '1', 'prescripted')
    browser = _addSin(browser, '2', '-5 years')

    browser = _notesCheckEditSaveCheck(browser, 1, 0)

    return _notesCheckEditSaveCheck(browser, 2, 0);

  });

  it('should work fine to delete both prescripted and not prescripted sins', function () {

    this.timeout(500000);

    let browser = _init(this.app.client);

    browser = _addSin(browser, '1')
    browser = _addSin(browser, '1', 'prescripted')
    browser = _addSin(browser, '2', '-5 years')

    browser = _deleteSinAndCheckWasDeleted(browser, '1', 3);
    browser = _deleteSinAndCheckWasDeleted(browser, '1', 2);
    return _deleteSinAndCheckWasDeleted(browser, '2', 1);
  });

});

function _init(browser) {

  return browser.waitUntilWindowLoaded()
    .browserWindow.focus()

}

function _addSin(browser, identifier, when = 'now') {

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
    .click('#txtDate')
    .pause(1000)
    .setValue("#txtDate", formattedSinDate)
    .pause(1000)
    .click('#txtNotes')
    .pause(1000)
    .click('#btnSaveSin')
    .pause(1000);

}

function _nameCheckEditSaveCheck(browser, identifier, index) {

  return browser
    .waitForExist('#txtSearchSinner')
    .pause(1000)
    .click('#txtSearchSinner')
    .setValue("#txtSearchSinner", identifier)
    .pause(1000)
    .click('#btnSearchSinner')
    .waitForExist(`#sinContainer${index}`)
    .waitForExist(`#txtFoundSinnerName${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerName${index}`, 'Name3')
    .pause(1000)
    .click(`#btnCheckSinnerName${index}`)
    .pause(1000)
    .waitForExist(`#warningMatchSinnerName${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerName${index}`, `Name${identifier}`)
    .pause(1000)
    .click(`#btnCheckSinnerName${index}`)
    .pause(1000)
    .waitForExist(`#successMatchSinnerName${index}`)
    .pause(1000)
    .click(`#btnEditSinnerName${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerName${index}`, `Name${identifier}${index}`)
    .pause(1000)
    .click(`#btnSaveSinnerName${index}`)
    .waitForExist('.swal2-confirm')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000)
    .waitForExist('#menuHeaderSinnerPrescriptedList')
    .pause(1000)
    .click('#menuHeaderSinnerPrescriptedList')
    .pause(1000)
    .waitForExist('#msgNoData')
    .pause(1000)
    .waitForExist('#menuHeaderSinnerList')
    .pause(1000)
    .click('#menuHeaderSinnerList')
    .pause(1000)
    .waitForValue('#totalCount', 'Total: 3 sins') //3 sins in total
    .waitForExist('#txtSearchSinner')
    .pause(1000)
    .click('#txtSearchSinner')
    .setValue("#txtSearchSinner", identifier)
    .pause(1000)
    .click('#btnSearchSinner')
    .waitForExist(`#sinContainer${index}`)
    .waitForExist(`#txtFoundSinnerName${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerName${index}`, 'Name3')
    .pause(1000)
    .click(`#btnCheckSinnerName${index}`)
    .pause(1000)
    .waitForExist(`#warningMatchSinnerName${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerName${index}`, `Name${identifier}`)
    .pause(1000)
    .click(`#btnCheckSinnerName${index}`)
    .pause(1000)
    .waitForExist(`#warningMatchSinnerName${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerName${index}`, `Name${identifier}${index}`)
    .pause(1000)
    .click(`#btnCheckSinnerName${index}`)
    .pause(1000)
    .waitForExist(`#successMatchSinnerName${index}`)
    .pause(1000)

}

function _notesCheckEditSaveCheck(browser, identifier, index) {

  return browser
    .waitForValue('#totalCount', 'Total: 3 sins') //3 sins in total
    .waitUntil(function () { //check default sorting for all sins
      return browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'Notes1')]").isVisible();
    }, 2000, "Notes 1 should be first row")
    .waitUntil(function () {
      return browser.element("//table[@id='tableSins']//tr[3]//td[contains(text(),'Notes2')]").isVisible();
    }, 2000, "Notes 2 should be last row")
    .waitForExist('#txtSearchSinner')
    .pause(1000)
    .click('#txtSearchSinner')
    .setValue("#txtSearchSinner", identifier)
    .pause(1000)
    .click('#btnSearchSinner')
    .waitForExist(`#sinContainer${index}`)
    .waitForExist(`#txtFoundSinnerNotes${index}`)
    .pause(1000)
    .click(`#btnEditSinnerNotes${index}`)
    .pause(1000)
    .setValue(`#txtFoundSinnerNotes${index}`, `Notes${identifier}${index}`)
    .pause(1000)
    .click(`#btnSaveSinnerNotes${index}`)
    .waitForExist('.swal2-confirm')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000)
    .waitForExist('#menuHeaderSinnerPrescriptedList')
    .pause(1000)
    .click('#menuHeaderSinnerPrescriptedList')
    .pause(1000)
    .waitForValue('#totalCount', 'Total: 2 sins') //2 prescripted sins in total
    .pause(1000)
    .waitForExist('#menuHeaderSinnerList')
    .pause(1000)
    .click('#menuHeaderSinnerList')
    .pause(1000)
    .waitForValue('#totalCount', 'Total: 3 sins') //3 sins in total
    .waitUntil(function () { //check default sorting for all sins

      let c1 = browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'Notes1')]").isVisible();
      let c2 = browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'Notes1${index}')]").isVisible();

      return c1 || c2;

    }, 2000, "Notes 1 should be first row")
    .waitUntil(function () {

      let c1 = browser.element("//table[@id='tableSins']//tr[3]//td[contains(text(),'Notes2')]").isVisible();
      let c2 = browser.element("//table[@id='tableSins']//tr[1]//td[contains(text(),'Notes2${index}')]").isVisible();

      return c1 || c2;

    }, 2000, "Notes 2 should be last row")
    .pause(1000);

}

function _deleteSinAndCheckWasDeleted(browser, identifier, countBeforeDelete) {

  browser = browser
    .waitForValue('#totalCount', `Total: ${countBeforeDelete} sins`) //check initial count
    .waitForExist('#txtSearchSinner')
    .pause(1000)
    .click('#txtSearchSinner')
    .setValue("#txtSearchSinner", identifier)
    .pause(1000)
    .click('#btnSearchSinner')
    .waitForExist(`#sinContainer0`)
    .waitForExist(`#txtFoundSinnerNotes0`)
    .pause(1000)
    .click(`#btnDeleteSinner0`)
    .waitForExist('.swal2-confirm')
    .pause(1000)
    .click('.swal2-confirm')
    .pause(1000);

  if (countBeforeDelete - 1 > 0)
    return browser
      .waitForValue('#totalCount', `Total: ${countBeforeDelete - 1} sins`) //2 prescripted sins in total
      .pause(1000)
  else
    return browser.waitForExist('#msgNoData')
      .pause(1000)

}
