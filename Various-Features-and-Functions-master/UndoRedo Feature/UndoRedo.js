    /**
     * Initialize the undo/redo buttons.
     */

    _initUndoRedo() {
        let startTime, endTime, longpress;
        let mouseDownTime;
        let self = null;

        let $ulUnReDo = $('<ul class="HistoryUl"></ul>');
        let $area = $('#layout .main-header');
        $area.after($ulUnReDo);

        let $layout = $('#layout');
        $layout.find('ul.HistoryUl').hide();
        let $ulHistory = $layout.find('ul.HistoryUl');

        let historyLength = 0;

        let $undoText = $('<li><span>' + Utils.t('undo') + '</span></li>');
        let $redoText = $('<li><span>' + Utils.t('redo') + '</span></li>');

        self = this;

        $area.find('.history').on('mousedown', function(ev) {
            startTime = $.now();
            mouseDownTime = setTimeout(function() {
                $ulHistory.empty();
                let cls = ev.target.className;
                let p = App.Remote.getCurrent().getPage();
                if (!p) { return; }
                if (cls.indexOf('back') >= 0) {
                    historyLength = p._history.length;
                    if (historyLength !== 0) {
                        for (let index = historyLength - 1; index >= 0; index--) {
                            $ulHistory.append($('<li>' + p._history[index].cmd + ': ' + p._history[index].el.classid + '</li>'));
                            if (historyLength - index > 19) { break; }
                        }
                        $ulHistory.prepend($undoText);
                    }
                }
                else if (cls.indexOf('forward') >= 0) {
                    historyLength = p._historyUndone.length;
                    if (historyLength !== 0) {
                        for (let index = historyLength - 1; index >= 0; index--) {
                            $ulHistory.append($('<li>' + p._historyUndone[index].cmd + ': ' + p._historyUndone[index].el.classid + '</li>'));
                            if (historyLength - index > 19) { break; }
                        }
                        $ulHistory.prepend($redoText);
                    }
                }
                $ulHistory.show();

                $layout.find('ul.HistoryUl li').on('click', function() {
                    let nthChange = $(this).index();
                    for (let index = 0; index < nthChange; index++) {
                        if (cls.indexOf('back') >= 0) {
                            self._undoLast();
                        }
                        else if (cls.indexOf('forward') >= 0) {
                            self._redoLast();
                        }
                    }
                    $ulHistory.hide();
                });

            }, 2000);

        });
