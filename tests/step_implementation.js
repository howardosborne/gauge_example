/* globals step,beforeScenario*/

"use strict";
const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require("assert");
var driver;
const { doesNotMatch, IsTrue } = require("assert");
const { title } = require('process');

// --------------------------
// Gauge step implementations
// --------------------------
step("homepage has valid contact link", async function () {
    var contact_link = await driver.findElement(By.xpath("//a[text()='Contact Us']"));
    var contact_href = contact_link.getAttribute("href");
    assert.ok(contact_href.contains("/Pages/ContactUs.aspx"));
});

step("new user registers through happy path", async function () {
  //  this is an example of something quick to write but not very versatile
    await driver.findElement(By.xpath("//a[@href='/Pages/UserProfile.aspx?mode=new']")).click();
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$emailBox")).sendKeys("justignore@example.com");
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$emailBoxConfirm")).sendKeys("justignore@example.com");
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$passwordBox")).sendKeys("JustIgnore");
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$confirmPasswordBox")).sendKeys("JustIgnore");
    await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Title']/option[4]")).click();
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$FirstName")).sendKeys("Bob");
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$Surname")).sendKeys("Jones");
    await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Day']/option[6]")).click();
    await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Month']")).click();
    await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Month']")).sendKeys("Mar");
    await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Year']")).click();
    await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Year']")).sendKeys("1980");    
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$HomeAddress1")).sendKeys("1 High Street");
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$HomeAddressCountry")).sendKeys("United Kingdom");
    await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$HomeAddressPostcode")).sendKeys("AB1 2AS");
            //check now on correct page
    var title = await driver.getTitle();
    var expected_title = /Register/
    assert.ok(expected_title.test(title));
});

//these steps could be put in their own file - a bit like a page object
step("click register link", async function () {
  await driver.findElement(By.xpath("//a[@href='/Pages/UserProfile.aspx?mode=new']")).click();
});
step("fill in email field with <email>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$emailBox")).sendKeys(input_text);
});
step("fill in email confirm with <email>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$emailBoxConfirm")).sendKeys(input_text);
});

step("fill in password field with <password>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$passwordBox")).sendKeys("JustIgnore");
});
step("fill in password confirm with <password>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$confirmPasswordBox")).sendKeys("JustIgnore");
});
step("fill in title field with <title>", async function (input_text) {
  var field = await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Title']/option[text()='" + input_text + "']")).click();
  //field.sendKeys(input_text);
});
step("fill in first name field with <first_name>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$FirstName")).sendKeys(input_text);
});
step("fill in surname field with <surname>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$Surname")).sendKeys(input_text);
});
step("fill in birthday day field with <day>", async function (input_text) {
  var field = await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Day']/option[text()='" + input_text + "']")).click();
});
step("fill in birthday month field with <month>", async function (input_text) {
  var field = await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Month']/option[text()='" + input_text + "']")).click();
});
step("fill in birthday year field with <year>", async function (input_text) {
  var field = await driver.findElement(By.xpath("//select[@name='ctl00$PlaceHolderMain$registrationControl$Birthday$Year']/option[text()='" + input_text + "']")).click();
});
step("fill in address1 field with <address1>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$HomeAddress1")).sendKeys(input_text);
});
step("fill in country field with <country>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$HomeAddressCountry")).sendKeys(input_text);
});
step("fill in postcode field with <postcode>", async function (input_text) {
  await driver.findElement(By.name("ctl00$PlaceHolderMain$registrationControl$HomeAddressPostcode")).sendKeys(input_text);
});

step("check on registration page", async function () {
  var title = await driver.getTitle();
  var expected_title = /Register/
  assert.ok(expected_title.test(title),"expect title to be Register");
});

// ---------------
// Execution Hooks
// ---------------

beforeScenario(async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://portal.jerseyfsc.org/');
});

afterScenario(async function (){
  await driver.quit();
});