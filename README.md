# uni-chatroom

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/uni-chained-select-field) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/32499/branches/1079031/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=32499&bid=1079031)

&lt;uni-chatroom /> is an encapsulated Web Component built upon the foundation of the uniopen design language. It leverages the native Popover API to present an isolated, embedded iframe environment, empowering developers to deploy custom interactive chat workflows directly within their application viewports without compromising host-level styling.

Implementation is straightforward: simply declare the component and trigger its presentation through native button invokers or programmatic controls, while mapping your embedded content through the designated chat slot. The component seamlessly orchestrates top-layer elevation, fluid open-and-close transitions, and header controls—delivering an immersive, polished messaging interface that aligns harmoniously with uniopen visual guidelines and modern web standards.

![<uni-chatroom />](https://blog.lalacube.com/mei/img/preview/uni-chatroom.png)

## Basic Usage

&lt;uni-chatroom /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;uni-chatroom />'s html structure and everything will be all set.

- Required Script

  ```html
  <script
    type="module"
    src="https://unpkg.com/@meistudioli/uni-chatroom/mjs/wc-uni-chatroom.js">        
  </script>
  ```

- Structure
 
  Put &lt;uni-chatroom /> into HTML document. It will have different functions and looks with attribute mutation.

  ```html
  <uni-chatroom>
    <iframe
      slot="chat"
      src="https://chat.iopenmall.tw/#/"
      sandbox="allow-scripts allow-same-origin allow-presentation"
    ></iframe>
  </uni-chatroom>
  ```

## JavaScript Instantiation

&lt;uni-chatroom /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { UniChatroom } from 'https://unpkg.com/@meistudioli/uni-chatroom/mjs/wc-uni-chatroom.js';

const iframeTemplate = document.querySelector('.iframe-chatroom');

// use DOM api
const nodeA = document.createElement('uni-chatroom');
nodeA.appendChild(iframeTemplate.content.cloneNode(true));
document.body.appendChild(nodeA);

// new instance with Class
const nodeB = new UniChatroom();
nodeB.appendChild(iframeTemplate.content.cloneNode(true));
document.body.appendChild(nodeB);
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;uni-chatroom />'s looking.

```html
<style>
uni-chatroom {
  --uni-chatroom-subject: '敲敲話';
  --uni-chatroom-safe-padding: 16px;
  --uni-chatroom-window-inline-size: 640px;
  --uni-chatroom-window-block-size: 500px;
  --uni-chatroom-border-radius: 28px 28px 0 0;
  --uni-chatroom-head-padding-inline: 20px 10px;
  --uni-chatroom-transition-duration: .35s;
  --uni-chatroom-inset: auto var(--uni-chatroom-safe-padding) 0 auto;
}
</style>
```

## Attribute

&lt;uni-chatroom /> component exposes a curated set of attributes, enabling developers to dynamically adjust the user interface. This provides the flexibility to tailor the component’s appearance to seamlessly adapt to any given context.

- **popover**

  Specifies the dismiss and interaction behavior of the overlay surface via the native Popover API. Accepts `auto`, `manual`, or `hint` to dictate whether the expanded viewport triggers light-dismiss upon outside clicks, relies strictly on explicit toggles, or follows ephemeral contextual cues. Defaults to `auto`.

  ```html
  <uni-chatroom
    popover="auto"
  >
    <iframe
      slot="chat"
      src="https://chat.iopenmall.tw/#/"
      sandbox="allow-scripts allow-same-origin allow-presentation"
    ></iframe>
  </uni-chatroom>
  ```


## Property

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| popover | String | Reflects the corresponding popover attribute, enabling programmatic access to inspect or modify the overlay surface's interaction and dismiss mode. Accepts and returns a string value of "`auto`", "`manual`", or "`hint`", synchronizing dynamically with the underlying native popover instance. Defaults to "`auto`". |

## Events
| Event Signature | Description |
| ----------- | ----------- |
| uni-chatroom-toggle | Dispatched synchronously whenever the overlay surface transitions between visibility states, mirroring the native toggle event lifecycle. Emitted as a CustomEvent, the payload exposes `newState` and `oldState` ("`open`" | "`closed`") under event.detail, enabling consumers to orchestrate tailored application workflows across distinct stages of expansion and dismissal. |
| msc-chatroom-beforetoggle | Dispatched immediately before the overlay surface transitions between visibility states, mirroring the native beforetoggle event lifecycle. Emitted as a CustomEvent, the payload exposes newState and oldState ("open" | "closed") under event.detail, enabling consumers to inspect incoming state changes or execute preparatory logic prior to the actual expansion or dismissal transition. |

## Method
| Mathod Signature | Description |
| ----------- | ----------- |
| showPopover() | Shows the options list of &lt;uni-chatroom />. |
| hidePopover() | Hides the options list of &lt;uni-chatroom />. |
| togglePopover(force) | Toggles the visibility of the options list. The optional force parameter allows you to explicitly show (`true`) or hide (`false`) the popover. |

## Reference
- [&lt;uni-chatroom /> demo](https://blog.lalacube.com/mei/webComponent_uni-chatroom.html)
