import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/sveltekit';
import { gamVariables } from '../../routes/templates/fabric/variables.gam';
import Fabric from './Fabric.svelte';

const meta = {
	title: 'Templates/Fabric',
	component: Fabric,
	parameters: {
		chromatic: {
			viewports: [
				360,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.wide,
				1600,
			],
		},
	},
	args: {
		TrackingPixel: gamVariables.Trackingpixel,
		ResearchPixel: gamVariables.Researchpixel,
		ViewabilityPixel: gamVariables.Viewabilitypixel,
		BackgroundScrollType: gamVariables.BackgroundScrollType,
		BackgroundColour: gamVariables.BackgroundColour,
		BackgroundImage: gamVariables.BackgroundImage,
		BackgroundImagePosition: gamVariables.BackgroundImagePosition,
		BackgroundImageRepeat: gamVariables.BackgroundImageRepeat,
		Layer1BackgroundImage: gamVariables.Layer1BackgroundImage,
		Layer1BackgroundPosition: gamVariables.Layer1BackgroundPosition,
		Layer2BackgroundImage: gamVariables.Layer2BackgroundImage,
		Layer2BackgroundPosition: gamVariables.Layer2BackgroundPosition,
		Layer3BackgroundImage: gamVariables.Layer3BackgroundImage,
		Layer3BackgroundPosition: gamVariables.Layer3BackgroundPosition,
		MobileBackgroundImage: gamVariables.MobileBackgroundImage,
		MobileBackgroundImagePosition: gamVariables.MobileBackgroundImagePosition,
		MobileBackgroundImageRepeat: gamVariables.MobileBackgroundImageRepeat,
		MobileLayer1BackgroundImage: gamVariables.MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition: gamVariables.MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage: gamVariables.MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition: gamVariables.MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage: gamVariables.MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition: gamVariables.MobileLayer3BackgroundPosition,
		IsFullWidthTopSlot: 'no',
	},
} satisfies Meta<typeof Fabric>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
