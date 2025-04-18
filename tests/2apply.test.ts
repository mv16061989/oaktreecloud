const { test, expect } = require('@playwright/test');
const { Locators } = require('../Pages/Workcardoperations');
import * as fs from 'fs/promises';

async function loadTestData(user: string) {
  const data = await fs.readFile('./loginInfo.json', 'utf-8');
  return JSON.parse(data)[user];
}

test('Login by using Email and password', async ({ page }) => {
  test.setTimeout(100000);
  const testData = await loadTestData('user1');
  const locators = new Locators(page);
  const tempData = JSON.parse(await fs.readFile('./tempEmail.json', 'utf-8'));
  await test.step('1.Update address details', async () => {
  await locators.navigateToNewApplicationPage(testData.applicationPageUrl,tempData.email,testData.password);
  });

  await test.step('2.Fill all the mandatory address details', async () => {
    await locators.fillAddressDetails(
      testData.streetAddress,
      testData.state,
      testData.city,
      testData.zipCode,
      testData.country
    );
  });
});