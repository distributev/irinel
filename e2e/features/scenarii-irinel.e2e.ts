import testUtils from '../common/utils';
import * as moment from 'moment';

describe('tests-scenarii-irinel', () => {

  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  //scenariul 1. bagi nume&prenume....apesi insert --> il baga in lista daca nu e
  it('should add a sin', function () {

    this.timeout(25000);

    let browser = _init(this.app.client);

    return _addSinNel(browser, '1');

  });

  //scenariul 2: bagi nume&prenume  ... apesi Cauta --> il cauti in lista (dupa hash value)
  it('should find existing sins', function () {

    this.timeout(25000);

    let browser = _init(this.app.client);

    browser = _addSinNel(browser, '1').pause(5000);

    return _findSin(browser, '1', 'should.exist');

  });

  //scenariul 3 --> delete
  it('should allow deleting sins found by ID', function () {

    this.timeout(50000);

    let browser = _init(this.app.client);

    browser = _addSinNel(browser, '1').pause(5000);
    browser = _findSin(browser, '1', 'should.exist').pause(5000);
    browser = _deleteSin(browser).pause(5000);

    return _findSin(browser, '1', 'should.not.exist');

  })

  //ai nevoie si de o perioada de retention limitata...nu poti sa il tii acolo nelimitat
  it('should prescribe sins older than a prescription period', function () {

    this.timeout(100000);

    let browser = _init(this.app.client);

    browser = _addSin(browser, '1').pause(5000);
    browser = _findSin(browser, '1', 'should.exist').pause(5000);

    browser = _addSin(browser, '2', 'prescripted').pause(5000);
    browser = _findSin(browser, '2', 'should.exist').pause(5000);

    browser = _addSin(browser, '3', 'prescripted').pause(5000);
    browser = _findSin(browser, '3', 'should.exist').pause(5000);

    return browser
      .pause(1000)
      .waitForValue('#totalCount', 'Total: 3 sins') //3 sins in total
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .waitForValue('#totalCount', 'Total: 2 sins') //2 sins should be prescripted
      .waitForExist('#btnGiveAmnesty')
      .pause(1000)
      .click('#btnGiveAmnesty')
      .waitForExist('.swal2-confirm')
      .pause(1000)
      .click('.swal2-cancel')
      .pause(1000)
      .click('#btnGiveAmnesty')
      .waitForExist('.swal2-confirm')
      .pause(1000)
      .click('.swal2-confirm')
      .pause(1000)
      .waitForExist('#msgNoData') // no prescripted sins
      .waitForExist('#menuHeaderSinnerList')
      .pause(1000)
      .click('#menuHeaderSinnerList')
      .pause(1000)
      .waitForValue('#totalCount', 'Total: 1 sins') //1 sin remaing only
      .waitForExist('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .click('#menuHeaderSinnerPrescriptedList')
      .pause(1000)
      .waitForExist('#msgNoData'); // no prescripted sins

  })

});

function _init(browser) {

  return browser.waitUntilWindowLoaded()
    .browserWindow.focus()

}

function _addSinNel(browser, identifier, prescripted = 'no') {

  let sinDate = moment();

  if (prescripted == 'prescripted')
    sinDate = moment().subtract(4, 'years');

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
    .setValue("#txtName", 'Nel')
    .pause(1000)
    .click('#txtNotes')
    .setValue("#txtNotes", 'the only sinless')
    .pause(1000)
    .click('#txtDate')
    .setValue("#txtDate", formattedSinDate)
    .pause(1000)
    .click('#txtNotes')
    .pause(1000)
    .click('#btnSaveSin')
    .pause(1000)
    .waitUntil(function () {
      return browser.element("//*[contains(text(),'the only sinless')]").isVisible();
    }, 2000, "Failed adding a new sin - Could not find 'the only sinless'");

}

function _addSin(browser, identifier, prescripted = 'no') {

  let sinDate = moment();

  if (prescripted == 'prescripted')
    sinDate = moment().subtract(4, 'years');

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
    .pause(1000)
    .waitUntil(function () {
      return browser.element(`//*[contains(text(),'Notes${identifier}')]`).isVisible();
    }, 2000, `Failed adding a new sin - Could not find 'Notes${identifier}'`);

}

function _findSin(browser, identifier, expectedResult) {

  let waitForElement;

  if (expectedResult == 'should.exist')
    waitForElement = '#sinContainer0';
  else
    waitForElement = '#msgNotFound';

  return browser
    .waitForExist('#txtSearchSinner')
    .pause(1000)
    .click('#txtSearchSinner')
    .setValue("#txtSearchSinner", identifier)
    .pause(1000)
    .click('#btnSearchSinner')
    .pause(1000)
    .waitForExist(waitForElement);

}

function _deleteSin(browser) {

  return browser
    .waitForExist('#btnDeleteSinner0')
    .pause(1000)
    .click('#btnDeleteSinner0')
    .waitForExist('.swal2-confirm')
    .pause(1000)
    .click('.swal2-cancel')
    .pause(1000)
    .click('#btnDeleteSinner0')
    .waitForExist('.swal2-confirm')
    .pause(1000)
    .click('.swal2-confirm')

}
