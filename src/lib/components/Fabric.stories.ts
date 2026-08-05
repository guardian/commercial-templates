import type { Meta, StoryObj } from '@storybook/sveltekit';
import { gamVariables } from '../../routes/templates/fabric/variables.gam';
import { gamVariables as fabricVideoGamVariables } from '../../routes/templates/fabric-video/variables.gam';
import { gamVariables as fabricVideoXLGamVariables } from '../../routes/templates/fabric-video-xl/variables.gam';
import { gamVariables as fabricXLGamVariables } from '../../routes/templates/fabric-xl/variables.gam';
import Fabric from './Fabric.svelte';

// stub play() so IntersectionObserver-triggered replays are no-ops
const preventVideoAutoplay = () => {
	// eslint-disable-next-line @typescript-eslint/unbound-method -- reassigned as-is, never called detached
	const originalPlay = window.HTMLMediaElement.prototype.play;
	window.HTMLMediaElement.prototype.play = () => Promise.resolve();

	return () => {
		window.HTMLMediaElement.prototype.play = originalPlay;
	};
};

// native autoplay can start before the stub above runs, so pause explicitly too
const pauseVideo = ({ canvasElement }: { canvasElement: HTMLElement }) => {
	canvasElement.querySelectorAll('video').forEach((video) => {
		video.removeAttribute('autoplay');
		video.pause();
	});
};

const meta = {
	title: 'Templates/Fabric',
	component: Fabric,
	beforeEach: preventVideoAutoplay,
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

export const Video: Story = {
	args: {
		TrackingPixel: fabricVideoGamVariables.Trackingpixel,
		ResearchPixel: fabricVideoGamVariables.Researchpixel,
		ViewabilityPixel: fabricVideoGamVariables.Viewabilitypixel,
		BackgroundColour: fabricVideoGamVariables.BackgroundColour,
		BackgroundImage: fabricVideoGamVariables.BackgroundImage,
		BackgroundImagePosition: fabricVideoGamVariables.BackgroundPosition,
		BackgroundImageRepeat: fabricVideoGamVariables.BackgroundRepeat,
		Layer1BackgroundImage: fabricVideoGamVariables.Layer1BackgroundImage,
		Layer1BackgroundPosition: fabricVideoGamVariables.Layer1BackgroundPosition,
		Layer2BackgroundImage: fabricVideoGamVariables.Layer2BackgroundImage,
		Layer2BackgroundPosition: fabricVideoGamVariables.Layer2BackgroundPosition,
		Layer3BackgroundImage: fabricVideoGamVariables.Layer3BackgroundImage,
		Layer3BackgroundPosition: fabricVideoGamVariables.Layer3BackgroundPosition,
		MobileBackgroundImage: fabricVideoGamVariables.MobileBackgroundImage,
		MobileBackgroundImagePosition:
			fabricVideoGamVariables.MobileBackgroundPosition,
		MobileBackgroundImageRepeat: fabricVideoGamVariables.MobileBackgroundRepeat,
		MobileLayer1BackgroundImage:
			fabricVideoGamVariables.MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition:
			fabricVideoGamVariables.MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage:
			fabricVideoGamVariables.MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition:
			fabricVideoGamVariables.MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage:
			fabricVideoGamVariables.MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition:
			fabricVideoGamVariables.MobileLayer3BackgroundPosition,
		VideoURL: fabricVideoGamVariables.VideoURL,
		VideoURLMobile: fabricVideoGamVariables.VideoURLMobile,
		VideoBackupImage: fabricVideoGamVariables.VideoBackupImage,
		MobileVideoBackupImage: fabricVideoGamVariables.MobileVideoBackupImage,
		VideoAlignment: fabricVideoGamVariables.VideoAlignment,
		IsFullWidthTopSlot: fabricVideoGamVariables.IsFullWidthTopSlot,
		showVideo: true,
	},
	play: pauseVideo,
};

export const VideoXL: Story = {
	args: {
		TrackingPixel: fabricVideoXLGamVariables.TrackingPixel,
		ResearchPixel: fabricVideoXLGamVariables.ResearchPixel,
		ViewabilityPixel: fabricVideoXLGamVariables.ViewabilityPixel,
		BackgroundColour: fabricVideoXLGamVariables.BackgroundColour,
		BackgroundImage: fabricVideoXLGamVariables.BackgroundImage,
		BackgroundImagePosition: fabricVideoXLGamVariables.BackgroundPosition,
		BackgroundImageRepeat: fabricVideoXLGamVariables.BackgroundRepeat,
		Layer1BackgroundImage: fabricVideoXLGamVariables.Layer1BackgroundImage,
		Layer1BackgroundPosition:
			fabricVideoXLGamVariables.Layer1BackgroundPosition,
		Layer2BackgroundImage: fabricVideoXLGamVariables.Layer2BackgroundImage,
		Layer2BackgroundPosition:
			fabricVideoXLGamVariables.Layer2BackgroundPosition,
		Layer3BackgroundImage: fabricVideoXLGamVariables.Layer3BackgroundImage,
		Layer3BackgroundPosition:
			fabricVideoXLGamVariables.Layer3BackgroundPosition,
		MobileBackgroundImage: fabricVideoXLGamVariables.MobileBackgroundImage,
		MobileBackgroundImagePosition:
			fabricVideoXLGamVariables.MobileBackgroundPosition,
		MobileBackgroundImageRepeat:
			fabricVideoXLGamVariables.MobileBackgroundRepeat,
		MobileLayer1BackgroundImage:
			fabricVideoXLGamVariables.MobileLayer1BackgroundImage,
		MobileLayer1BackgroundPosition:
			fabricVideoXLGamVariables.MobileLayer1BackgroundPosition,
		MobileLayer2BackgroundImage:
			fabricVideoXLGamVariables.MobileLayer2BackgroundImage,
		MobileLayer2BackgroundPosition:
			fabricVideoXLGamVariables.MobileLayer2BackgroundPosition,
		MobileLayer3BackgroundImage:
			fabricVideoXLGamVariables.MobileLayer3BackgroundImage,
		MobileLayer3BackgroundPosition:
			fabricVideoXLGamVariables.MobileLayer3BackgroundPosition,
		VideoURL: fabricVideoXLGamVariables.VideoURL,
		VideoURLMobile: fabricVideoXLGamVariables.VideoURLMobile,
		VideoBackupImage: fabricVideoXLGamVariables.VideoBackupImage,
		MobileVideoBackupImage: fabricVideoXLGamVariables.MobileVideoBackupImage,
		VideoAlignment: fabricVideoXLGamVariables.VideoAlignment,
		IsFullWidthTopSlot: 'no',
		isXL: true,
		showVideo: true,
	},
	play: pauseVideo,
};
