/*eslint no-unused-vars: "off"*/

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, PlainText, RichText, InnerBlocks } = wp.editor;
const { ToggleControl, TextareaControl, ColorPalette } = wp.components;

const el = wp.element.createElement;
