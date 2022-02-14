const React = require('react');

module.exports = React.createClass({
	onClick: function() {
		const iframe = document.querySelector('.preview-template');
		const refresh = document.querySelector('.refresh-template');

		refresh.classList.add('spin');
		
		setTimeout(function() {
			refresh.classList.remove('spin');
		}, 1000);

		iframe.contentWindow.location.reload();
	},

    render: function () {
        return (
            <div className="refresh-template" onClick={this.onClick}></div> 
        );
    }
});