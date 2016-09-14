const React = require('react');

module.exports = React.createClass({
    handleSelectChange: function (e) {
        if (e.target.value) {
            this.value = e.target.value;
        } else {
            delete this.value;
        }

        this.props.onSelectFormChange(this.value || '');
    },

    render: function () {
        const listItems = this.props.templates.map(function (template) {
            return (
                <option value={template}>
                    {template}
                </option>
            );
        });

        return (
            <div className='select-container'>
                <select className='select-template' onChange={this.handleSelectChange}>
                    <option value=''>
                        Please select...    
                    </option>
                    {listItems}
                </select>
            </div>
        );
    }
});