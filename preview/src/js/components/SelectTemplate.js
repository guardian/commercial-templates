// modules
var React = require('react'),
    ReactDOM = require('react-dom');

module.exports = React.createClass({
    handleSelectChange: function (e) {
        if (e.target.value) {
            this.value = e.target.value;
        } else {
            delete this.value;
        }

        this.props.onSelectFormChange(this.value);
    },

    render: function () {
        var listItems = this.props.templates.map(function (template) {
            return (
                <option value={template}>
                    {template}
                </option>
            );
        }.bind(this));

        return (
            <select className='select-template' onChange={this.handleSelectChange}>
                <option value=''>
                    Please select...    
                </option>
                {listItems}
            </select>
        );
    }
});