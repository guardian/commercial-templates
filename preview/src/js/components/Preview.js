const React = require('react');

module.exports = React.createClass({
    componentDidMount: function() {
        let iframe = this.refs.iframe.getDOMNode();
        iframe.onload = () => iframe.contentWindow.postMessage(JSON.stringify({ id: 'test', host: 'http://localhost:7000', preview: 'true'}), 'http://localhost:7000');
    },

    render: function () {
        const src = '/template/' + this.props.selectedTemplate;

        return (
            <meta name="viewport" content="width=device-width, initial-scale=1"><iframe ref="iframe" className="preview-template" src={src}></iframe></meta>
        );
    }
});
