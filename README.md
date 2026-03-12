# CallTweaks (Vencord Plugin)

Adds a variety of quality-of-life tweaks to Discord calls, including UI controls, visibility customization, and automatic stream cleanup.

(• ω •)

This plugin improves the Discord call experience by giving you more control over what elements appear during voice and stream sessions.

---

# Overview

CallTweaks enhances Discord's call interface with additional controls and customization options.  
It allows you to toggle the call UI, adjust the visibility of top and bottom control bars, hide unnecessary elements, and automatically close stream popups.

The plugin is designed to make the call experience cleaner and more customizable without changing Discord's core functionality.

---

# Features

## Toggle Call Interface
Adds a button next to the **Pinned Messages** button in the DM header.

Pressing it collapses or restores the call interface elements such as:

- call members list
- stream elements
- video wrapper components
- call container layout

This allows you to quickly hide clutter while remaining in the call.

---

## Always Show Top Bar
Forces the call **top bar** (channel header and toolbar) to remain visible instead of appearing only when hovering.

This can make controls easier to access while watching streams.

### Extension: Normal Behavior When Streaming
If enabled, the top bar returns to Discord's **default hover behavior when watching streams**, even if Always Show Top Bar is enabled.

---

## Always Show Bottom Bar
Forces the **call control bar** (mute, camera, screenshare, etc.) to remain visible at all times.

This removes the need to hover over the video area to access controls.

### Extension: Normal Behavior When Streaming
If enabled, the bottom bar behaves normally when watching streams even if Always Show Bottom Bar is enabled.

---

## Hide Stream Hover Shadow
Removes the dark gradient overlay that appears when hovering over a stream.

This makes the stream view cleaner and less visually distracting.

---

## Hide Stream Quality / Live Indicator
Hides the UI element showing:

- stream resolution
- FPS
- LIVE indicator

Useful if you want a minimal stream view.

---

## Hide AKA Badge and Nicknames
Removes the **AKA badge and nickname display** from DM headers.

This includes:

- the "AKA" label
- the nickname text
- the divider dot between username and nickname

---

## Auto Close Ended Stream Popup
Automatically closes the **"This stream has ended"** popup when a stream ends.

Normally Discord requires pressing **Close Stream**, but with this enabled the popup disappears automatically.

---

## Hide Stream Preview
Removes the preview image shown before clicking **Watch Stream**.

Only the watch button remains visible.

This can help reduce visual clutter in DMs where streams frequently appear.

---

# Installation

## Method 1 (User Plugins)

1. Place the plugin file in:
Vencord/src/userplugins/
2. Rebuild Vencord
pnpm build
3. Enable the plugin in **Vencord Settings → Plugins**

---

## Method 2 (Manual Installation)

1. Clone or download the repository
2. Move the plugin file into your Vencord `userplugins` directory
3. Rebuild Vencord

---

# Usage

After enabling the plugin:

1. Open a DM or call
2. Locate the **phone icon button** next to the Pinned Messages button
3. Click it to toggle the call interface

You can configure all behavior through:
Vencord Settings → Plugins → CallTweaks

---

# Settings

| Setting | Description |
|-------|-------------|
| Always Show Top Bar | Keeps the call header visible |
| Normal Top Bar When Streaming | Uses default hover behavior while watching streams |
| Always Show Bottom Bar | Keeps call controls visible |
| Normal Bottom Bar When Streaming | Uses default hover behavior during streams |
| Hide Stream Hover Shadow | Removes stream gradient overlay |
| Hide Stream Info | Hides resolution/FPS/LIVE indicator |
| Hide AKA | Removes AKA badge and nickname text |
| Auto Close Ended Stream | Automatically closes stream ended popup |
| Hide Stream Preview | Removes preview image before watching streams |

---

# Compatibility

Designed for:

- **Vencord**
- **Discord Desktop**

Class selectors are partially resilient to Discord UI updates, but updates to Discord may require adjustments.

---

# Author

**nugget :3**

---

# License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

-written with ai cause i was too lazy to make a readme properly :P
