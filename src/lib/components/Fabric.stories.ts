import type { Meta, StoryObj } from '@storybook/sveltekit';
import { gamVariables } from '../../routes/templates/fabric/variables.gam';
import { gamVariables as fabricXLGamVariables } from '../../routes/templates/fabric-xl/variables.gam';
import Fabric from './Fabric.svelte';

const meta = {
	title: 'Templates/Fabric',
	component: Fabric,
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

export const XL: Story = {
	args: {
		TrackingPixel: fabricXLGamVariables.TrackingPixel,
		ResearchPixel: fabricXLGamVariables.ResearchPixel,
		ViewabilityPixel: fabricXLGamVariables.ViewabilityPixel,
		BackgroundScrollType: fabricXLGamVariables.BackgroundScrollType,
		BackgroundColour: fabricXLGamVariables.BackgroundColour,
		BackgroundImage: fabricXLGamVariables.BackgroundImage,
		BackgroundImagePosition: fabricXLGamVariables.BackgroundImagePosition,
		BackgroundImageRepeat: fabricXLGamVariables.BackgroundImageRepeat,
		Layer1BackgroundImage: fabricXLGamVariables.Layer1BackgroundImage,
		Layer1BackgroundPosition: fabricXLGamVariables.Layer1BackgroundPosition,
		Layer2BackgroundImage: fabricXLGamVariables.Layer2BackgroundImage,
		Layer2BackgroundPosition: fabricXLGamVariables.Layer2BackgroundPosition,
		Layer3BackgroundImage: fabricXLGamVariables.Layer3BackgroundImage,
		Layer3BackgroundPosition: fabricXLGamVariables.Layer3BackgroundPosition,
		MobileBackgroundImage: fabricXLGamVariables.MobileBackgroundImage,
		MobileBackgroundImagePosition:
			fabricXLGamVariables.MobileBackgroundImagePosition,
		MobileBackgroundImageRepeat:
			fabricXLGamVariables.MobileBackgroundImageRepeat,
		MobileLayer1BackgroundImage:
			fabricXLGamVariables.MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition:
			fabricXLGamVariables.MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage:
			fabricXLGamVariables.MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition:
			fabricXLGamVariables.MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage:
			fabricXLGamVariables.MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition:
			fabricXLGamVariables.MobileLayer3BackgroundPosition,
		isXL: true,
	},
};
