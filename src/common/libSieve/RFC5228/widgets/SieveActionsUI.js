/*
 * The contents of this file are licensed. You may obtain a copy of
 * the license at https://github.com/thsmi/sieve/ or request it via
 * email from the author.
 *
 * Do not remove or change this comment.
 *
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 *
 */

/* global window */

(function () {

  "use strict";

  /* global $: false */
  /* global SieveActionBoxUI */
  /* global SieveDesigner */
  /* global SieveActionDialogBoxUI */

  /**
   * Provides a UI for the stop action
   */
  class SieveStopUI extends SieveActionBoxUI {

    /**
     * @inheritDoc
     */
    getSummary() {
      return $("<div/>")
        .text("End Script (Stop processing)");
    }
  }

  /**
   * Provides a UI for the discard action
   */
  class SieveDiscardUI extends SieveActionBoxUI {

    /**
     * @inheritDoc
     */
    getSummary() {
      return $("<div/>")
        .text("Discard message silently");
    }
  }

  /**
   * Provides a UI for the keep action
   */
  class SieveKeepUI extends SieveActionBoxUI {

    /**
     * @inheritDoc
     */
    getSummary() {
      return $("<div/>")
        .text("Keep a copy in the main inbox");
    }
  }


  /**
   * Provides an UI for the redirect action
   */
  class SieveRedirectUI extends SieveActionDialogBoxUI {

    /**
     *  Gets and/or sets the redirect address
     *
     *  @param  {string} [address]
     *    optional the new address which should be set.
     *
     *  @returns {string} the current address
     */
    address(address) {
      return this.getSieve().getElement("address").value(address);
    }

    /**
     * @inheritDoc
     */
    getTemplate() {
      return "./RFC5228/templates/SieveRedirectActionUI.html";
    }

    /**
     * @inheritDoc
     */
    onSave() {

      let address = $("#sivRedirectAddress");

      if (address[0].checkValidity() === false) {
        address.addClass("is-invalid");
        return false;
      }

      let value = address.val();

      if (value.trim() === "") {
        address.addClass("is-invalid");
        return false;
      }

      this.address(value);
      return true;
    }

    /**
     * @inheritDoc
     */
    onLoad() {
      $("#sivRedirectAddress").val(this.address());
    }

    /**
     * @inheritDoc
     */
    getSummary() {
      return $("<div/>")
        .html("Redirect message to " +
          "<em>" + $('<div/>').text(this.address()).html() + "</em>");
    }
  }

  /**
   * A UI for the fileinto action
   */
  class SieveFileIntoUI extends SieveActionDialogBoxUI {

    /**
     *  Gets and/or Sets the FileInto's paths
     *
     *  @param  {string} [value]
     *    optional the new path which should be set.
     *
     *  @returns {string} the current file into path
     */
    path(value) {
      return this.getSieve().getElement("path").value(value);
    }

    /**
     * @inheritDoc
     */
    getTemplate() {
      return "./RFC5228/templates/SieveFileIntoActionUI.html";
    }

    /**
     * @inheritDoc
     */
    onSave() {

      let path = $("#sivFileIntoPath");

      let value = path.val();
      if (value.trim() === "") {
        path.addClass("is-invalid");
        return false;
      }

      this.path(value);
      return true;
    }

    /**
     * @inheritDoc
     */
    onLoad() {
      $("#sivFileIntoPath").val(this.path());
    }

    /**
     * @inheritDoc
     */
    getSummary() {
      return $("<div/>")
        .html("Save message into:" +
          "<div><em>" + $('<div/>').text(this.path()).html() + "</em></div>");
    }
  }


  if (!SieveDesigner)
    throw new Error("Could not register Action Widgets");


  SieveDesigner.register("action/discard", SieveDiscardUI);
  SieveDesigner.register("action/keep", SieveKeepUI);
  SieveDesigner.register("action/stop", SieveStopUI);

  SieveDesigner.register("action/fileinto", SieveFileIntoUI);
  SieveDesigner.register("action/redirect", SieveRedirectUI);

})(window);
