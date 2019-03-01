
    loadUserConfig(tenant) {
        var fs = require('fs');

        var configFolder = this.getUserConfigPath(tenant);

        if (!configFolder) {
            return;
        }

        if (!fs.existsSync(configFolder)) {
            let fromStorage = Creator.App.get(tenant + this._defaultConfig.app.keyUserConfig);
            fs.writeFileSync(configFolder, fromStorage || '{}');
        }

        var json = fs.readFileSync(configFolder);

        try {
            this._userConfig = JSON.parse(json);
        }
        catch (exc) {
            Log.error('[ConfigManager.loadUserConfig]' +
                ` Failed to parse user config: "${json}"`);

            return;
        }

        if (this._userConfig === null) {
            this._userConfig = {};
        }

        Log.log('[ConfigManager.loadUserConfig] Loaded user config.');
    },


    /**
     * Save the user config.
     * @param {Object|null} config User config to save.
     * @param {Number|null} tenant Tenant index. Defaults to the current user.
     */
    saveUserConfig(config, tenant) {
        var fs = require('fs');

        if (config && this._userConfig) {
            config = $.extend(true, {}, this._userConfig, config);
        }
        else {
            config = config || this._userConfig;
        }

        tenant = tenant || Creator.App.get('tenant');
        var configFolder = this.getUserConfigPath(tenant);

        if (!configFolder) {
            return;
        }

        var json = null;

        try {
            json = JSON.stringify(config);
            fs.writeFileSync(configFolder, json);
        }
        catch (exc) {
            Log.error('[ConfigManager.saveUserConfig]' +
                ' Failed to stringify config: ' + config);

            return;
        }

        Creator.App.set(tenant + Creator.Config.app.keyUserConfig, json);

        Log.debug('[ConfigManager.saveUserConfig]' +
            ' Saved user config. JSON length: ' + json.length);

        this.loadUserConfig(tenant);
    }