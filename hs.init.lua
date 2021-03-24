Install = hs.loadSpoon("SpoonInstall")

-- Clipboard history
-- -----------------------------------------------------------------

Install:andUse("TextClipboardHistory", {
  disable = false, config = { show_in_menubar = false, },
  hotkeys = { toggle_clipboard = { { "cmd", "shift" }, "v" } },
  start = true,
})

-- Vim mode
-- -----------------------------------------------------------------
local VimMode = hs.loadSpoon('VimMode')
local vim = VimMode:new()
vim:bindHotKeys({ enter = {{'ctrl'}, '\\'} })
vim:enableBetaFeature('block_cursor_overlay')
vim:shouldDimScreenInNormalMode(false)

wmk = hs.hotkey.modal.new('ctrl', ';')
c = require("hs.canvas")
modeDisplay = nil
function showModeDisplay(d,text)
  clearModeDisplay(0);
  text = text or "Moving windows"
  local frame = hs.screen.mainScreen():frame()
  hs.printf("frame: "..tostring(frame).."\n")
  local height = 110
  local padding = 24
  modeDisplay = c.new({x=frame.w*0.25,y=frame.h/2-height/2,h=height-2*padding,w=frame.w*0.5}):appendElements({
    {type = "rectangle", type = "rectangle",
      roundedRectRadii = {xRadius = padding/4, yRadius = padding/4},
      withShadow = true,
      padding = 10.0,
      fillColor = { alpha = 0.7, green = 0.0, red = 0.0, blue = 0.0},
      strokeWidth = 1.0, strokeColor = { alpha = 1.0, green = 0.25, red = 0.25, blue = 0.25}},
    {action = "fill", type = "text", fillColor = { red = 1.0, green = 1.0, blue = 1.0},
      text = text, frame = {x = padding, y = (height-padding)*0.2, w = "80%", h = "80%"}, textSize = (height - padding)*0.3}
  })
  modeDisplay:show(d);
end

function clearModeDisplay(d)
  if not (modeDisplay == nil) then
    hs.printf("display "..tostring(modeDisplay).."\n")
    modeDisplay:delete(d)
  end
  modeDisplay = nil
end

function wmk:entered()
  showModeDisplay(0.25)
end
function wmk:exited()
  clearModeDisplay(0.25)
end

function goTo(n)
  return function()
    mash3(tostring(n))
    hs.timer.doAfter(0.2, function()
      showModeDisplay(0)
    end)
  end
end

function sendTo(n)
  return function()
    hs.printf('sending to '..n..'\n')
    hs.execute(yabai..'-m window --space '..n)
    hs.timer.doAfter(0.2, function()
      wmk:enter()
    end)
  end
end


function mash1(key) hs.eventtap.keyStroke({"alt", "shift"}, key) end
function mash2(key) hs.eventtap.keyStroke({"alt", "shift", "ctrl"}, key) end
function mash3(key) hs.eventtap.keyStroke({"ctrl"}, key) end

yabai = "/usr/local/bin/yabai "
-- function tallLayout() mash1('a') end
-- function wideLayout() mash1('s') end
-- function fullLayout() mash1('d') end

function floatLayout() hs.execute(yabai..'-m config layout float') end
function tileLayout() hs.execute(yabai..'-m config layout bsp') end
function toggleSplit() hs.execute(yabai..'-m window --toggle split') end
function toggleZoom() hs.execute(yabai..'-m window --toggle zoom-fullscreen') end
function rotateLayoutRight() hs.execute(yabai..'-m space --rotate 270') end
function rotateLayoutLeft() hs.execute(yabai..'-m space --rotate 90') end
-- function focusNext() mash1('k') end
-- function focusPrev() mash1('j') end
-- function shiftForward() mash2('k') end
-- function shiftBackward() mash2('j') end
function focusNext() hs.execute(yabai..'-m window --focus next || '..yabai..'-m window --focus first') end
function focusPrev() hs.execute(yabai..'-m window --focus prev || '..yabai..'-m window --focus last') end
function shiftForward() hs.execute(yabai..'-m window --swap next || '..yabai..'-m window --swap first') end
function shiftBackward() hs.execute(yabai..'-m window --swap prev || '..yabai..'-m window --swap last') end
function warpForward() hs.execute(yabai..'-m window --warp next || '..yabai..'-m window --warp first') end
function warpBackward() hs.execute(yabai..'-m window --warp prev || '..yabai..'-m window --warp last') end

-- function expandMain() mash1('l') end
-- function shrinkMain() mash1('h') end
-- function incrMain() mash2(',') end
-- function decrMain() mash2('.') end
-- function swapMain() mash1("return") end
-- function toggleTile() mash2('t') end
function focusMain() hs.execute(yabai..'-m window --focus first') end
function swapMain() hs.execute(yabai..'-m window --swap first') end
function expandMain() hs.execute(yabai..'-m window first --resize bottom_right:100:100') end
function shrinkMain() hs.execute(yabai..'-m window first --resize bottom_right:-100:-100') end
function toggleFloat() hs.execute(yabai..'-m window --toggle float') end
function minimizeWindow() hs.window.focusedWindow():minimize() end

wmk:bind('', 's', toggleSplit)
wmk:bind('', 'd', tileLayout)
wmk:bind('', 'a', floatLayout)
wmk:bind('', 'f', toggleZoom)
wmk:bind('', 'q', toggleFloat)
wmk:bind('', 'r', rotateLayoutRight)
wmk:bind('shift', 'r', rotateLayoutLeft)

wmk:bind('', 'k', focusPrev)
wmk:bind('', 'j', focusNext)
wmk:bind('', 'h', shrinkMain)
wmk:bind('', 'l', expandMain)
-- wmk:bind('', '=', incrMain)
-- wmk:bind('', '-', decrMain)
wmk:bind('', 'g', focusMain)
wmk:bind('shift', 'g', swapMain)

wmk:bind('shift', 'j', shiftForward)
wmk:bind('shift', 'k', shiftBackward)
wmk:bind('shift', 'l', warpForward)
wmk:bind('shift', 'h', warpBackward)
wmk:bind('','m', minimizeWindow)
wmk:bind('', ';', function()
  focusNext()
  wmk:exit()
end)
wmk:bind('ctrl', ';', function()
  focusNext()
  wmk:exit()
end)
wmk:bind('shift', 'w', function() hs.window.focusedWindow():close() end)

for i=1,9 do
  wmk:bind('', tostring(i), goTo(i))
end

sendtok = hs.hotkey.modal.new()
wmk:bind('', 't', function() sendtok:enter() end)
for i=1,9 do
  sendtok:bind('', tostring(i), function()
    wmk:exit()
    sendtok:exit()
    sendTo(i)()
  end)
end
sendtok:bind('', 'escape', function()
  sendtok:exit()
  wmk:enter()
end)

function sendtok:entered()
  showModeDisplay(0.25, "Sending to screen: ")
end

wmk:bind('', 'return', function() wmk:exit() end)
wmk:bind('', 'escape', function() wmk:exit() end)
