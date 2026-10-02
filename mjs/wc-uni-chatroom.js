import { _wcl } from 'https://unpkg.com/uni-input-field/mjs/common-lib.js';
import { _wccss } from 'https://unpkg.com/uni-input-field/mjs/common-css.js';

const defaults = {
  popover: 'auto'
};
const booleanAttrs = [];
const objectAttrs = [];
const customEvents = {
  toggle: 'uni-chatroom-toggle',
  beforetoggle: 'uni-chatroom-beforetoggle'
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host {
  position: relative;
  inline-size: fit-content;
  display: block;
}

.main {
  --subject: var(--uni-chatroom-subject, '敲敲話');
  --safe-padding: var(--uni-chatroom-safe-padding, 16px);
  --win-inline-size: var(--uni-chatroom-window-inline-size, 640px);
  --win-max-inline-size: calc(100dvi - var(--safe-padding) * 2);
  --win-block-size: var(--uni-chatroom-window-block-size, 500px);
  --win-max-block-size: calc(100dvb - var(--safe-padding) * 2);
  --main-block-size: calc(var(--win-block-size) - var(--head-block-size));
  --main-max-block-size: calc(100dvb - var(--head-block-size) - var(--safe-padding) * 2);
  --position-area: var(--uni-chatroom-position-area, top span-left);
  --duration: var(--uni-chatroom-transition-duration, .35s);
  --inset: var(--uni-chatroom-inset, auto 16px 0px auto);

  --border-radius: var(--uni-chatroom-border-radius, 28px 28px 0 0);
  --head-block-size: 52px;
  --head-padding-inline: var(--uni-chatroom-head-padding-inline, 20px 10px);

  @media screen and (max-width: 767px) {
    --win-inline-size: 100dvi;
    --win-block-size: 100dvb;
    --safe-padding: 0;
    --border-radius: 0;
    --position-area: top span-left;
    --inset: auto 0 0 auto;

    position: fixed;
  }

  inline-size: fit-content;
  z-index: 2147483647;

  .chatroom {
    &:popover-open {
      inline-size: var(--win-inline-size);
      block-size: var(--win-block-size);
      max-inline-size: var(--win-max-inline-size);
      max-block-size: var(--win-max-block-size);

      @supports (interpolate-size: allow-keywords) {
        inline-size: fit-content;
        block-size: fit-content;
        max-inline-size: revert;
        max-block-size: revert;
      }

      opacity: 1;

      @starting-style {
        inline-size: 0px;
        block-size: 0px;
        opacity: 0;
      }
    }

    &::backdrop {
      background: transparent;
    }

    position: fixed;
    inset: var(--inset);
    margin: auto;

    inline-size: 0px;
    block-size: 0px;
    opacity: 0;

    background-color: rgba(255 255 255);
    border: 0 none;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 18px 0 rgba(0 0 0/.2);
    overflow: hidden;

    interpolate-size: allow-keywords;

    transition: 
      inline-size var(--duration) cubic-bezier(.4,0,.2,1), 
      block-size var(--duration) cubic-bezier(.4,0,.2,1), 
      border-radius var(--duration) cubic-bezier(.4,0,.2,1),
      opacity var(--duration) cubic-bezier(.4,0,.2,1),
      overlay var(--duration) cubic-bezier(.4,0,.2,1) allow-discrete,
      display var(--duration) cubic-bezier(.4,0,.2,1) allow-discrete;

    .chatroom__head {
      inline-size: var(--win-inline-size);
      max-inline-size: var(--win-max-inline-size);

      block-size: var(--head-block-size);
      padding-inline: var(--head-padding-inline);
      background-color: rgba(255 255 255);
      box-sizing: border-box;
      border-block-end: 1px solid rgba(229 231 235);

      display: flex;
      align-items: center;
      justify-content: space-between;

      p::before {
        content: var(--subject);
        font-size: 18px;
        color: var(--ct_text_main_general);
      }
    }

    .chatroom__main {
      inline-size: 100%;
      block-size: var(--main-block-size);
      max-block-size: var(--main-max-block-size);

      [name=chat] {
        inline-size: 100%;
        block-size: 100%;
        border: 0 none;
        display: block;
      }
    }

    button {
      flex-shrink: 0;
      font-size: 0;
      appearance: none;
      box-shadow: unset;
      border: unset;
      background: transparent;
      -webkit-user-select: none;
      user-select: none;
      pointer-events: auto;
      margin: 0;
      padding: 0;
      outline: 0 none;

      inline-size: 36px;
      block-size: 36px;
      display: grid;
      place-content: center;

      &::after {
        content: '';
        inline-size: 24px;
        aspect-ratio: 1/1;
        background-color: rgba(0 0 0);
        clip-path: path('M16.1641 17.5184L17.5175 16.1651L13.356 12.0037L17.5174 7.83565L16.164 6.48232L11.996 10.6437L7.8341 6.48173L6.48077 7.83506L10.6427 12.0037L6.48139 16.165L7.83473 17.5183L11.996 13.357L16.1641 17.5184Z');
      }
    }
  } 
}
</style>

<div class="main" ontouchstart="">
  <div id="chatroom" class="chatroom" popover>
    <div class="chatroom__head">
      <p></p>
      <button
        type="button"
        popovertarget="chatroom"
        popovertargetaction="hide"
      >
        close
      </button>
    </div>
    <div class="chatroom__main">
      <slot name="chat"></slot>
    </div>
  </div>
</div>
`;

/* style injection */
const styleInjection = `
uni-chatroom {
  :nth-child(n + 2 of [slot="chat"]) {
    display: none;
  }
    
  [slot="chat"] {
    inline-size: 100%;
    block-size: 100%;
    border: 0 none;
    display: block;
    color-scheme: light;
  }
}

`;

const INJECT_KEY = Symbol.for('uni.chatroom.ui.injected');
const uiInit = () => {
  if (window[INJECT_KEY]) {
    return;
  }

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styleInjection);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

  window[INJECT_KEY] = true;
};
uiInit();

export class UniChatroom extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: ''
    };

    // nodes
    this.#nodes = {
      chatroom: this.shadowRoot.querySelector('#chatroom')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new UniChatroom(config)
    };

    // evts
    this._onBeforetoggle = this._onBeforetoggle.bind(this);
    this._onToggle = this._onToggle.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    this.#nodes.chatroom.addEventListener('beforetoggle', this._onBeforetoggle, { signal });
    this.#nodes.chatroom.addEventListener('toggle', this._onToggle, { signal });
  }

  disconnectedCallback() {
    this.#data.controller.abort?.();
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'popover': {
          const value = newValue.trim();

          this.#config.popover = ['auto', 'manual', 'hint'].includes(value) ? value : defaults[attrName];
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!UniChatroom.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'popover': {
        this.#nodes.chatroom.popover = this.#config.popover;
        break;
      }
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // UniChatroom.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(customEvents).map(
      (key) => {
        return customEvents[key];
      }
    );
  }

  get open() {
    return this.#nodes.chatroom.matches(':popover-open');
  }

  get popover() {
    return this.#config.popover;
  }

  set popover(value) {
    if (typeof value !== 'undefined') {
      this.setAttribute('popover', value);
    } else {
      this.removeAttribute('popover');
    }
  }

  #upgradeProperty(prop) {
    let value;

    if (UniChatroom.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  showPopover() {
    this.#nodes.chatroom.showPopover();
  }

  hidePopover() {
    this.#nodes.chatroom.hidePopover(); 
  }

  togglePopover(force) {
    if (typeof force === 'boolean') {
      this.#nodes.chatroom.togglePopover(force); 
    } else {
      this.#nodes.chatroom.togglePopover(); 
    }
  }

  _onBeforetoggle(event) {
    const { newState, oldState } = event;

    this.#fireEvent(customEvents.beforetoggle,
      {
        newState,
        oldState,
        preventDefault: () => {
          event.preventDefault();
        }
      }
    );
  }

  _onToggle(event) {
    const { newState, oldState } = event;

    this.#fireEvent(customEvents.toggle, { newState, oldState });
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('UniChatroom');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('UniChatroom'), UniChatroom);
}