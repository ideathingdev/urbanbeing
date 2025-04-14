pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://urbabeing.s3.eu-central-1.amazonaws.com/ubLogo.png';


        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };



        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        var charge = document.createElement('div');
        splash.appendChild(charge);
        charge.id = 'charge';
        charge.innerText = "0%";


    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        var char = document.getElementById('charge');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            var perc = value * 100;
            bar.style.width = value * 100 + '%';
            char.innerText = pc.math.roundUp(perc, 1).toString() + "%";
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: WHITE;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: WHITE;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: calc(30% - 28px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',
            '',
            '#application-splash img {',
            '    width: 100%;',
            '}',
            '',
            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 4px;',
            '    width: 90%;',
            '    background-color: #747474;',
            '}',
            '',
            '#charge {',
            '     margin-top: 20px;',
            '    height: auto;',
            '    width: 100%;',
            '   text-align: center;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #165d67;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});