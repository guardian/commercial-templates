const React = require('react');
// libs
const fetch = require('../lib/fetch');
const messenger = require('../lib/messenger');
// components
const SelectTemplate = require('./SelectTemplate');
const Preview = require('./Preview');
const Refresh = require('./Refresh');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			selectedTemplate: '',
			templates: []
		};
	},

	onSelectFormChange: function (id) {
		this.setState({
            selectedTemplate: id
        });
    },

	componentDidMount: function() {
		fetch({
			method: 'GET',
        	url: '/templates'
		}).then(function (data) {
			data = JSON.parse(data);

			if (data.templates) {
				this.setState({
					templates: data.templates
				});
			}
		}.bind(this)).catch(function (err) {
            console.error('Argh, there was an error!');
        });
		// return font styles to iframe
		messenger.register('get-styles', this.getStyles);
		// resize iframe height on resize message
		messenger.register('resize', this.resizeIframe);
		// resize iframe height on window resize
		window.addEventListener('resize', this.resizeIframe);
	},

	getStyles: function(data) {
		const styleSheets = document.querySelectorAll(data.value.selector),
			  results = Array.from(styleSheets, s => s.textContent);

		return results;
	},

	resizeIframe: function() {
		const iframe = document.querySelector('.preview-template');

		iframe.style.height = 'auto';
		iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
	},

    render: function() {
    	return (
            <div>
                <SelectTemplate 
                	templates={this.state.templates} 
                	onSelectFormChange={this.onSelectFormChange}
                />
                <Refresh
                	onRefresh={this.onRefresh}
                />
                <Preview 
                	selectedTemplate={this.state.selectedTemplate}
                />
            </div>
        );
    }
});