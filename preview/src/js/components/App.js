const React = require('react');
// libs
const fetch = require('../lib/fetch');
// components
const SelectTemplate = require('./SelectTemplate');
const Preview = require('./Preview');

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
	},

    render: function() {
    	return (
            <div>
                <SelectTemplate 
                	templates={this.state.templates} 
                	onSelectFormChange={this.onSelectFormChange}
                />
                <Preview 
                	selectedTemplate={this.state.selectedTemplate}
                />
            </div>
        );
    }
});