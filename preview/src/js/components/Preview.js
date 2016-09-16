const React = require('react');

module.exports = React.createClass({
    render: function () {
        const src = '/template/' + this.props.selectedTemplate;

        return (
            <iframe className="preview-template" src={src}></iframe> 
        );
    }
});