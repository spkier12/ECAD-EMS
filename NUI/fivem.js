// FIVEM RELATED ///////////////////////////////////////////////////////////////////////////////////
window.addEventListener('message', function(event) {
    var item = event.data;

    if (item.type == "UI") {
        if (item.showUI == true) {
            this.document.getElementById("logonname").innerText = item.name
            document.getElementById("Frame").style.display = "flex"
        } else {
            document.getElementById("Frame").style.display = "none"
        }
    }

    if (item.type == "ucadems_profile_Lookup") {
        document.getElementById("SJournal_Profile_Phone").value = `Phone: ${item.ddp.DPhone}`
        document.getElementById("SJournal_Profile_Birth").value = `Birth: ${item.ddp.DBirth}`

        if (item.ddp.DGender == "1") {
            document.getElementById("SJournal_Profile_Gender").value = "Female"
        } else if (item.ddp.DGender == "0") {
            document.getElementById("SJournal_Profile_Gender").value = "Male" 
        }
    }

    // When the page loads the data received will be set to this widget
    if (item.type == "getplayers") {
        let Names = ""
        let splitdata = item.ddp.payload.split("E|")
        splitdata.forEach(element => {
            if (element != "") {
                Names += `</br><button class="MenuButton_Profile" style="margin-left:10%; width: 80%; height: 80%;" onclick="Profile_Load('${element}')">${element}</button>`
            }
        });
        
        document.getElementById("profiles").innerHTML = Names
    }

    // When the page loads the data received will be set to this widget
    if (item.type == "ucademsp_incident_report") {
        console.log("incidents incoming")
        let incident = `</br><button class="MenuButton_Profile" style="margin-left:10%; width: 80%; height: 80%;" onclick="Profile_Load('${item.ddp.ddata}')">${item.ddp.ddata}</button>`
        document.getElementById("ucademsp_incident_report").innerHTML = `${incident} <br> ${document.getElementById("ucademsp_incident_report").innerHTML}`
    }
});


// NUI Callbacks
async function CloseCad(){
    let x = await fetch(`https://ucade/ucadems:close`, {
        method: 'POST',
        body: JSON.stringify({close: "1"})
    })
}

async function RefreshProfiles() {
    await fetch(`https://ucade/ucadems_profiles`, {
        method: 'POST',
    })
}

// Get's data about a specific profile
async function GetProfile(profile) {
    await fetch(`https://ucade/ucadems_profileLookup`, {
        method: 'POST',
        body: JSON.stringify({name: profile})
    })
}

// Set's the player to be on or off duty
async function SetDuty() {
    await fetch(`https://ucade/ucadems_toggleduty`, {
        method: 'POST',
    })
}

// Send's a message to all active ambulances on duty letting them know someone is in danger
let Panic = false
async function PanicButton() {
    if (!Panic) {
        await fetch(`https://ucade/ucadems_panicbutton`, {
            method: 'POST',
            body: JSON.stringify({
                message: "PANIC: 1 or more ambulance personel is in danger!"
            })
        })
        Panic = true
        return
    }
    document.getElementById("UReport_Button").innerText = "You have pressed this button once before during this session!"
}
