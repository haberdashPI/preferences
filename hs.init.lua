Install = hs.loadSpoon("SpoonInstall")
yabai = require('yabai')
require('hs.ipc')
hs.ipc.cliInstall()
hs.ipc.cliInstall('/opt/homebrew')

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

-- Yabai command
-- -----------------------------------------------------------------

c = require("hs.canvas")

numberDisplays = {};
function showWindowNumbers()
  yabai.send(function(data)
    print("Show window numbers")
    data = data:gsub("inf", "0")
    local success, result_err = pcall(function() return hs.json.decode(data) end)
    if not success then
      print("Parsing error: "..result_err)
    else
      local win = managedWindows(result_err)
      showNumber(win)
    end
  end,'query','--windows','--space','mouse')
  -- filter floating and minimized windows
end

function hideWindowNumbers()
  if not (numberDisplays == nil) then
    for _, display in pairs(numberDisplays) do
      display:delete()
    end
    numberDisplays = nil;
  end
end

function focusOnWindow(n)
  yabai.send(function(data)
    -- print(result)
    local result = hs.json.decode(data)
    local wins = managedWindows(result)
    yabai.send(function() 
      hideWindowNumbers()
    end, 'window','--focus', wins[n].id)
  end,'query','--windows','--space','mouse')
end

function showNumber(boxes)
  hideWindowNumbers();
  local frame = hs.screen.mainScreen():frame()
  local height = 110
  local padding = 24
  local textHeight = 150;
  local textWidth = 120;

  numberDisplays = {};
  for i, box in pairs(boxes) do
    numberDisplays[i] = c.new({x=box.x+box.w/2-textWidth + box.stack_index*(textWidth+2),y=box.y+box.h/2-textHeight,h=textHeight,w=textWidth}):appendElements({
    {type = "rectangle", type = "rectangle",
      -- roundedRectRadii = {xRadius = padding/4, yRadius = padding/4},
      -- withShadow = true,
      padding = 20.0,
      fillColor = { alpha = 1.0, green = 0.0, red = 1.0, blue = 0.0},
      strokeWidth = 1.0, strokeColor = { alpha = 1.0, green = 0.25, red = 0.25, blue = 0.25}},
    {action = "fill", type = "text", fillColor = { red = 1.0, green = 1.0, blue = 1.0},
      text = tostring(i), frame = {x = 1.5*padding, y = textHeight*0.25-padding, w = "80%", h = "80%"}, textSize = textHeight*0.8 - padding}
    })
    numberDisplays[i]:show();
  end
end

function upperLeft(w1, w2)
  if w1.y ~= w2.y then
    return w1.y < w2.y
  elseif w1.x ~= w2.x then
    return w1.x < w2.x
  elseif w1.h ~= w2.h then
    return w1.h < w2.h
  elseif w1.w < w2.w then
    return w1.w < w2.w
  else
    return w1.id < w1.id
  end
end

function managedWindows(windows)
  local results = {}
  local j = 0;
  if windows == nil then
    return results
  end
  for i, window in pairs(windows) do
    if (not window["is-floating"]) and (not window["is-minimized"]) then
      print("Including non floating non minimized window")
      j = j + 1
      results[j] = window.frame
      results[j].stack_index = window["stack-index"]
      results[j].id = window.id
    end
  end
  table.sort(results, upperLeft)
  return results
end

-- function windowMode(fn)
--   modestr = nil;
--   yabai.send(function(data)
--     result = hs.json.decode(data)
--     fn(result.type)
--   end, "query", "--spaces","--space", "recent")
-- end
-- wmk = hs.hotkey.modal.new('ctrl', ';')

-- modeDisplay = nil
-- function showModeDisplay(d,text)
--   clearModeDisplay(0);
--   curWindowMode = nil
--   windowMode(function(mode) curWindowMode = mode

--   local frame = hs.screen.mainScreen():frame()
--   local height = 110
--   local padding = 24
--   modeDisplay = c.new({x=frame.w*0.25,y=frame.h/2-height/2,h=height-2*padding,w=frame.w*0.5}):appendElements({
--     {type = "rectangle", type = "rectangle",
--       roundedRectRadii = {xRadius = padding/4, yRadius = padding/4},
--       withShadow = true,
--       padding = 10.0,
--       fillColor = { alpha = 0.7, green = 0.0, red = 0.0, blue = 0.0},
--       strokeWidth = 1.0, strokeColor = { alpha = 1.0, green = 0.25, red = 0.25, blue = 0.25}},
--     {action = "fill", type = "text", fillColor = { red = 1.0, green = 1.0, blue = 1.0},
--     text = text or ("Moving windows ("..(curWindowMode or "")..")"),
--     frame = {x = padding, y = (height-padding)*0.2, w = "80%", h = "80%"}, textSize = (height - padding)*0.3}
--   })
--   modeDisplay:show(d);

-- end)
-- end

-- function clearModeDisplay(d)
--   if not (modeDisplay == nil) then
--     hs.printf("display "..tostring(modeDisplay).."\n")
--     modeDisplay:delete(d)
--   end
--   modeDisplay = nil
-- end

-- function wmk:entered()
--   showModeDisplay(0.25)
-- end
-- function wmk:exited()
--   clearModeDisplay(0.25)
-- end

-- function goTo(n)
--   return function()
--     mash3(tostring(n))
--     hs.timer.doAfter(0.2, function()
--       showModeDisplay(0)
--     end)
--   end
-- end

-- function sendTo(n)
--   return function()
--     yabai.send(function() end, 'window','--space',tostring(n))
--     hs.timer.doAfter(0.2, function()
--       mash3(tostring(n))
--       hs.timer.doAfter(0.2, function()
--         wmk:enter()
--       end)
--     end)
--   end
-- end

-- function sendToNextDisplay()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end, 'window', '--display', 'first')
--     end
--     focusNextDisplay()
--   end, 'window', '--display', 'next')
-- end

-- function sendToPreviousDisplay()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end, 'window', '--display', 'last')
--     end
--     focusPreviousDisplay()
--   end, 'window', '--display', 'prev')
-- end

-- function focusWindow()
--   yabai.send(function() end, 'window', '--focus', 'first')
-- end
-- function focusNextDisplay()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(focusWindow, 'display', '--focus', 'first')
--     end
--     focusWindow()
--   end, 'display', '--focus', 'next')
-- end

-- function focusPreviousDisplay()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(focusWindow,'display','--focus','last')
--     end
--     focusWindow()
--   end,'display','--focus','prev')
-- end

-- function mash1(key) hs.eventtap.keyStroke({"alt", "shift"}, key) end
-- function mash2(key) hs.eventtap.keyStroke({"alt", "shift", "ctrl"}, key) end
-- function mash3(key) hs.eventtap.keyStroke({"ctrl"}, key) end

-- -- yabai = "/usr/local/bin/yabai "
-- rg = "/usr/local/bin/rg "
-- function byMode(modes)
--   return function()
--     windowMode(function(mode)
--       modes[mode]()
--     end)
--   end
-- end

-- function floatLayout() yabai.send(function() end,'config','layout', 'float') end
-- function tileLayout() yabai.send(function() end,'config','layout', 'bsp') end
-- function toggleSplit() yabai.send(function() end,'window','--toggle','split') end
-- function toggleZoom() yabai.send(function() end,'window','--toggle','zoom-fullscreen') end
-- function rotateLayoutRight() yabai.send(function() end,'space','--rotate','270') end
-- function rotateLayoutLeft() yabai.send(function() end,'space','--rotate','90') end

-- function focusNext()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end,'window','--focus', 'first')
--     end
--   end,'window','--focus','next')
-- end

-- function focusPrev()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end,'window','--focus', 'last')
--     end
--   end,'window','--focus','prev')
-- end

-- function shiftForward()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end,'window','--swap', 'first')
--     end
--   end,'window','--swap','next')
-- end

-- function shiftBackward()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end,'window','--swap', 'last')
--     end
--   end,'window','--swap','prev')
-- end

-- function warpForward()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end,'window','--warp', 'first')
--     end
--   end,'window','--warp','next')
-- end

-- function warpBackward()
--   yabai.send(function(result)
--     if result ~= nil then
--       yabai.send(function() end,'window','--warp', 'last')
--     end
--   end,'window','--warp','prev')
-- end

-- function nextWindowInStack()
--   yabai.send(function(data)
--     if data ~= nil then
--       print(data)
--       yabai.send(function() end,'window', '--focus', 'stack.first')
--     end
--   end,'window','--focus', 'stack.next')
-- end
-- function prevWindowInStack()
--   yabai.send(function(data)
--     if data ~= nil then
--       print(data)
--       yabai.send(function() end,'window', '--focus', 'stack.last')
--     end
--   end,'window','--focus', 'stack.prev')
-- end

-- function focusRecent()
--   yabai.send(function() end,'window','--focus', 'recent')
-- end
-- function focusMain()
--   yabai.send(function() end,'window','--focus', 'first')
-- end
-- function swapMain()
--   yabai.send(function() end,'window','--swap', 'first')
-- end
-- function expandMain()
--   yabai.send(function() end,'window','first', '--resize', 'bottom_right:100:100')
-- end
-- function shrinkMain()
--   yabai.send(function() end,'window','first', '--resize', 'bottom_right:-100:-100')
-- end
-- function toggleFloat()
--   yabai.send(function() end,'window','--toggle', 'float')
-- end
-- function minimizeWindow() hs.window.focusedWindow():minimize() end
-- function balanceSplits()
--   yabai.send(function() end, 'space', '--balance')
-- end
-- function stackWindowNext()
--   yabai.send(function() end, 'window', '--stack', 'next')
-- end

-- function stackWindowPrev()
--   yabai.send(function() end, 'window', '--stack', 'prev')
-- end

-- function moveUp()
--   yabai.send(function() end, 'window', '--move', 'rel:0:-100')
-- end
-- function moveDown()
--   yabai.send(function() end, 'window', '--move', 'rel:0:100')
-- end
-- function moveRight()
--   yabai.send(function() end, 'window', '--move', 'rel:100:0')
-- end
-- function moveLeft()
--   yabai.send(function() end, 'window', '--move', 'rel:-100:0')
-- end
-- function resizeDown()
--   yabai.send(function(data)
--     -- print("data: "..tostring(data))
--     -- if data ~= nil then
--       yabai.send(function() end, 'window', '--resize', 'top:0:100')
--     -- end
--   end, 'window', '--resize', 'bottom:0:100')
-- end
-- function resizeUp()
--   yabai.send(function()
--     -- print("data: "..tostring(data))
--     -- if data ~= nil then
--       yabai.send(function() end, 'window', '--resize', 'top:0:-100')
--     -- end
--   end, 'window', '--resize', 'bottom:0:-100')
-- end
-- function resizeRight()
--   yabai.send(function()
--     -- print("data: "..tostring(data))
--     -- if data ~= nil then
--       yabai.send(function() end, 'window', '--resize', 'left:100:0')
--     -- end
--   end, 'window', '--resize', 'right:100:0')
-- end
-- function resizeLeft()
--   yabai.send(function()
--     -- print("data: "..tostring(data))
--     -- if data ~= nil then
--       yabai.send(function() end, 'window', '--resize', 'left:-100:0')
--     -- end
--   end, 'window', '--resize', 'right:-100:0')
-- end
-- function center()
--   yabai.send(function() end, 'window', '--grid', '9:15:3:2:9:5')
-- end

-- function middle()
--   yabai.send(function() end, 'window', '--grid', '9:22:4:0:14:9')
-- end

-- function toggleDesktop()
--   yabai.send(function() end, 'space', '--toggle', 'show-desktop')
-- end

-- wmk:bind('', '=', balanceSplits)
-- wmk:bind('', 'a', function() focusMain(); tileLayout(); showModeDisplay(0) end)
-- wmk:bind('', 's', function() floatLayout(); showModeDisplay(0) end)
-- wmk:bind('shift', '6', stackWindowPrev)
-- wmk:bind('shift', '5', stackWindowNext)
-- wmk:bind('', 'd', toggleSplit)
-- wmk:bind('shift', 'D', toggleDesktop)
-- wmk:bind('', 'v', toggleFloat)
-- wmk:bind('', 'f', toggleZoom)
-- wmk:bind('', 'r', rotateLayoutRight)
-- wmk:bind('shift', 'r', rotateLayoutLeft)

-- wmk:bind('', '[', prevWindowInStack)
-- wmk:bind('', ']', nextWindowInStack)
-- wmk:bind('', 'k', byMode{bsp=focusPrev, float=moveUp})
-- wmk:bind('', 'j', byMode{bsp=focusNext, float=moveDown})
-- wmk:bind('', '.', focusNextDisplay)
-- wmk:bind('', ',', focusPreviousDisplay)

-- wmk:bind('', 'h', byMode{bsp=shrinkMain, float=moveLeft})
-- wmk:bind('', 'l', byMode{bsp=expandMain, float=moveRight})
-- wmk:bind('', 'g', byMode{bsp=focusMain, float=center})
-- wmk:bind('', 'tab', focusNext)
-- wmk:bind('shift', 'tab', focusPrev)
-- wmk:bind('shift', 'g', swapMain)
-- wmk:bind('', '\\', focusRecent)

-- wmk:bind('shift', 'j', byMode{bsp=shiftForward, float=resizeDown})
-- wmk:bind('shift', 'k', byMode{bsp=shiftBackward, float=resizeUp})
-- wmk:bind('shift', 'l', byMode{bsp=warpForward, float=resizeRight})
-- wmk:bind('shift', 'h', byMode{bsp=warpBackward, float=resizeLeft})
-- wmk:bind('shift', '.', sendToNextDisplay)
-- wmk:bind('shift', ',', sendToPreviousDisplay)
-- wmk:bind('','m', minimizeWindow)
-- wmk:bind('', ';', function()
--   focusNext()
--   wmk:exit()
-- end)
-- wmk:bind('ctrl', ';', function()
--   focusNext()
--   wmk:exit()
-- end)
-- wmk:bind('', "'", function()
--   focusPrev()
--   wmk:exit()
-- end)
-- wmk:bind('ctrl', "'", function()
--   focusPrev()
--   wmk:exit()
-- end)
-- wmk:bind('shift', 'w', function() hs.window.focusedWindow():close() end)

-- for i=1,9 do
--   wmk:bind('', tostring(i), goTo(i))
-- end

-- sendtok = hs.hotkey.modal.new()
-- wmk:bind('', 't', function() sendtok:enter() end)
-- for i=1,9 do
--   sendtok:bind('', tostring(i), function()
--     wmk:exit()
--     sendtok:exit()
--     sendTo(i)()
--   end)
-- end
-- sendtok:bind('', 'escape', function()
--   sendtok:exit()
--   wmk:enter()
-- end)
-- function sendtok:entered()
--   wmk:exit()
--   showModeDisplay(0.25, "Sending to screen: ")
-- end

-- movetow = hs.hotkey.modal.new()
-- wmk:bind('', 'w', function() movetow:enter() end)
-- for i=1,9 do
--   movetow:bind('', tostring(i), function()
--     wmk:exit()
--     movetow:exit()
--     focusOnWindow(i)
--   end)
--   movetow:bind('shift', tostring(i), function()
--     movetow:exit()
--     wmk:enter()
--     focusOnWindow(i)
--   end)
-- end
-- movetow:bind('', 'escape', function()
--   movetow:exit()
--   wmk:exit()
-- end)
-- movetow:bind('', 'return', function()
--   movetow:exit()
--   wmk:enter()
-- end)
-- function movetow:entered()
--   wmk:exit()
--   showWindowNumbers()
--   showModeDisplay(0.25, "Focus on window: ")
-- end
-- function movetow:exited()
--   hideWindowNumbers()()
-- end

-- resizew = hs.hotkey.modal.new()
-- wmk:bind('', 'c', byMode{bsp=function() resizew:enter() end, float=middle})
-- resizew:bind('', 'j', resizeDown)
-- resizew:bind('', 'k', resizeUp)
-- resizew:bind('', 'l', resizeRight)
-- resizew:bind('', 'h', resizeLeft)
-- resizew:bind('', 'escape', function()
--   resizew:exit()
--   wmk:exit()
-- end)
-- resizew:bind('', 'return', function()
--   resizew:exit()
--   wmk:enter()
-- end)
-- function resizew:entered()
--   wmk:exit()
--   showModeDisplay(0.25, "Resize focused window")
-- end

-- wmk:bind('', 'return', function() wmk:exit() end)
-- wmk:bind('', 'escape', function() wmk:exit() end)
