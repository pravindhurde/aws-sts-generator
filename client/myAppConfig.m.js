import palette from './node_modules/zsui/src/configuration/palette.m.js';
import zsuiConfig from './node_modules/zsui/src/configuration/config.m.js';
import zsuiInverseConfig from './node_modules/zsui/src/configuration/config.inverse.m.js';

// Custom application settings
const applicationConfig = {
	tooltipBackground: palette.king[100],	
	myDivBorderSize: '3px'
}

// Override and export system configuration
const zsuiCustomConfig =  Object.assign({}, zsuiConfig, applicationConfig);

// Override and export an inverse system configuration
const zsuiCustomInverseConfig = Object.assign({}, zsuiInverseConfig, applicationConfig);

export default {app: applicationConfig, ui: zsuiCustomConfig, inverse: zsuiCustomInverseConfig};