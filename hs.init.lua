-- Vim mode
-- -----------------------------------------------------------------
vim = hs.loadSpoon('VimMode')

hs.hotkey.bind({'ctrl'}, '\\', function()
  vim:enter()
end)

-- Tiling window management
-- -----------------------------------------------------------------
wmk = hs.hotkey.modal.new('ctrl', ';')
c = require("hs.canvas")
modeDisplay = nil
function showModeDisplay(d,text)
  clearModeDisplay(0);
  text = text or "Moving windows"
  local frame = hs.screen.mainScreen():frame()
  hs.printf("frame: "..tostring(frame).."\n")
  local height = 60
  local padding = 12
  modeDisplay = c.new({x=0,y=frame.h-height/2,h=height,w=frame.w}):appendElements({
    {action = "build", padding = 0, type = "rectangle"},
    {action = "fill", fillColor = { alpha = 0.5, green = 0.3, red = 0.3, blue = 0.0}, type = "rectangle"},
    {action = "fill", fillColor = { red = 1.0, green = 1.0, blue = 1.0}, type = "text",
      text = text, frame = {x = padding, y = padding, w = "80%", h = "80%"}, textSize = (height - padding)/2}
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
    mash2(tostring(n))
    hs.timer.doAfter(0.2, function()
      wmk:enter()
    end)
  end
end


function mash1(key) hs.eventtap.keyStroke({"alt", "shift"}, key) end
function mash2(key) hs.eventtap.keyStroke({"alt", "shift", "ctrl"}, key) end
function mash3(key) hs.eventtap.keyStroke({"ctrl"}, key) end

function tallLayout() mash1('a') end
function wideLayout() mash1('s') end
function fullLayout() mash1('d') end
function focusNext() mash1('k') end
function focusPrev() mash1('j') end
function shiftForward() mash2('k') end
function shiftBackward() mash2('j') end
function expandMain() mash1('l') end
function shrinkMain() mash1('h') end
function incrMain() mash2(',') end
function decrMain() mash2('.') end
function swapMain() mash1("return") end
function toggleTile() mash2('t') end

wmk:bind('', 's', tallLayout)
wmk:bind('', 'd', wideLayout)
wmk:bind('', 'f', fullLayout)
wmk:bind('', 'k', focusPrev)
wmk:bind('', 'j', focusNext)
wmk:bind('', 'h', shrinkMain)
wmk:bind('', 'l', expandMain)
wmk:bind('', '=', incrMain)
wmk:bind('', '-', decrMain)
wmk:bind('', 'g', swapMain)
wmk:bind('', 'q', toggleTile)
wmk:bind('shift', 'j', shiftForward)
wmk:bind('shift', 'k', shiftBackward)
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
