
'use strict';

{
class _window {

    /**
     * Open the "support-Tools" window.
     * @constructor
     * @param {Object} options
     * @param {Object} initData
     */
    constructor(options, initData) {
        if (App.UI.Window.SupportTools.INSTANCE ) {
            return App.UI.Window.SupportTools.INSTANCE;
        }

        this._window = $('<div id="window-support-tools"></div>').kendoWindow({
            actions: ['Close'],
            modal: true,
            position: {
                left: initData.pos ? initData.pos.x : null,
                top: initData.pos ? initData.pos.y : null
            },
            resizable: false,
            title: 'AIO App Neo Support',

            deactivate: (ev) => {
                App.UI.Window.SupportTools.INSTANCE = null;
                App.UI.Window.destroy(this._window, initData.name);
            }
        }).data('kendoWindow');

        this._initContent();
        this._initButtons();

        if (typeof initData.pos == 'undefined' || initData.pos === null) {
            this._window.center();
        }

        this._window.open();

        App.UI.Window.SupportTools.INSTANCE = this;
    }


    /**
     * Initialize the buttons.
     */
    _initButtons() {
        var $win = this._window.element;
        var aioName = nw.App.manifest.name;
        var path = require('path');
        var logFilePath = path.join(App.App.getUserDir(), 'logs', aioName + '.log');
        var fs = require('fs');

        var $btnShowLog = $win.find('button#showlog');
        $btnShowLog.on('click' , function() {
            if (fs.existsSync(logFilePath)) {
                nw.Shell.showItemInFolder(logFilePath);
            }
            else {
                Notify.error(Utils.t('errorGetLogFile'), 4000);
            }
        });

        var $btnShowUser = $win.find('button#showuser');
        $btnShowUser.on('click' , function() {
            if (fs.existsSync(App.Tenant.getData().folder)) {
                nw.Shell.showItemInFolder(App.Tenant.getData().folder);
            }
            else {
                Notify.error(Utils.t('errorGetUserDir'), 4000);
            }
        });

        var $btnShowRemote = $win.find('button#showremote');
        $btnShowRemote.on('click' , function() {
            if (fs.existsSync(App.Remote.getCurrent().getMetaData().folder)) {
                nw.Shell.showItemInFolder(App.Remote.getCurrent().getMetaData().folder);
            }
            else {
               Notify.error(Utils.t('remoteListEmpty'), 4000);
            }
        });

    }


    /**
     * Initialize the content.
     */
    _initContent() {
        // create html content with jquery instead nunchuck
        var $logText = $('<p></p>').text(Utils.t('showLogFileInFolder'));
        var $logButton = $('<button id="showlog" class="btn-icon-circle icon icon-open"></button>');

        var $userText = $('<p></p>').text(Utils.t('showUserFileInFolder'));
        var $userButton = $('<button id="showuser" class="btn-icon-circle icon icon-open"></button>');

        var $remoteText = $('<p></p>').text(Utils.t('showRemoteFileInFolder'));
        var $remoteButton = $('<button id="showremote" class="btn-icon-circle icon icon-open"></button>');

        var $content = [$logText, $logButton, $userText, $userButton, $remoteText, $remoteButton];
        this._window.content($content);

        this._window.element.append($logText);
        $logText.append($logButton);

        $logButton.after($userText);
        $userText.append($userButton);

        $userButton.after($remoteText);
        $remoteText.append($remoteButton);
    }

}


_window.INSTANCE = null;

let UiWin = App.UI.Window;
UiWin.SupportTools = _window;
UiWin.NAMED_CLASSES[UiWin.WINDOW.SUPPORT_TOOLS] = _window;

}
