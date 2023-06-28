--  Get's everyones players names
RegisterNetEvent('ucademsp:getplayers', function()
    local response = MySQL.query.await('SELECT charinfo from players')
    Names = ""
    if response then
        for i = 1, #response do
            local row = response[i]
            local js = json.encode(row)
            local js2 = json.decode(js)
            local js3 = json.decode(js2.charinfo)
            Names = Names .. js3.firstname ..' ' .. js3.lastname .. "E|"
        end
    end
    TriggerClientEvent('ucad_client_logg', -1, {
        type = 'getplayers',
        payload = Names
    })
end)

--  Get a Citizen's Birthdate, Phone number, Gender
RegisterNetEvent('ucademsp:getcitizen', function(d)
    local response = MySQL.query.await('SELECT charinfo from players')
    Birthdate = "Not found"
    Phone = "Not found"
    Gender = "Not found"
    if response then
        for i = 1, #response do
            local row = response[i]
            local js = json.encode(row)
            local js2 = json.decode(js)
            local js3 = json.decode(js2.charinfo)
            if d.name == js3.firstname .. ' ' .. js3.lastname then
                Birthdate = js3.birthdate
                Phone = js3.phone
                Gender = js3.gender
                break
            end
        end
    end

    TriggerClientEvent('ucad_client_logg', -1, {
        type = 'ucadems_profile_Lookup',
        DBirth = Birthdate,
        DPhone = Phone,
        DGender = Gender
    })
end)


-- Handle all the incoming incidents from players
RegisterNetEvent('hospital:server:ambulanceAlert')
AddEventHandler("hospital:server:ambulanceAlert", function(data)
    TriggerClientEvent('ucad_client_logg', -1, {
        type = 'ucademsp_incident_report',
        ddata = data
    })
end)