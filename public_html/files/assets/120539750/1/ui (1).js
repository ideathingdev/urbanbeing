var Ui = pc.createScript('ui');

Ui.attributes.add('css', { type: 'asset', assetType: 'css', title: 'CSS Asset' });
Ui.attributes.add('html', { type: 'asset', assetType: 'html', title: 'HTML Asset' });
var htmlUI;
Ui.prototype.initialize = function () {
    // create STYLE element
    var style = document.createElement('style');

    // append to head
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';

    // Add the HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';
    // htmlUI = div;
    // append to body
    // can be appended somewhere else
    // it is recommended to have some container element
    // to prevent iOS problems of overfloating elements off the screen
    document.body.appendChild(this.div);

    this.counter = 0;

    this.bindEvents();
};

Ui.prototype.bindEvents = function () {
    var self = this;
    // example
    //
    htmlUI = this.div.querySelector('.feed');
    // htmlUI = this.div.querySelector('.container');
    // feed.style.display = 'block';
    //htmlUI.style.top = '100%';

};

Ui.prototype.update = function (dt) {


};