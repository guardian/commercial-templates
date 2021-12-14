const React = require('react');
const ReactDOM = require('react-dom');

module.exports = React.createClass({
    componentDidMount: function() {
        let iframe = ReactDOM.findDOMNode(this.refs.iframe);
        iframe.onload = () => iframe.contentWindow.postMessage(JSON.stringify({ id: 'test', host: 'http://localhost:7000', preview: 'true'}), 'http://localhost:7000');
    },

    render: function () {
        const src = '/template/' + this.props.selectedTemplate;

        return (
            <iframe ref="iframe" id="test" className="preview-template" src={src}></iframe>
        );
    }
});
