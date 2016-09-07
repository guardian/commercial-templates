const React = require('react');
const fetch = require('../lib/fetch');
const SelectTemplate = require('./SelectTemplate');

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
                	selectedTemplate={this.state.selectedTemplate}
                	onSelectFormChange={this.onSelectFormChange}
                />
            </div>
        );
    }
});