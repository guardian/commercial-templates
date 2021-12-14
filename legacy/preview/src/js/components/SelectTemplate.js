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
            let templateName = template.split('/');
            templateName = `${templateName[0]} (${templateName[1]})`;
            return (
                <option value={template}>
                    {templateName}
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
