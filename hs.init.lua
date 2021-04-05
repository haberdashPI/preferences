Install = hs.loadSpoon("SpoonInstall")
yabaif = require('yabai')

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

function windowMode()
  return hs.execute(yabai.."-m query --spaces --space recent | "..rg.."-o '\"type\":\"([a-z]+)\"' -r '$1'"):gsub("%s+", "")
end
wmk = hs.hotkey.modal.new('ctrl', ';')
c = require("hs.canvas")
modeDisplay = nil
function showModeDisplay(d,text)
  clearModeDisplay(0);
  mode = windowMode()
  text = text or ("Moving windows ("..mode..")")
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
    hs.execute(yabai..'-m space --focus '..n)
    hs.timer.doAfter(0.2, function()
      wmk:enter()
    end)
  end
end


function mash1(key) hs.eventtap.keyStroke({"alt", "shift"}, key) end
function mash2(key) hs.eventtap.keyStroke({"alt", "shift", "ctrl"}, key) end
function mash3(key) hs.eventtap.keyStroke({"ctrl"}, key) end

yabai = "/usr/local/bin/yabai "
rg = "/usr/local/bin/rg "
function byMode(modes)
  return function()
    modes[windowMode()]()
  end
end

function floatLayout() yabaif.send(function() end,'config','layout float') end
function tileLayout() yabaif.send(function() end,'config','layout bsp') end
function toggleSplit() hs.execute(yabai..'-m window --toggle split') end
function toggleZoom() hs.execute(yabai..'-m window --toggle zoom-fullscreen') end
function rotateLayoutRight() hs.execute(yabai..'-m space --rotate 270') end
function rotateLayoutLeft() hs.execute(yabai..'-m space --rotate 90') end

function focusNext() hs.execute(yabai..'-m window --focus next || '..yabai..'-m window --focus first') end
function focusPrev() hs.execute(yabai..'-m window --focus prev || '..yabai..'-m window --focus last') end
function shiftForward() hs.execute(yabai..'-m window --swap next || '..yabai..'-m window --swap first') end
function shiftBackward() hs.execute(yabai..'-m window --swap prev || '..yabai..'-m window --swap last') end
function warpForward() hs.execute(yabai..'-m window --warp next || '..yabai..'-m window --warp first') end
function warpBackward() hs.execute(yabai..'-m window --warp prev || '..yabai..'-m window --warp last') end
function nextWindowInStack() hs.execute(yabai..'-m window --focus stack.next || '..yabai..'-m window --focus stack.first') end
function prevWindowInStack() hs.execute(yabai..'-m window --focus stack.prev || '..yabai..'-m window --focus stack.last') end
function unstackWindow()
  hs.execute(yabai..'-m window --toggle float && '..yabai..'-m window --toggle float')
end

function focusMain() hs.execute(yabai..'-m window --focus first') end
function swapMain() hs.execute(yabai..'-m window --swap first') end
function expandMain() hs.execute(yabai..'-m window first --resize bottom_right:100:100') end
function shrinkMain() hs.execute(yabai..'-m window first --resize bottom_right:-100:-100') end
function toggleFloat() hs.execute(yabai..'-m window --toggle float') end
function minimizeWindow() hs.window.focusedWindow():minimize() end
function balanceSplits() hs.execute(yabai..'-m space --balance') end
function stackWindowNext() hs.execute(yabai..'-m window --stack next || '..yabai..'-m window --stack first') end
function stackWindowPrev() hs.execute(yabai..'-m window --stack prev || '..yabai..'-m window --stack last') end

function moveUp() hs.execute(yabai..'-m window --move rel:0:-100') end
function moveDown() hs.execute(yabai..'-m window --move rel:0:100') end
function moveRight() hs.execute(yabai..'-m window --move rel:100:0') end
function moveLeft() hs.execute(yabai..'-m window --move rel:-100:0') end
function growVert() hs.execute(yabai..'-m window --resize bottom:0:100') end
function shrinkVert() hs.execute(yabai..'-m window --resize bottom:0:-100') end
function growHorz() hs.execute(yabai..'-m window --resize right:100:0') end
function shrinkHorz() hs.execute(yabai..'-m window --resize right:-100:0') end
function center() hs.execute(yabai..'-m window --grid 9:15:3:2:9:5') end
function toggleDesktop() hs.execute(yabai..'-m space --toggle show-desktop') end

numberDisplays = {};
function clearNumberDisplay()
  if not (numberDisplays == nil) then
    for _, display in pairs(numberDisplays) do
      display:delete()
    end
    numberDisplays = nil;
  end
end
function showNumber(boxes)
  clearNumberDisplay();
  local frame = hs.screen.mainScreen():frame()
  local height = 110
  local padding = 24
  local textHeight = 50;
  local textWidth = 30*2;

  numberDisplays = {};
  for i, box in pairs(boxes) do
    numberDisplays[i] = c.new({x=box.x+box.w/2-textWidth,y=box.y+box.h/2-textHeight,h=textHeight,w=textWidth}):appendElements({
    {type = "rectangle", type = "rectangle",
      roundedRectRadii = {xRadius = padding/4, yRadius = padding/4},
      withShadow = true,
      padding = 10.0,
      fillColor = { alpha = 0.7, green = 0.0, red = 0.0, blue = 0.0},
      strokeWidth = 1.0, strokeColor = { alpha = 1.0, green = 0.25, red = 0.25, blue = 0.25}},
    {action = "fill", type = "text", fillColor = { red = 1.0, green = 1.0, blue = 1.0},
      text = tostring(i), frame = {x = padding, y = (textHeight-padding)*0.5, w = "80%", h = "80%"}, textSize = (textHeight - padding)*0.8}
    })
    numberDisplays[i]:show();
  end
end

function windowStats()
  local windows = hs.json.decode(hs.execute(yabai..'-m query --windows --space mouse'))
  -- filter floating and minimized windows
  local results = {}
  j = 0;
  for i, window in pairs(windows) do
    print("Examining window: "..window.app)
    print("Floating: "..window.floating)
    print("Minimized: "..window.minimized)
    if window.floating == 0 and window.minimized == 0 then
      j = j + 1
      results[j] = window.frame
      results[j].id = window.id
      print("Adding to results...")
    end
  end
  return results
end

wmk:bind('', 'b', balanceSplits)
wmk:bind('', 'a', function() focusMain(); tileLayout(); showModeDisplay(0) end)
wmk:bind('', 's', function() floatLayout(); showModeDisplay(0) end)
wmk:bind('', 'i', stackWindowPrev)
wmk:bind('', 'o', stackWindowNext)
wmk:bind('', 'p', unstackWindow)
wmk:bind('', 'd', toggleSplit)
wmk:bind('shift', 'D', toggleDesktop)
wmk:bind('', 'v', toggleFloat)
wmk:bind('', 'f', toggleZoom)
wmk:bind('', 'r', rotateLayoutRight)
wmk:bind('shift', 'r', rotateLayoutLeft)

wmk:bind('', '[', prevWindowInStack)
wmk:bind('', ']', nextWindowInStack)
wmk:bind('', 'k', byMode{bsp=focusPrev, float=moveUp})
wmk:bind('', 'j', byMode{bsp=focusNext, float=moveDown})
wmk:bind('', 'h', byMode{bsp=shrinkMain, float=moveLeft})
wmk:bind('', 'l', byMode{bsp=expandMain, float=moveRight})
wmk:bind('', 'g', byMode{bsp=focusMain, float=center})
wmk:bind('', 'tab', focusNext)
wmk:bind('shift', 'tab', focusPrev)
wmk:bind('shift', 'g', swapMain)

wmk:bind('shift', 'j', byMode{bsp=shiftForward, float=growVert})
wmk:bind('shift', 'k', byMode{bsp=shiftBackward, float=shrinkVert})
wmk:bind('shift', 'l', byMode{bsp=warpForward, float=growHorz})
wmk:bind('shift', 'h', byMode{bsp=warpBackward, float=shrinkHorz})
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
