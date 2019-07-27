/* global PlainText, ToggleControl, MediaUpload, TextareaControl, RichText, registerBlockType, el */

registerBlockType('vivipost/full-width', {
  title: __('Full Width'),
  icon: 'editor-justify',
  category: 'vivipost',
  keywords: [__('Full Width'), __('vivipost')],

  attributes: {},
  edit: (props) => {
    return el(InnerBlocks,
      {
        className: props.className,
        template: [
          ['core/columns', {}, []]
        ],
        templateLock: false
      }
    );
  },
  
  save: (props) => {
    return el('div', { className: props.className }, 
      el('div', { className: 'container' }, [
        el(InnerBlocks.Content, {}, [])
      ])
    );
  }
});
