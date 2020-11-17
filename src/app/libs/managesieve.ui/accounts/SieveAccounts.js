/*
 * The content of this file is licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 */

import { SieveAbstractAccounts } from "./SieveAbstractAccounts.js";
import { SieveIpcClient } from "./../utils/SieveIpcClient.js";
import { SieveTemplate } from "./../utils/SieveTemplate.js";

import { SieveImportUI } from "./../importer/SieveImportUI.js";
import { SieveAccountCreateUI } from "./SieveAccountCreateUI.js";

/**
 * A UI renderer for a list of sieve accounts
 **/
class SieveNodeAccounts extends SieveAbstractAccounts {

  /**
   * @inheritdoc
   */
  async render() {

    if (!document.querySelector(".siv-accounts-items")) {

      document.querySelector(".siv-accounts").appendChild(
        (await (new SieveTemplate()).load("./accounts/accounts.tpl")));

      document.querySelector("#sieve-account-import-file")
        .addEventListener("click", async () => {
          await SieveIpcClient.sendMessage("core", "account-import");
          this.render();
        });

      document.querySelector("#sieve-account-import-thunderbird")
        .addEventListener("click", async () => {
          await (new SieveImportUI()).show();
          this.render();
        });

      document.querySelector("#sieve-account-create")
        .addEventListener("click", async () => {
          await (new SieveAccountCreateUI().show());
          this.render();
        });
    }

    super.render();
  }

  /**
   * Removes the account including all settings.
   *
   * @param {SieveAccountUI} account
   *   the account which should be removed.
   */
  async remove(account) {

    const rv = await account.send("account-delete", account.id);

    if (rv)
      await this.render();
  }

  /**
   * Create a new account, and initializes it with default settings.
   *
   * @returns {string}
   *   the accounts unique id.
   */
  async create() {
    const id = await SieveIpcClient.sendMessage("core", "account-create");
    await this.render();

    return id;
  }
}

export { SieveNodeAccounts as SieveAccounts };
