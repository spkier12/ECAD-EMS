-- This opens the cad
RegisterCommand('ucadems', function()
    SendNUIMessage({showUI = true; }) -- Sends a message to the js file. 
    SetNuiFocus(true, true)
end)

-- If server sends back to client this function handles it.
RegisterNetEvent('ucad_client_logg')
AddEventHandler('ucad_client_logg', function(c)
    if c.type == "getplayers" then
        SendNUIMessage({type = "getplayers", showUI = true, ddp = c}) -- Sends a message to the js file.
        
    elseif c.type == "ucadems_profile_Lookup" then
        SendNUIMessage({type = "ucadems_profile_Lookup", showUI = true, ddp = c}) -- Sends a message to the js file.
    end
end)


--  EVERYTHING BELOWE HERE IS CALLBACKS, THE INDEX.JS FILE FROM NUI CALLS THIS EVENT AND MAGIC HAPPENS
-- Close the CAD UI
RegisterNUICallback('ucadems', function(data, cb)
    if data.close == "1" then
        SendNUIMessage({type = "UI", showUI = false; }) -- Sends a message to the js file.
        SetNuiFocus(false, false)
    end
end)

-- Tells the server from client the server neds to intiate sql lookup
RegisterNUICallback('ucadems_profiles', function(data, cb)
    TriggerServerEvent('ucademsp:getplayers')
end)

-- Tells the server from client the server neds to intiate sql lookup
RegisterNUICallback('ucadems_profileLookup', function(d)
    TriggerServerEvent('ucademsp:getcitizen', {
        name = d.name
    })
end)