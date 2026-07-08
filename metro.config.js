// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 3D 모델 파일(glb/gltf)을 에셋으로 번들에 포함
config.resolver.assetExts.push("glb", "gltf", "bin");

module.exports = config;
