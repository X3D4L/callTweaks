import definePlugin, { OptionType } from "@utils/types";
import { Settings } from "@api/Settings";

const BTN_ID = "vc-call-toggle-btn";
const STYLE_ID = "vc-call-toggle-style";
const STATE_KEY = "__vcCallCollapsed";

const PHONE_ICON = `<svg class="icon__9293f" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 7.4A5.4 5.4 0 0 1 7.4 2c.36 0 .7.22.83.55l1.93 4.64a1 1 0 0 1-.43 1.25L7 10a8.52 8.52 0 0 0 7 7l1.12-2.24a1 1 0 0 1 1.19-.51l5.06 1.56c.38.11.63.46.63.85C22 19.6 19.6 22 16.66 22h-.37C8.39 22 2 15.6 2 7.71V7.4Z"/></svg>`;
const PHONE_OFF_ICON = `<svg class="icon__9293f" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 7.4A5.4 5.4 0 0 1 7.4 2c.36 0 .7.22.83.55l1.93 4.64a1 1 0 0 1-.43 1.25L7 10a8.52 8.52 0 0 0 7 7l1.12-2.24a1 1 0 0 1 1.19-.51l5.06 1.56c.38.11.63.46.63.85C22 19.6 19.6 22 16.66 22h-.37C8.39 22 2 15.6 2 7.71V7.4Z"/><line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`;

let observer: MutationObserver | null = null;
let btn: HTMLDivElement | null = null;

function autoCloseEndedStream() {
    if (!Settings.plugins.dmwToggle.autoCloseEndedStream) return;

    const headers = document.querySelectorAll('[class*="header__29209"]');

    for (const h of headers) {
        if (h.textContent?.includes("This stream has ended")) {
            const btn = h.parentElement?.querySelector("button");
            if (btn) (btn as HTMLButtonElement).click();
        }
    }
}

function injectCSS() {
    const s = Settings.plugins.dmwToggle;

    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `

body.vc-call-collapsed [class*="voiceCallWrapper"],
body.vc-call-collapsed [class*="bottomControls"]{
display:none !important;
}

body.vc-call-collapsed [class*="wrapper_cb9592"]{
height:48px !important;
min-height:48px !important;
}

body.vc-call-collapsed [class*="videoWrapper"],
body.vc-call-collapsed [class*="videoSizer"],
body.vc-call-collapsed [class*="videoWrapperAnimated"],
body.vc-call-collapsed [class*="focusedVideo"]{
display:none !important;
}

${s.alwaysShowTopBar && !s.normalTopBarWhenStreaming ? `
[class*="topControls"]{
opacity:1 !important;
pointer-events:auto !important;
transform:none !important;
}` : ``}

${s.alwaysShowBottomBar && !s.normalBottomBarWhenStreaming ? `
[class*="bottomControls"]{
opacity:1 !important;
pointer-events:auto !important;
transform:none !important;
}` : ``}

${s.hideShadow ? `
[class*="gradientTop"],
[class*="gradientBottom"],
[class*="overlayContainer"]{
display:none !important;
}` : ``}

${s.hideStreamInfo ? `
[class*="streamQualityIndicator"],
[class*="liveIndicator"]{
display:none !important;
}` : ``}

${s.hideAKA ? `
[class*="akaBadge"],
[class*="nicknames"],
[class*="divider"]{
display:none !important;
}` : ``}

${s.hideStreamPreview ? `
[class*="streamPreview"] img{
display:none !important;
}
[class*="streamPreviewOpacity"]{
display:none !important;
}` : ``}

[class*="eventPromptsContainer"]{
display:none !important;
}

`;

    document.head.appendChild(style);
}

function applyState() {
    const state = (window as any)[STATE_KEY] || false;
    document.body.classList.toggle("vc-call-collapsed", state);
}

function toggleCall() {
    (window as any)[STATE_KEY] = !((window as any)[STATE_KEY] || false);
    applyState();
    if (btn) btn.innerHTML = (window as any)[STATE_KEY] ? PHONE_OFF_ICON : PHONE_ICON;
}

function injectButton() {
    if (document.getElementById(BTN_ID)) return;

    const toolbar = document.querySelector('[class*="toolbar"]');
    if (!toolbar) return;

    const pinnedBtn = toolbar.querySelector('[aria-label="Pinned Messages"]');
    if (!pinnedBtn) return;

    btn = document.createElement("div");
    btn.id = BTN_ID;
    btn.className = "iconWrapper__9293f clickable__9293f";
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("aria-label", "Toggle Call Bar");

    btn.innerHTML = (window as any)[STATE_KEY] ? PHONE_OFF_ICON : PHONE_ICON;
    btn.onclick = toggleCall;

    pinnedBtn.after(btn);
}

function cleanup() {
    document.getElementById(BTN_ID)?.remove();
    document.getElementById(STYLE_ID)?.remove();
    document.body.classList.remove("vc-call-collapsed");

    observer?.disconnect();
    observer = null;

    (window as any)[STATE_KEY] = false;
    btn = null;
}

export default definePlugin({
name:"callTweaks",
description:"Adds a toggle button for the voice call controls/members bar and various quality-of-life tweaks for Discord calls. (• ω •)",
authors:[{name:"nugget :3",id:817382129352572948n}],

options:{

alwaysShowTopBar:{
type:OptionType.BOOLEAN,
description:"Always show the call top bar",
default:false
},

normalTopBarWhenStreaming:{
type:OptionType.BOOLEAN,
description:"Extension of Always Show Top Bar: use normal hover behaviour when watching streams",
default:true
},

alwaysShowBottomBar:{
type:OptionType.BOOLEAN,
description:"Always show call controls instead of requiring hover",
default:false
},

normalBottomBarWhenStreaming:{
type:OptionType.BOOLEAN,
description:"Extension of Always Show Bottom Bar: use normal hover behaviour when watching streams",
default:true
},

hideShadow:{
type:OptionType.BOOLEAN,
description:"Hide stream hover shadow",
default:false
},

hideStreamInfo:{
type:OptionType.BOOLEAN,
description:"Hide stream quality / LIVE indicator",
default:false
},

hideAKA:{
type:OptionType.BOOLEAN,
description:"Hide AKA badge and nickname text",
default:false
},

autoCloseEndedStream:{
type:OptionType.BOOLEAN,
description:"Automatically close the 'This stream has ended' popup",
default:false
},

hideStreamPreview:{
type:OptionType.BOOLEAN,
description:"Hide stream preview image (If Available) before clicking Watch Stream ",
default:false
}

},

start(){
injectCSS();
applyState();
injectButton();
autoCloseEndedStream();

observer=new MutationObserver(()=>{
injectCSS();
applyState();
injectButton();
autoCloseEndedStream();
});

observer.observe(document.body,{childList:true,subtree:true});
},

stop(){
cleanup();
}
});