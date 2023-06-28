QBCore = exports['qb-core']:GetCoreObject()

-- This opens the cad
RegisterCommand('ucadems', function()
    local pl = QBCore.Functions.GetPlayerData()
    local jobName = pl.job.name
    if jobName == "ambulance" then
        SendNUIMessage({
            type = "UI",
            showUI = true;
            name = pl.charinfo.firstname .. " " .. pl.charinfo.lastname .. " - " .. pl.charinfo.nationality
        })
        SetNuiFocus(true, true)
        return
    end

    TriggerEvent('chat:addMessage', {
        color = { 255, 0, 0},
        multiline = true,
        args = {"UCAD EMS", "You are not a ambulance personell"}
      })

end)

-- If server sends back to client this function handles it.
RegisterNetEvent('ucad_client_logg')
AddEventHandler('ucad_client_logg', function(c)
    if c.type == "getplayers" then
        SendNUIMessage({type = "getplayers", ddp = c}) -- Sends a message to the js file.
        
    elseif c.type == "ucadems_profile_Lookup" then
        SendNUIMessage({type = "ucadems_profile_Lookup", ddp = c}) -- Sends a message to the js file.

    elseif c.type == "ucademsp_incident_report" then
        SendNUIMessage({type = "ucademsp_incident_report",  ddp = c}) -- Sends a message to the js file.
    end
end)


--  EVERYTHING BELOWE HERE IS CALLBACKS, THE INDEX.JS FILE FROM NUI CALLS THIS EVENT AND MAGIC HAPPENS
-- Close the CAD UI
RegisterNUICallback('ucadems:close', function(data, cb)
    if data.close == "1" then
        SendNUIMessage({type = "UI", showUI = false; }) -- Sends a message to the js file.
        SetNuiFocus(false, false)
    end
end)

-- Tells the server from client the server neds to intiate sql lookup
RegisterNUICallback('ucadems_profiles', function()
    TriggerServerEvent('ucademsp:getplayers')
end)

-- Tells the server from client the server neds to intiate sql lookup
RegisterNUICallback('ucadems_profileLookup', function(d)
    TriggerServerEvent('ucademsp:getcitizen', {
        name = d.name
    })
end)

-- Set Player to on or off duty using QBcores events
RegisterNUICallback('ucadems_toggleduty', function()
    TriggerServerEvent('QBCore:ToggleDuty')
end)

-- activate QB core EMS notify for all active EMNS players
RegisterNUICallback('ucadems_panicbutton', function(d)
    TriggerServerEvent('hospital:server:ambulanceAlert', d.message)
end)
