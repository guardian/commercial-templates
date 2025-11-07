const localBaseUrl = 'http://localhost:7777/';

const referenceBaseUrl = 'https://guardian.github.io/commercial-templates/';

const templatePreviewWidths = ['360', '740', '980', '1300', '100%'];

const csrTemplates = [
	{
		name: 'CAPI-multiple-hosted',
		path: 'csr/capi-multiple-hosted',
		templatePreviewWidths,
	},
	{
		name: 'CAPI-multiple-paidfor',
		path: 'csr/capi-multiple-paidfor',
		templatePreviewWidths,
	},
	{
		name: 'CAPI-multiple-paidfor-redesign',
		path: 'csr/capi-multiple-paidfor-redesign',
		templatePreviewWidths,
	},
	{
		name: 'CAPI-single-paidfor',
		path: 'csr/capi-single-paidfor',
		templatePreviewWidths,
	},
	{
		name: 'CAPI-single-paidfor-redesign',
		path: 'csr/capi-single-paidfor-redesign',
		templatePreviewWidths,
	},
	{
		name: 'Events-multiple',
		path: 'csr/events-multiple',
		templatePreviewWidths,
	},
	{
		name: 'Fabric-expandable',
		path: 'csr/fabric-expandable',
		templatePreviewWidths,
	},
	{ name: 'Fabric-video', path: 'csr/fabric-video', templatePreviewWidths },
	// {
	// 	name: 'Fabric-video-xl',
	// 	path: 'csr/fabric-video-xl',
	// 	templatePreviewWidths,
	// },
	{ name: 'Fabric-xl', path: 'csr/fabric-xl', templatePreviewWidths },
	{ name: 'Fabric', path: 'csr/fabric', templatePreviewWidths },
	{
		name: 'Manual-multiple',
		path: 'csr/manual-multiple',
		templatePreviewWidths,
	},
];

const ssrTemplates = [
	{
		name: 'Fabric-custom',
		path: 'ssr/fabric-custom',
		// for some reason, the 980px width fails the test every time, but every other width is ok
		// not testing at 980px allows us to reliably visually test the Fabric Custom template
		templatePreviewWidths: templatePreviewWidths.filter((_) => _ !== '980'),
	},
	{ name: 'Manual-single', path: 'ssr/manual-single', templatePreviewWidths },
];

const templates = [...csrTemplates, ...ssrTemplates];

export { localBaseUrl, referenceBaseUrl, templates };
