/* vivipost-wp-theme - v1.0.0 - 2019-07-27*/
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload, PlainText, RichText, InnerBlocks } = wp.editor;
const { ToggleControl, TextareaControl, ColorPalette } = wp.components;

const el = wp.element.createElement;

if (window.location.hostname === 'vivipost.io'){
  var ports = ['4201'];
  ports.forEach(function(port) {
    var livereload = document.createElement('script');
    livereload.setAttribute('src','http://127.0.0.1:' + port + '/livereload.js');
    document.head.appendChild(livereload);
  });
}

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

// registerBlockType('vivipost/hero-image', {
//   title: __('Hero Image'),
//   icon: 'id',
//   category: 'vivipost',
//   keywords: [__('Hero Image'), __('vivipost')],

//   attributes: {
//     id: {
//       source: 'attribute',
//       selector: 'section',
//       attribute: 'id'
//     },
//     image: {
//         source: 'attribute',
//         selector: 'img',
//         attribute: 'src'
//     },
//     title: {
//         source: 'text',
//         selector: '.title'
//     },
//     subtitle: {
//         source: 'html',
//         selector: '.subtitle'
//     },
//     previewHTML: {
//         default: true
//     }
//   },
//   edit: (props) => {

//     if (!props.attributes.id) {
//       const id = `${Math.floor(Math.random() * 100)}`;
//       props.setAttributes({id});
//     }

//     return el('div', { className: props.className },
//         [
//             el('div', { className: 'flex-col' }, [

//                 el('div', { className: 'flex-col gts__picture' }, [
//                     el(MediaUpload, {
//                         onSelect: (media) => {
//                           props.setAttributes({ image: media.url });
//                         },
//                         type: 'image',
//                         value: props.attributes.image,
//                         render: (obj) => {
//                             if (props.attributes.image) {
//                                 return el('div', {}, [
//                                     el('img', {
//                                         className: 'flex-1 gts__picture__image',
//                                         src: props.attributes.image,
//                                         onClick: obj.open
//                                     })
//                                 ]);
//                             }
//                             return el('a', {
//                                 href: '#',
//                                 className: 'flex-1 gts__picture__image',
//                                 onClick: obj.open
//                             }, 'Select Image');
//                         }
//                     })
//                 ]),
//                 el('div', { className: 'flex-col flex-1' },
//                   el(PlainText, {
//                     className: 'gts__plain-text title',
//                     placeholder: 'Title',
//                     value: props.attributes.title,
//                     onChange: (text) => {
//                       props.setAttributes({title: text});
//                     }
//                   })
//                 ),
//                 el('div', { className: 'flex-col flex-1' },
//                     el(ToggleControl, {
//                         label: props.attributes.previewHTML ? 'Code' : 'Preview',
//                         checked: props.attributes.previewHTML,
//                         onChange: (state) => {
//                           props.setAttributes({ previewHTML: state });
//                         }
//                     }),
//                     props.attributes.previewHTML ? el(RichText, {
//                         className: 'flex-col flex-1 gts__editor gts__preview',
//                         placeholder: 'Preview',
//                         value: props.attributes.subtitle
//                     })
//                     : el(TextareaControl, {
//                         className: 'gts__editor gts__html',
//                         placeholder: 'HTML',
//                         value: props.attributes.subtitle,
//                         autoFocus: true,
//                         onChange: (text) => {
//                             props.setAttributes({subtitle: text});
//                         }
//                     })
//                 )
//             ])
//         ]
//     );

//     },
//     save: (props) => el('section', { },
//       [
//         el('div', {
//           dangerouslySetInnerHTML: {
//             __html: '</div></section></div><!-- entry-content --></article></main></div><!-- content-area -->'
//           }
//         }),

//         el('div', { className: 'wrapper' },
//             [
//                 el('div', {
//                     className: 'hero-image',
//                     style: {
//                       backgroundImage: `url('${props.attributes.image}')`
//                     }
//                 }),
//                 el('h4', { className: 'title'}, props.attributes.title),
//                 el('div', {
//                   className: 'subtitle',
//                   dangerouslySetInnerHTML: {
//                     __html: props.attributes.subtitle
//                   }
//                 })
//             ]
//         ),

//         el('div', {
//           className: 'site-content site-content2',
//            wdangerouslySetInnerHTML: {
//             __html: '<main><article><div><section class="wp-block-vivipost-hero-image">'
//           }
//         })
//       ]
//     )
// });
